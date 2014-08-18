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
        //console.log(user, ' filteredUser');
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
          // console.log(match)
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
              var opportunitiesId = interestValue[k];
              var newKey = opportunitiesId.length;
              interestValue[newKey] = interestValue[newKey] || {};
              interestValue[newKey][k] = interestValue[newKey][k] || [];
              interestValue[newKey][k].push(opportunitiesId);
              delete interestValue[k];
            }
            return preMatch;
          }
        };


        _.forEach(matchesArray, function(match) {
          var calculatedLevel = caculateUserInterestLevel(match);
          makePreMatchObject(match, calculatedLevel);
        });
        matchesSortedByInterest = makeMatchesSortedByInterest(preMatch);
      });
    });
  //console.dir(usersForSchedule);
  //console.dir(opportunities);
    return {
      usersForSchedule: usersForSchedule,
      matchesSortedByInterest: matchesSortedByInterest,
      // columnData: columnData,
      opportunities: opportunities
    };


}]);
