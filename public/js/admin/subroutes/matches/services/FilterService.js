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
          //console.log("match", match);

          var caculateLevel = function(match) {
            var finalInterest;
            var userInterest = match.userInterest;
            var adminOverride = match.adminOverride;
            var star = match.star;
            var noGo = match.noGo;
            var upVote = match.upVote;
            var downVote = match.downVote;

            if( adminOverride === 0) {
              finalInterest = userInterest * 3;
              if (noGo) {
                finalInterest = 0;
              }else if(star){
                finalInterest = 14;
              }else if(upVote){
                finalInterest += 1;
              }else if(downVote){
                finalInterest -= 1;
              }
            } else {
              finalInterest = adminOverride * 3;
              if (noGo) {
                finalInterest = 0;
                return;
              }else if(star){
                finalInterest = 14;
                return;
              }else if(upVote){
                finalInterest += 1;
              }else if(downVote){
                finalInterest -= 1;
              }
            }
            if (match.adminOverride !== 0 || finalInterest%3 !== 0 || finalInterest===14){

            console.log("if if if finalInterest", finalInterest, match)
            }
            return finalInterest;
          };

          var caculatedLevel = caculateLevel(match);

          var userRequestedNum;
          //if there is no interest property on opportunity object
          var opp = opportunities[match.opportunity];
          if(!opp.interest) {
            //make one
            opp.interest = {};
          }
          //make a tuple with the [user Requested, user Scheduled]
          if(!userObj[match.user][caculatedLevel]) {
            userObj[match.user][caculatedLevel] = [1, 0];
          } else {

            //here is where we need to exchange userInterest to new number

            userObj[match.user][caculatedLevel][0] += 1;
          }
          userRequestedNum = userObj[match.user][caculatedLevel][0];

          if(!opp.interest[caculatedLevel]) {
            opp.interest[caculatedLevel] = {};
          }
          //make an object sorted by user request number
          if(!opp.interest[caculatedLevel][userRequestedNum]) {
            opp.interest[caculatedLevel][userRequestedNum] = [];
          }
          opp.interest[caculatedLevel][userRequestedNum].push(match.user);
        });
      });
    });

    return {
      users: userObj,
      opportunities: opportunities,
      columnData: columnData
    };


}]);
