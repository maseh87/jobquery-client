app.factory('FilterService', ['$state', 'Match', 'Opportunity', 'User', 'DialogueService',
  function ($state, Match, Opportunity, User, DialogueService) {

    var preMatch = {};
    var matchesSortedByInterest;
    var userObj = {};
    var matches = {};
    var opportunities = {};
    var usersForSchedule = {};
    var columnData = [{field: 'opportunity', displayName: 'Opportunity', width: '20%'}];
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


        var columnDef = {field: '', displayName: ''};
        userObj[user._id] = user;
        columnDef.field = user._id;
        columnDef.displayName = user.name;
        columnDef.width = '10%';
        columnData.push(columnDef);
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
          // columnData.unshift({field: opportunity._id, displayName: "Opportunity"});
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
        };

        var makeMatchesSortedByInterest = function(preMatch){
          for(var key in preMatch){
            var interestValue = preMatch[key];
            for(var k in interestValue){
              var opportunitiesIds = interestValue[k];
              var newKey = opportunitiesIds.length;
              interestValue[newKey] = interestValue[newKey] || {};
              interestValue[newKey][k] = interestValue[newKey][k] || [];
              for(var i = 0; i < opportunitiesIds.length; i++){
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
          var breakRounds = [4,5,6,7,8];
          _.forEach(opportunities, function(opportunity, oppId) {
            var roundsForThisOpportunity = new Array(11);
            var breakRound = breakRounds[indexNumber % 5];
            roundsForThisOpportunity[breakRound] = 'BREAK';
            scheduleMatrix[oppId] = roundsForThisOpportunity;
            indexNumber++;
          });
          return scheduleMatrix;
        };

        var scheduleMatrix = createScheduleMatrix();

        //makeScheduleData(usersForSchedule, opportunities, matchesSortedByInterest);

        //////scheduleAllMatches()/////////////////
        var scheduleAllMatches =function() {
          //for everything interestLevel
          for(var interestLevel = 14; interestLevel > 1; interestLevel--){
            var numberOfRoundsScheduledTicker = 0;
            //while matchesSortedByInterest at this interestLevel has keys
            var matchesForThisInterestLevel = matchesSortedByInterest[interestLevel];
            while ( matchesForThisInterestLevel !== undefined && Object.keys(matchesForThisInterestLevel).length !== 0 ) {
              //for each interestLevel starting at the lowest
              for(var numberOfRequests in matchesForThisInterestLevel){
                //for each userId
                for(var userId in matchesForThisInterestLevel[numberOfRequests]){
                  //if interestLevel is less than 11
                  // debugger;
                  if( interestLevel < 11 ){
                    //if # for this user equals numberOfRoundsScheduledTicker
                    console.log(usersForSchedule[userId].numberOfRounds);
                    console.log(numberOfRoundsScheduledTicker);
                    if(usersForSchedule[userId].numberOfRounds === numberOfRoundsScheduledTicker) {
                      //pop oppId and schedule it(schedule it is a helper function)
                      oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
                      //!!!!!!THIS LINE IS ONLY HERE TO MOCK OPPTOSCHEDULE CALL
                      usersForSchedule[userId].numberOfRounds++;
                      //scheduleSingleOpp(oppToSchedule, userId);
                    }
                  }
                  else{
                    //pop oppId and schedule it(schedule it is a helper function)
                    oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
                    //!!!!!!THIS LINE IS ONLY HERE TO MOCK OPPTOSCHEDULE CALL
                    usersForSchedule[userId].numberOfRounds++;
                    //scheduleSingleOpp(oppToSchedule, userId);
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
              numberOfRoundsScheduledTicker++;
              //if the matchesForThisInterestLevel has no properties, delete it
              if( Object.keys(matchesForThisInterestLevel).length === 0 ) {
                delete matchesForThisInterestLevel;
              }
            }
          }
        };
        scheduleAllMatches();
        console.log(2);
        console.dir(matchesSortedByInterest);

        // setTimeout(scheduleAllMatches, 3000);
      })
    });
    return {
      usersForSchedule: usersForSchedule,
      matchesSortedByInterest: matchesSortedByInterest,
      // columnData: columnData,
      opportunities: opportunities
    };


}]);
