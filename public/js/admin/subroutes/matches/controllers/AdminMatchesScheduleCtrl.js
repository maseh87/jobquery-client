app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler', 'DialogueService',
  function ($scope, $state, Match, Opportunity, User, Scheduler, DialogueService) {
                    // // app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler', 'FilterService', 'DialogueService',
                    // //   function ($scope, $state, Match, Opportunity, User, Scheduler, FilterService, DialogueService) {
                    //    // $scope.mySelections = [];
                    //    // $scope.myData = [
                    //    //                   // {1: 'Beats', 10: 'R1', 11: '4', 12: 'R2'},
                    //    //                   // {2: 'AutoDesk', 11: '3', 10: 'R2', 12: 'R1'}
                    //    //                   {name: 'Mason', age: 27},
                    //    //                   {name: 'Xianhui', age: 10},
                    //    //                  ];
                    //    //  $scope.gridOptions = {
                    //    //      data: 'myData'
                    //    //      // showGroupPanel: true,
                    //    //      // selectedItems: $scope.mySelections,
                    //    //      // multiSelect: false,
                    //    //      // columnDefs: [
                    //    //      //   {field: 1, displayName:'Opportunity'},
                    //    //      //   {field: 10, displayName: 'Mason'},
                    //    //      //   {field: 11, displayName: 'Xianhui'},
                    //    //      //   {field: 12, displayName: 'James'}
                    //    //      // ]
                    //    //  };
                    //    Scheduler.opportunitySchedule();
                    //     $scope.myData = Scheduler.scheduleData;
                    //     $scope.gridOptions = {
                    //       data: 'myData',
                    //       columnDefs: FilterService.columnData,
                    //       showGroupPanel: true,
                    //       enablePinning: true
                    //      };
                    // console.log(FilterService.users, " users");
                    // console.log(FilterService.opportunities, ' opportunities');
                    // console.log(FilterService.columnData, ' columnData');
                    // console.log(Scheduler.scheduleData, ' scheduleData');
                    // // console.log(Scheduler.interests, ' schedule');
                    // // console.log(Scheduler.userSchedule, ' userSchedule');
                    //
                    //
                    // //         var schedulerOutput = Scheduler.schedule(11, 10, 6, function(output) {
                    // //           $scope.opportunities = output.opportunities;
                    // //           $scope.schedule = output.schedule;
                    // //           console.log($scope.schedule);
                    // //           $scope.candidates = output.candidates;
                    //
                    // //           // console.log("$scope.opportunities",$scope.opportunities)
                    // //           for (var can = 0; can < $scope.candidates.length; can++) {
                    // //             $scope.userMap[$scope.candidates[can]._id] = $scope.candidates[can].name || $scope.candidates[can].email;
                    // //           }
                    // //           // reformat opportunities so lookup by id
                    // //           var oppsById = {};
                    // //           $scope.opportunities.forEach(function (opp) {
                    // //             oppsById[opp._id] = opp;
                    // //           });
                    // //           $scope.opportunities = oppsById;
                    // //           readyData();
                    // //         });
                    // //       });
                    // //     });


    $scope.slots = 6;
    $scope.slotRowMap = {};
    $scope.oppColumnMap = {};

    $scope.schedule = [];

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
    //Grab all Matches and filter opportunities and save in opportunities variable


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
