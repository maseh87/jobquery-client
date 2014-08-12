app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'Scheduler','SERVER_URL', 'DialogueService',
  function ($scope, $state, $http, Match, Opportunity, User, Scheduler, SERVER_URL, DialogueService) {
    $scope.oneRoundNumForCandidate;
    $scope.allRoundNumForCandidate = {};

    $scope.slots = [
        {time: 'Round 1'},
        {time: 'Round 2'},
        {time: 'Round 3'},
        {time: 'Round 4'},
        {time: 'Round 5'},
        {time: 'Round 6'},
        {time: 'Round 7'},
        {time: 'Round 8'},
        {time: 'Round 9'},
        {time: 'Round 10'},
        {time: 'Round 11'}
    ];

    Match.getAll().then(function (matchData) {
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
        $scope.users = filteredUsers;

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

        // filter our matches
        var filteredMatches = matchData.matches.filter(function (match) {
          if (filteredUserIds[match.user] && filteredOppIds[match.opportunity]) {
            return true;
          } else {
            return false;
          }
        });
        $scope.matches = filteredMatches;


        var output;
        var oppColumnMap = {};
        var userMap = {};
        var matrix = {};
        // generate key map
        $scope.opportunities.forEach(function (opportunity, i) { oppColumnMap[opportunity._id] = i; });
        $scope.users.forEach(function (user, i) {
          if (user.name) {
            userMap[user._id] = user.name;
            // console.log(user);
          } else {
            // default to email if user has not filled in name
            userMap[user._id] = user.email;
          }
        });

        $scope.matches.forEach(function (matchData) {
          var match = matchData;
          var column = oppColumnMap[match.opportunity];
          var row = match.user;
          match.value = (match.adminOverride > 0) ? match.adminOverride : match.userInterest;
          if (!matrix.hasOwnProperty(row)) { matrix[row] = []; }
          matrix[row][column] = match;
        });

        $scope.matrix = matrix;
        $scope.userMap = userMap;

        var readyData = function () {
          output = '';

          // create header row (user names, degrading to emails)
          var userOrder = []; // array of userIds
          $scope.candidates.forEach(function (user) {
            userOrder.push(user._id);
            var displayName = user.name || user.email;
            output += ',' + displayName;
          });
          // add break column
          output += ',' + 'Break' + ',' + 'Not Scheduled Due to Constraints' + '\n';

          // iterate through opportunities
          for (var oppId in $scope.schedule) {
            // +1 for break
            var emptySchedule = new Array(userOrder.length + 1);
            output +=
              ($scope.opportunities[oppId].jobTitle).replace(/\,/, ' ') + ' (' +
              ($scope.opportunities[oppId].company.name).replace(/\,/, ' ') + ')';
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
            for (var j=0; j < userOrder.length; j++) {
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

        var schedulerOutput = Scheduler.schedule(11, 10, 6, function(output) {
          $scope.opportunities = output.opportunities;
          $scope.schedule = output.schedule;
          $scope.candidates = output.candidates;

          // console.log("$scope.opportunities",$scope.opportunities)
          // for (var can = 0; can < $scope.candidates.length; can++) {
          //   $scope.userMap[$scope.candidates[can]._id] = $scope.candidates[can].name || $scope.candidates[can].email;
          // }
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

    var init = function () {
      $scope.slotRowMap = {
        0: '09:00',
        1: '09:15',
        2: '09:30',
        3: '09:45',
        4: '10:00',
        5: '10:15'
      };
    };
    init();

  $scope.downloadData = function () {
    $http.get(SERVER_URL + '/api/matches/download')
    .success(function (results) {
      console.log(results);
      if (arguments[1] === 200) {
        $scope.dataToDownload = arguments[0];
        download(arguments[0], 'exported', 'text/csv');
      }
    });
  };

  $scope.downloadSchedule = function () {
    // show dialogue
    var title = "Schedule Processing in Progress";
    var message = "The scheduler can take up to 5 minutes to complete. Please wait while the scheduler is at work!"

    DialogueService.setMessage(title, message);
    DialogueService.show();

    Scheduler.schedule(
      $scope.config.rounds,
      $scope.config.maxInterviews,
      $scope.config.minInterviews,
      function(output) {
        // hide dialogue
        DialogueService.clearAndHide();
        $scope.opportunities = output.opportunities;
        $scope.schedule = output.schedule;
        $scope.candidates = output.candidates;
        $scope.candidateSchedule = output.candidateSchedule;

        // reformat opportunities so lookup by id
        var oppsById = {};
        $scope.opportunities.forEach(function (opp) {
          oppsById[opp._id] = opp;
        });

        $scope.opportunities = oppsById;

      readyData();
    });

  };


  function download(strData, strFileName, strMimeType) {
    var D = document,
        a = D.createElement("a");
        strMimeType= strMimeType || "application/octet-stream";


    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
    } /* end if(navigator.msSaveBlob) */


    if ('download' in a) { //html5 A[download]
        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
        a.setAttribute("download", strFileName);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            a.click();
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */


    //do iframe dataURL download (old ch+FF):
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);

    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
  } /* end download() */

}]);
