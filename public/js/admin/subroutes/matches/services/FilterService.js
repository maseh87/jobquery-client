app.factory('FilterService', ['$state', 'Match', 'Opportunity', 'User', 'DialogueService',
  function ($state, Match, Opportunity, User, DialogueService) {

    var userObj = {};
    var matches = {};
    var opportunities = {};

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
          // console.log(match)
            return true;
          } else {
            return false;
          }
        });
        _.forEach(matchesArray, function(match) {
          if(!opportunities[match.opportunity].interest) {
            opportunities[match.opportunity].interest = {};
          }
          opportunities[match.opportunity].interest[match.user] = match.userInterest;
          if(!userObj[match.user][match.userInterest]) {
            userObj[match.user][match.userInterest] = [1, 0];
          } else {
            userObj[match.user][match.userInterest][0] += 1;
          }
        });
      });
    });

    return {
      users: userObj,
      opportunities: opportunities
    };


}]);







