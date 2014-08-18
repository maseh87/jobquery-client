app.factory('FilterService', ['$state', 'Match', 'Opportunity', 'User', 'DialogueService',
  function ($state, Match, Opportunity, User, DialogueService) {

    var userObj = {};
    var matches = {};
    var opportunities = {};
    var columnData = [{field: 'opportunity', displayName: 'Opportunity', width: '20%'}];
    //Grab Users and filter accordingly
    User.getAll().then(function(users) {
      var filteredUsers = users.filter(function (candidate) {
        if (candidate.isAdmin) return false;
        if (!candidate.attending) return false;
        if (!candidate.isRegistered) return false;
        if ((candidate.searchStage === 'Out') || (candidate.searchStage === 'Accepted')) return false;
        return true;
      });
      _.forEach(filteredUsers, function(user) {
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
        _.forEach(matchesArray, function(match) {
          var userRequestedNum;
          //if there is no interest property on opportunity object
          var opp = opportunities[match.opportunity];
          if(!opp.interest) {
            //make one
            opp.interest = {};
          }
          //make a tuple with the [user Requested, user Scheduled]
          if(!userObj[match.user][match.userInterest]) {
            userObj[match.user][match.userInterest] = [1, 0];
          } else {
            userObj[match.user][match.userInterest][0] += 1;
          }
          userRequestedNum = userObj[match.user][match.userInterest][0];

          if(!opp.interest[match.userInterest]) {
            opp.interest[match.userInterest] = {};
          }
          //make an object sorted by user request number
          if(!opp.interest[match.userInterest][userRequestedNum]) {
            opp.interest[match.userInterest][userRequestedNum] = [];
          }
          opp.interest[match.userInterest][userRequestedNum].push(match.user);
        });
      });
    });

    return {
      users: userObj,
      opportunities: opportunities,
      columnData: columnData
    };


}]);