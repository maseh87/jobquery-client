app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler',
  function ($scope, $state, Match, Opportunity, User, Scheduler) {

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

    var output;
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
      output += ',' + 'Break' + '\n';

      // iterate through opportunities
      for (var oppId in $scope.schedule) {
        var emptySchedule = new Array(userOrder.length + 1); // +1 for break
        output +=
          ($scope.opportunities[oppId].jobTitle).replace(/,/, ' ') + '(' +
          ($scope.opportunities[oppId].company.name).replace(/,/, ' ') + ')';
        for (var i = 0; i < $scope.schedule[oppId].length; i += 1) {
          var scheduleObj = $scope.schedule[oppId][i];
          if (scheduleObj === 'BREAK') {
            // set last column value to this index (i) + 1
            emptySchedule[emptySchedule.length] = i + 1;
          } else {
            // console.log(scheduleObj);
            var userId = scheduleObj.id;
            // find where userId is in userOrder array
            var idx = userOrder.indexOf(userId);
            // then replace that value in the emptySchedule array with (i) + 1
            emptySchedule[idx] = i + 1;
          }
        }
        // join emptySchedule array together with commas, plus new line
        emptySchedule = emptySchedule.join(',') + '\n';
        // replace 'undefined' with empty strings
        emptySchedule.replace(/undefined/g, '');
        output += emptySchedule;
      }
      //console.log(output);
    };

    var schedulerOutput = Scheduler.schedule(11, 10, 6, function(output) {
      $scope.opportunities = output.opportunities;
      $scope.schedule = output.schedule;
      $scope.candidates = output.candidates;
      console.log("$scope.candidates", $scope.candidates);
      
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

    // $scope.slots = 6;
    $scope.slotRowMap = {};
    $scope.oppColumnMap = {};
    $scope.userMap = {};

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

    $scope.downloadSchedule = function () {
      download(output, 'exported', 'text/csv');

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
