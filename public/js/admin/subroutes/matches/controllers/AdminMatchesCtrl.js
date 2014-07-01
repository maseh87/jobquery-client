app.controller('AdminMatchesCtrl',
  ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'SERVER_URL',
  function ($scope, $state, $http, Match, Opportunity, User, SERVER_URL) {

  Match.getAll().then(function (matchData) {
    User.getAll().then(function (users) {
      $scope.users = users;
      $scope.matches = matchData.matches;
      $scope.opportunities = matchData.opportunities;

      var oppColumnMap = {};
      var userMap = {};
      var matrix = {};

      // generate key map
      $scope.opportunities.forEach(function (opportunity, i) { oppColumnMap[opportunity._id] = i; });
      $scope.users.forEach(function (user, i) {
        if (user.name) {
          userMap[user._id] = user.name;
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
    });
  });

  $scope.edit = function(match) {
    // if user leaves blank, clear adminOverride and reverse to userInterest
    if (match.value === undefined) {
      console.log('undefined!');
      match.adminOverride = 0;
      match.value = match.userInterest;
    } else {
      // set adminOverride to be the new value
      match.adminOverride = match.value;
    }

    // save update to server
    Match.update(match);

  };

  $scope.isOverridden = function (match) {
    // no adminOverride
    if (match.adminOverride === 0) {
      if (match.userInterest === 4) {
        return 'gridbox-highlight-4';
      } else if (match.userInterest === 3) {
        return 'gridbox-highlight-3';
      } else if (match.userInterest === 2) {
        return 'gridbox-highlight-2';
      } else if (match.userInterest === 1) {
        return 'gridbox-highlight-1';
      } else if (match.userInterest === 0) {
        return 'gridbox-highlight-0';
      }
    // with adminOverride
    } else {
      if (match.adminOverride > match.userInterest) {
        return 'gridbox-highlight-green';
      } else if (match.adminOverride === match.userInterest) {
        return 'gridbox-highlight-grey';
      } else if (match.adminOverride < match.userInterest) {
        return 'gridbox-highlight-red';
      }
    }
  };

  $scope.downloadData = function () {
    $http.get(SERVER_URL + '/api/matches/download')
    .success(function () {
      if (arguments[1] === 200) {
        $scope.dataToDownload = arguments[0];
        download(arguments[0], 'exported', 'text/csv');
      }
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

/*

keyMap is an object of oppIds
{
    oppId: colId,
    oppId: colId,
}

matrix is an object of objects...
{
  // first prepopulate with userIds
  userId: [ {matchId, userInterest}, {matchId, userInterest} ]
  userId: [ {matchId, userInterest}, {matchId, userInterest} ]
}
*/
