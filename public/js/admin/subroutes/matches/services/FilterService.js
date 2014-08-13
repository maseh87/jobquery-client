app.factory('FilterService', ['$state', 'Match', 'Opportunity', 'User', 'Scheduler', 'DialogueService',
  function ($state, Match, Opportunity, User, Scheduler, DialogueService) {
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
        console.log(userObj, ' users');
        console.log(matches, ' matches');
        console.log(opportunities, ' opps');
      });
    });







        Match.getAll().then(function (matchData) {
      // console.log(matchData, ' matchData');
          User.getAll().then(function (users) {
            // filter out users
            var filteredUserIds = {};
            var filteredUsers = users.filter(function (candidate) {
              if (candidate.isAdmin) return false;
              if (!candidate.attending) return false;
              if (!candidate.isRegistered) return false;
              if ((candidate.searchStage === 'Out') || (candidate.searchStage === 'Accepted')) return false;
              filteredUserIds[candidate._id] = true;
              return true;
            });
            users = filteredUsers;

            // filter out opportunities
            var filteredOppIds = {};
            var filteredOpps = matchData.opportunities.filter(function (opportunity) {
              if (!opportunity.active) return false;
              if (!opportunity.approved) return false;
              if (opportunity.category.name === "Not Attending Hiring Day") return false;
              filteredOppIds[opportunity._id] = true;
              return true;
            });
            $scope.opportunities = filteredOpps;
            // console.log($scope.opportunities)

            // filter our matches
            var filteredMatches = matchData.matches.filter(function (match) {
              if (filteredUserIds[match.user] && filteredOppIds[match.opportunity]) {
                return true;
              } else {
                return false;
              }
            });

            $scope.matches = filteredMatches;
            console.log($scope.matches, ' matches');

            var output;
            var oppColumnMap = {};
            var userMap = {};
            var matrix = {};
            // generate key map
            $scope.opportunities.forEach(function (opportunity, i) {
              // console.log(opportunity, ' opportunity');
              opportunity.interests = {};
              for(var k = 0; k < $scope.matches.length; k++) {
                if($scope.matches[k].opportunity === opportunity._id) {
                  opportunity.interests[$scope.matches[k].user] = {userInterest: $scope.matches[k].userInterest, oppId: $scope.matches[k].opportunity};
                }
              }
              oppColumnMap[opportunity._id] = i;
            });
            // console.log($scope.opportunities);
            $scope.users.forEach(function (user, i) {
              // console.log(user)
              if (user.name) {
                userMap[user._id] = user.name;
                // console.log(user);
              } else {
                // default to email if user has not filled in name
                userMap[user._id] = user.email;
              }
            });

            $scope.matches.forEach(function (matchData) {
              // console.log(oppColumnMap)
              var match = matchData;
              var column = oppColumnMap[match.opportunity];
              var row = match.user;
              match.value = (match.adminOverride > 0) ? match.adminOverride : match.userInterest;
              if (!matrix.hasOwnProperty(row)) { matrix[row] = []; }
              matrix[row][column] = match;
              // $scope.opportunites
            });

            $scope.matrix = matrix;
            // console.log($scope.matrix, ' matrix');
            $scope.userMap = userMap;

    ////////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.array = [];
            var readyData = function () {
              output = '';
              var userOrder = []; // array of userIds

              // create header row (user names, degrading to emails)
              //loop through the Candidates Array
              $scope.candidates.forEach(function (user, index) {
                var obj = {};
                userOrder.push(user._id);
                var displayName = user.name || user.email;
                output += ',' + displayName;
                //populating obj for grid
                obj.Opportunity = true;
                obj[user.name] = index;
                // $scope.myData.push(obj);
              });
                // console.log($scope.array);

              // add break column
              output += ',' + 'Break' + ',' + 'Not Scheduled Due to Constraints' + '\n';

              // iterate through Schedule {OppId: [{id: userId, interest: 4, isOverridden: boolean}, ...x11]}
              console.log($scope.schedule);
              for (var oppId in $scope.schedule) {
                // +1 for break
                var emptySchedule = new Array(userOrder.length + 1);
                output +=
                  ($scope.opportunities[oppId].jobTitle).replace(/\,/, ' ') + ' (' +
                  ($scope.opportunities[oppId].company.name).replace(/\,/, ' ') + ')';
                //Looping through array containing interests
                for (var i = 0; i < $scope.schedule[oppId].length; i += 1) {
                  var scheduleObj = $scope.schedule[oppId][i];
                  if (scheduleObj === 'BREAK') {
                    // set last column value to this index (i) + 1
                    emptySchedule[userOrder.length] = i + 1;
                  } else if (scheduleObj === undefined) {
                    // keep adding undefined's at end as necessary
                    emptySchedule[emptySchedule.length] = i + 1;
                  } else {
                    var userId = scheduleObj.id;
                    var idx = userOrder.indexOf(userId);
                    // then replace that value in the emptySchedule array with (i) + 1
                    emptySchedule[idx] = "R" + (i + 1);
                  }
                }
                //This loop is for the user order array <--
                for (var j=0; j < userOrder.length; j++) {
                  //each user Id
                  var uid = userOrder[j];
                  if (!emptySchedule[j]) {
                    //console.log("what is matrix", $scope.matrix[uid])
                    for (var k=0; k < $scope.matrix[uid].length; k++) {
                      var matrixMap = $scope.matrix[uid][k];
                      if (matrixMap.user === uid && matrixMap.opportunity === oppId) {
                        emptySchedule[j] = $scope.matrix[uid][k].value;
                      }
                    }
                  }
                }
                // join emptySchedule array together with commas, plus new line
                emptySchedule = emptySchedule.join(',') + '\n';
                // replace 'undefined' with empty strings
                emptySchedule.replace(/undefined/g, '');

                var oneRoundNumForCandidate = $scope.oneRoundNumForCandidate = emptySchedule.split(",");
                $scope.allRoundNumForCandidate[oppId] = $scope.oneRoundNumForCandidate;
                output += emptySchedule;
              }
            };
//////////////////////////////////////////////////////////////////////////////////////////////////
            var schedulerOutput = Scheduler.schedule(11, 10, 6, function(output) {
              $scope.opportunities = output.opportunities;
              $scope.schedule = output.schedule;
              console.log($scope.schedule);
              $scope.candidates = output.candidates;

              // console.log("$scope.opportunities",$scope.opportunities)
              for (var can = 0; can < $scope.candidates.length; can++) {
                $scope.userMap[$scope.candidates[can]._id] = $scope.candidates[can].name || $scope.candidates[can].email;
              }
              // reformat opportunities so lookup by id
              var oppsById = {};
              $scope.opportunities.forEach(function (opp) {
                oppsById[opp._id] = opp;
              });
              $scope.opportunities = oppsById;
              readyData();
            });
          });
        });


    // $scope.slots = 6;
    $scope.slotRowMap = {};
    $scope.oppColumnMap = {};
    $scope.schedule = [];


    return {
      users: {},
      matches: [],
      opportunities: {}
    };


}]);







