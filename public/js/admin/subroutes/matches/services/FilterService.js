app.factory('FilterService', ['$state', 'Match', 'Opportunity', 'User',
  function ($state, Match, Opportunity, User) {
    var preMatch = {};
    var matchesSortedByInterest;
    var userObj = {};
    var matches = {};
    var opportunities = {};
    var usersForSchedule = {};
    var userInterestsForOpportunites = {};
    var columnData = [{field: 'opportunity', displayName: 'Opportunity', width: '20%'}];
    //an array of all the objects that will populate the cells inside the grid
    var cellData = [];
    var matrixData;
    var counterNo = 0;

    //Grab Users and filter accordingly
    User.getAll().then(function(users) {
      var makeUsersForScheduleObject = function(user){

        usersForSchedule[user._id] = {};
        usersForSchedule[user._id].scheduleForThisUser = {};
        usersForSchedule[user._id].numberOfRounds = 0;

      };

      var filteredUsers = users.filter(function (candidate) {
        if (candidate.isAdmin) return false;
        if (!candidate.attending) return false;
        if (!candidate.isRegistered) return false;
        if ((candidate.searchStage === 'Out') || (candidate.searchStage === 'Accepted')) return false;
        return true;
      });
      _.forEach(filteredUsers, function(user) {
        makeUsersForScheduleObject(user);
        userObj[user._id] = user;
      });
      Match.getAll().then(function(matchData) {
        var filteredOpps = matchData.opportunities.filter(function (opportunity) {
          if (!opportunity.active) return false;
          if (!opportunity.approved) return false;
          if (opportunity.category.name === "Not Attending Hiring Day") return false;
          return true;
        });
        _.forEach(filteredOpps, function(opportunity) {
          opportunities[opportunity._id] = opportunity;
        });
        //filter matches based on if user and opportunity is attending hiring day
        var matchesArray = matchData.matches.filter(function (match) {
          if (userObj[match.user] && opportunities[match.opportunity]) {
            return true;
          } else {
            return false;
          }
        });
        //for each match in matchesArray
          /*
           Before we run the schedule, we have to calculate the number that represents
           the precise user interest. This number comes as a result of the userInterest (1 throuh 4),
           the possible presence of an adminOverride of the userInterest, and also, the presence of any of
           the four 'Scheduling Preferences' (star, upVote, downVote, noGo). All the possible combinations
           of these factors results in one of 14 possible values. Therefore, we take all these values into
           account, and calculate a number between 1 and 14 to represent the 'calculatedUserInterestLevel'.

           Here are the ideas behind the calculation.
           1) If admin has supplied an adminOverride number, this number overwrites the userInterest.
           2) If the interest has a 'star' the value is automatically the highest value (14).
           3) If the interest has a 'noGo', the value is automatically the lowest value (1).
           4) Otherwise we take the userInterest, or adminOverride value [ see 1) ], multiply it by 3
              and then add 1 to it if there is an 'upVote' or subtract 1 if there is a downVote.

           These steps provide all possible combinations between 1 and 14.
          */
        var caculateUserInterestLevel = function(match) {
          var calculatedUserInterest;
          var userInterest = match.userInterest;
          var adminOverride = match.adminOverride;
          var star = match.star;
          var noGo = match.noGo;
          var upVote = match.upVote;
          var downVote = match.downVote;

          if( adminOverride === 0) {
            calculatedUserInterest = userInterest * 3;
            if (noGo) {
              calculatedUserInterest = 0;
            }else if(star){
              calculatedUserInterest = 14;
            }else if(upVote){
              calculatedUserInterest += 1;
            }else if(downVote){
              calculatedUserInterest -= 1;
            }
          } else {
            calculatedUserInterest = adminOverride * 3;
            if (noGo) {
              calculatedUserInterest = 0;
              return;
            }else if(star){
              calculatedUserInterest = 14;
              return;
            }else if(upVote){
              calculatedUserInterest += 1;
            }else if(downVote){
              calculatedUserInterest -= 1;
            }
          }
          if (match.adminOverride !== 0 || calculatedUserInterest%3 !== 0 || calculatedUserInterest===14){

          }
          return calculatedUserInterest;
        };

        var sortMatchesByInterest = function(match){
          matchesSortedByInterest[calculatedLevel] = matchesSortedByInterest[calculatedLevel] || [];
          matchesSortedByInterest[calculatedLevel].push(match);
        };

        var makePreMatchObject = function(match, calculatedLevel){
          var user = match.user;

          preMatch[calculatedLevel] = preMatch[calculatedLevel] || {};
          preMatch[calculatedLevel][user] = preMatch[calculatedLevel][user] || [];

          preMatch[calculatedLevel][user].push(match.opportunity);

          //we need this object for when we make adrian's list
          userInterestsForOpportunites[user] = userInterestsForOpportunites[user] || {};
          userInterestsForOpportunites[user][match.opportunity] = calculatedLevel;

        };

        var makeMatchesSortedByInterest = function(preMatch){
          for(var key in preMatch){
            var interestValue = preMatch[key];
            for(var k in interestValue){
              var opportunitiesIds = interestValue[k];
              var newKey = opportunitiesIds.length;
              interestValue[newKey] = interestValue[newKey] || {};
              interestValue[newKey][k] = interestValue[newKey][k] || [];
              // interestValue[newKey][k].push(opportunitiesId);
              for(var i = 0; i< opportunitiesIds.length; i++){
                interestValue[newKey][k].push(opportunitiesIds[i]);
              }
              delete interestValue[k];
            }
          }
          return preMatch;
        };

        _.forEach(matchesArray, function(match) {
          var calculatedLevel = caculateUserInterestLevel(match);
          makePreMatchObject(match, calculatedLevel);
        });
        matchesSortedByInterest = makeMatchesSortedByInterest(preMatch);


        var opportunityAppointment = [];
        var userSchedule = {};
        var scheduleData = [];
        var oppToSchedule;

        var createScheduleMatrix = function() {
          var scheduleMatrix = {};
          var indexNumber = 0;
          var breakRounds = [3,4,5,6,7];
          _.forEach(opportunities, function(opportunity, oppId) {
            var roundsForThisOpportunity = new Array(11);
            var breakRound = breakRounds[indexNumber % 5];
            roundsForThisOpportunity[breakRound] = 'BREAK';
            scheduleMatrix[oppId] = roundsForThisOpportunity;
            indexNumber++;
          });
          return scheduleMatrix;
        };

        scheduleMatrix = createScheduleMatrix();

        /////scheduleSingleOpp function//////
        var scheduleSingleOpp = function(oppId, userId, scheduleMatrix, interestLevel) {

          /////switchSlots(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule)////
          var switchSlots = function(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule) {

            //if userForSchedule.scheduleForThisUser[possibleSwitchIndex]
            if(userForSchedule.scheduleForThisUser[possibleSwitchIndex] !== undefined){
              //return false
              return false;
            }

            //var possibleUserToSwitchWith = oppSchdedule[possibleSwitchIndex]
            var possibleUserToSwitchWith = oppSchedule[possibleSwitchIndex];

            //var isBreak = possibleUserToSwitchWith === 'BREAK'
            var isBreak = (possibleUserToSwitchWith === 'BREAK');
            //if !isBreak && usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser[emptySpaceIndex] !== undefined
            if (!isBreak && usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser[emptySpaceIndex] !== undefined){
              //return false
              return false;
            }

            //oppSchedule[emptySpaceIndex] = possibleUserToSwitchWith(FINISHED ONE SWITCH)
            oppSchedule[emptySpaceIndex] = possibleUserToSwitchWith;
            //if !isBreak
            if(!isBreak){
              //usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser.emptySpaceIndex = oppId;
              usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser[emptySpaceIndex] = oppId;
              //delete usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser.possibleSwitchIndex;
              delete usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser[possibleSwitchIndex];
              /////// return true;
            }
            //oppSchedule[possibleSwitchIndex] = userId
            oppSchedule[possibleSwitchIndex] = userId;
            //userForSchedule.scheduleForThisUser[possibleSwitchIndex] = oppId;
            userForSchedule.scheduleForThisUser[possibleSwitchIndex] = oppId;
            //userForSchedule.numberOfRounds++;
            userForSchedule.numberOfRounds++;
            userForSchedule[interestLevel].fulfilled++;

            //return true
             return true;
          };

          //userForSchedule = usersForSchedule[userId];
          var userForSchedule = usersForSchedule[userId];
          //oppSchedule = scheduleMatrix[oppId];
          var oppSchedule = scheduleMatrix[oppId];
          //var wasScheduled = false;
          var wasScheduled = false;

          userForSchedule[interestLevel] = usersForSchedule[userId][interestLevel] || {requested: 0, fulfilled: 0};
          userForSchedule[interestLevel].requested++;


          //for each timeSlot in oppSchdedule
          for(var i = 0; i < oppSchedule.length; i++){
            var timeSlot = oppSchedule[i];

            // if timeSlot is empty && !userForSchedule[scheduleForThisUser][i]
            if(timeSlot === undefined && !userForSchedule.scheduleForThisUser[i]){
              //oppSchedule[i] = userId;
              oppSchedule[i] = userId;

              //userForSchedule[scheduleForThisUser][i] = oppId;
              userForSchedule.scheduleForThisUser[i] = oppId;
              //wasScheduled = true;
              wasScheduled = true;
              //console.log("scheduled", counterYes++);
              //userForSchedule[numberOfRounds]++;
              userForSchedule.numberOfRounds++;
              usersForSchedule[userId][interestLevel].fulfilled++;
              //break (from for loop)
              break;
            }
          }

          // !wasScheduled
          if(!wasScheduled){
            //console.log("not scheduled", counterNo++)
            //for each j in oppSchedule
            for(var j = 0; j < oppSchedule.length; j++){
              //if wasScheduled
              if(wasScheduled){
                //break
                break;
              }
              var timeSlot2 = oppSchedule[j];
              //if j is undefined
              if(timeSlot2 === undefined){
                //var emptySpaceIndex = j
                var emptySpaceIndex = j;
                //for each k in oppSchedule
                for(var k = 0; k < oppSchedule.length; k++){
                  var timeSlot3 = oppSchedule[k];
                  //if timeSlot3 is not undefined
                  if(timeSlot3 !== undefined) {
                    //var possibleSwitchIndex = k
                    var possibleSwitchIndex = k;

                    //wasScheduled = switch(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule)
                    wasScheduled = switchSlots(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule);
                    //if wasScheduled
                    if(wasScheduled) {
                      //break
                      //console.log("scheduled after switch", counterYes++)
                      break;
                    }
                  }
                }
              }
            }
          }
          if(!wasScheduled){
          }
          scheduleMatrix[oppId] = oppSchedule;
          //return oppSchedule;
        };

        var shuffleSchedule = function(scheduleMatrix, usersForSchedule){

          var baseArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          var outsideRounds = [0, 1, 2, 8, 9, 10];
          var insideRounds = [3, 4, 5, 6, 7];
          var shuffledScheduleObject = {};

          var newOutsideRounds = _.shuffle(outsideRounds);
          var newInsideRounds = _.shuffle(insideRounds);

          while( outsideRounds.length > 0 ){
            var oldRound = outsideRounds.pop();
            var newRound = newOutsideRounds.pop();
            shuffledScheduleObject[oldRound] = newRound;
          }
          while( insideRounds.length > 0 ){
            var oldRound = insideRounds.pop();
            var newRound = newInsideRounds.pop();
            shuffledScheduleObject[oldRound] = newRound;
          }

          for(var oppId in scheduleMatrix){
            var oldRoundsForOpp = scheduleMatrix[oppId];
            var newRoundsForOpp = new Array(11);
            for(var oldRoundNumber in shuffledScheduleObject){
              var newRoundNumber = shuffledScheduleObject[oldRoundNumber];
              newRoundsForOpp[newRoundNumber] = oldRoundsForOpp[oldRoundNumber];
            }
            scheduleMatrix[oppId] = newRoundsForOpp;
          }

          for(var userId in usersForSchedule){
            var oldRoundsForUser = usersForSchedule[userId].scheduleForThisUser;
            var newRoundsForUser = {};
            for(var oldRoundNumber in shuffledScheduleObject){
              var newRoundNumber = shuffledScheduleObject[oldRoundNumber];
              newRoundsForUser[newRoundNumber] = oldRoundsForUser[oldRoundNumber];
            }
            usersForSchedule[userId].scheduleForThisUser = newRoundsForUser;
          }


        };

        //////scheduleAllMatches()/////////////////
        var scheduleAllMatches = function (scheduleMatrix) {
          //for everything interestLevel
          for(var interestLevel = 14; interestLevel > 3; interestLevel--){
            var numberOfRoundsScheduledTicker = 0;
            var matchesForThisInterestLevel = matchesSortedByInterest[interestLevel];
            //while matchesSortedByInterest at this interestLevel has keys, and also numberOfRoundsScheduledTicker is less than 11
            while ( matchesForThisInterestLevel !== undefined && Object.keys(matchesForThisInterestLevel).length !== 0 && numberOfRoundsScheduledTicker < 11) {
              //for each interestLevel starting at the lowest
              for(var numberOfRequests in matchesForThisInterestLevel){
                //for each userId
                for(var userId in matchesForThisInterestLevel[numberOfRequests]){

                  //if interestLevel is less than 11
                  if( interestLevel < 11){
                    if( userId === '53d984fb1e4c45681343d4a6' ){
                      // debugger;
                    }
                    //if # for this user equals numberOfRoundsScheduledTicker
                    if(usersForSchedule[userId].numberOfRounds <= numberOfRoundsScheduledTicker) {
                      var currentRoundsForUser = usersForSchedule[userId].numberOfRounds;
                      while( usersForSchedule[userId].numberOfRounds === currentRoundsForUser && matchesForThisInterestLevel[numberOfRequests][userId].length > 0){
                        //pop oppId and schedule it(schedule it is a helper function)
                        oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
                        if(usersForSchedule[userId].numberOfRounds < 9) {
                          scheduleSingleOpp(oppToSchedule, userId, scheduleMatrix, interestLevel);
                        }
                      }
                    }
                  }else{
                    //pop oppId and schedule it(schedule it is a helper function)
                    oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();

                    if(usersForSchedule[userId].numberOfRounds < 9) {
                      scheduleSingleOpp(oppToSchedule, userId, scheduleMatrix, interestLevel);
                    }
                  }

                  //check if userId's value is empty
                  if(matchesForThisInterestLevel[numberOfRequests][userId].length === 0){
                    //delete userId
                    delete matchesForThisInterestLevel[numberOfRequests][userId];
                  }
                }
                //if the numberOfRequests has no properties, delete it
                if( Object.keys(matchesForThisInterestLevel[numberOfRequests]).length === 0 ) {
                  delete matchesForThisInterestLevel[numberOfRequests];
                }
              }

              //if the matchesForThisInterestLevel has no properties, delete it
              if( Object.keys(matchesForThisInterestLevel).length === 0 ) {
                delete matchesSortedByInterest[interestLevel];
              }
                numberOfRoundsScheduledTicker++;
            }
          }
        };

        var translateInterestLevel = function(interestLevel){
          if( interestLevel === 14 ){
            return '*';
          }
          if( interestLevel === 13 ){
            return '4^';
          }
          if( interestLevel === 12 ){
            return '4';
          }
          if( interestLevel === 11 ){
            return '4v';
          }
          if( interestLevel === 10 ){
            return '3^';
          }
          if( interestLevel === 9 ){
            return '3';
          }
          if( interestLevel === 8 ){
            return '3v';
          }
          if( interestLevel === 7 ){
            return '2^';
          }
          if( interestLevel === 6 ){
            return '2';
          }
          if( interestLevel === 5 ){
            return '2v';
          }
          if( interestLevel === 4 ){
            return '1^';
          }
          if( interestLevel === 3 ){
            return '1';
          }
          if( interestLevel === 2 ){
            return '1v';
          }
          if( interestLevel === 1 ){
            return 'X';
          }
          if( interestLevel === 0 ){
            return 0;
          }
        };

        var calculateNumberFulfillment = function(interestLevelClass, userId){
          var actualInterestLevels;
          var userInterestsRequested = usersForSchedule[userId];
          var totalRequested = 0;
          var totalFulfilled = 0;
          if( interestLevelClass === 'fours' ){
            actualInterestLevels = [13, 12, 11];
          }
          if( interestLevelClass === 'stars' ){
            actualInterestLevels = [14];
          }
          for(var i = 0; i < actualInterestLevels.length; i++){
            var actualInterestLevel = actualInterestLevels[i];
            if( userInterestsRequested[actualInterestLevel] ){
              totalRequested += userInterestsRequested[actualInterestLevel].requested;
              totalFulfilled += userInterestsRequested[actualInterestLevel].fulfilled;
            }
          }
          return [totalRequested, totalFulfilled];

        };


        var makeScheduleSpreadsheet = function(scheduleMatrix){
          var spreadSheetArray = [];
          var topRow = ['','1','2','3','4','5','6','7','8','9','10','11'];
          spreadSheetArray.push(topRow);
          for(var oppId in scheduleMatrix){
            var rowArray = [];
            var oppName = opportunities[oppId].company.name + ': ' + opportunities[oppId].jobTitle;
            rowArray.push(oppName);
            var scheduleForOppId = scheduleMatrix[oppId];
            for(var i = 0; i < scheduleForOppId.length; i++){
              var userId = scheduleForOppId[i];
              if( userId === undefined || userId === 'BREAK' ){
                userName = 'BREAK';
              }else{
                var userName = userObj[userId].name || userObj[userId].email;
              }
              rowArray.push(userName);
            }
            spreadSheetArray.push(rowArray);
          }

          return spreadSheetArray.join('\n');
        };

        var makeBossSpreadsheet = function(scheduleMatrix){
          var spreadSheetArray = [];
          var topArray = [''];
          var userIds = [];
          var numberOfConvosRow = ['Convos Scheduled'];
          var numberOfBreaksRow = ['Breaks Scheduled'];
          var userStarsRequestedRow = ['Stars Scheduled'];
          var userStarsFulfilledRow = ['Stars Fulfilled'];
          var userFoursRequestedRow = ['Fours Scheduled'];
          var userFoursFulfilledRow = ['Fours Fulfilled'];

          for(var user in userObj){
            topArray.push(userObj[user].name || userObj[user].email);
            userIds.push(user);
          }

          topArray.push('Stars Scheduled')

          for(var breakStringIndex = 0; breakStringIndex < 10; breakStringIndex++){
            topArray.push('brk');
          }
          spreadSheetArray.push(topArray);

          for(var i = 0; i < userIds.length; i++){
            var userId = userIds[i];

            var userStarsFulfillment = calculateNumberFulfillment('stars', userId);
            var starsRequested = userStarsFulfillment[0];
            var starsFulfilled = userStarsFulfillment[1];
            userStarsRequestedRow.push(starsRequested);
            userStarsFulfilledRow.push(starsFulfilled);

            var userFoursFulfillment = calculateNumberFulfillment('fours', userId);
            var foursRequested = userFoursFulfillment[0];
            var foursFulfilled = userFoursFulfillment[1];
            userFoursRequestedRow.push(foursRequested);
            userFoursFulfilledRow.push(foursFulfilled);

          }

          spreadSheetArray.push(userStarsRequestedRow);
          spreadSheetArray.push(userStarsFulfilledRow);
          spreadSheetArray.push(userFoursRequestedRow);
          spreadSheetArray.push(userFoursFulfilledRow);

          for(var oppId in scheduleMatrix){
            var breakRounds = [];
            var rowArray = [];
            var numberOfStars = 0;

            rowArray.push(opportunities[oppId].company.name + ': ' + opportunities[oppId].jobTitle);

            for(var j = 0; j < scheduleMatrix[oppId].length; j++){
              if( scheduleMatrix[oppId][j] === 'BREAK' || scheduleMatrix[oppId][j] === undefined ){
                breakRounds.push('R' + (Number(j) + 1));
              }
            }
            for(var i = 0; i < userIds.length; i++){
              var userId = userIds[i];
              var thisUserSchedule = usersForSchedule[userId].scheduleForThisUser;
              var hasAppointment = false;
              for(var roundNumber in thisUserSchedule){
                var interestLevel = userInterestsForOpportunites[userId][oppId];
                var translatedInterestLevel = translateInterestLevel(interestLevel);
                if( thisUserSchedule[roundNumber] === oppId ){
                  if( interestLevel === 14 ){
                    numberOfStars++;
                  }
                  rowArray.push('R' + (Number(roundNumber) + 1) + ': ' + translatedInterestLevel);
                  hasAppointment = true;
                  break;
                }
              }
              if(!hasAppointment){
                rowArray.push(translatedInterestLevel);
              }
            }
            rowArray.push(numberOfStars);
            for(var roundIndex = 0; roundIndex < breakRounds.length; roundIndex++){
              rowArray.push(breakRounds[roundIndex]);
            }
            spreadSheetArray.push(rowArray);
          }

          for(var i = 0; i < userIds.length; i++){
            var userId = userIds[i];
            var numberOfConvos = usersForSchedule[userId].numberOfRounds;
            var numberOfBreaks = 11 - numberOfConvos;
            numberOfConvosRow.push(numberOfConvos);
            numberOfBreaksRow.push(numberOfBreaks);
          }

          spreadSheetArray.push(numberOfConvosRow);
          spreadSheetArray.push(numberOfBreaksRow);

          return spreadSheetArray.join('\n');
        };

        scheduleAllMatches(scheduleMatrix);
        shuffleSchedule(scheduleMatrix, usersForSchedule);
        for(var k in scheduleMatrix){
          for(var j in scheduleMatrix[k]){
            if(scheduleMatrix[k][j] === "BREAK"){
            }
          }
        }
        var scheduleSpreadSheet = makeScheduleSpreadsheet(scheduleMatrix);
        var bossSpreadsheet = makeBossSpreadsheet(scheduleMatrix);

        var download = function(str) {
         var f = document.createElement("iframe");
         document.body.appendChild(f);
         f.src = "data:" +  'text/csv'   + "," + encodeURIComponent(str);
        };
        //!!!!UNCOMMENT THE LINE BELOW TO DOWNLOAD SCHEDULE SPREADSHEET
        download(scheduleSpreadSheet);
        download(bossSpreadsheet);
      });
    });

    return {
    };
}]);
