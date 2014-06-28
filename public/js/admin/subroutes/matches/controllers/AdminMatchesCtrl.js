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
      $scope.users.forEach(function (user, i) { userMap[user._id] = user.name; });

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
    // console.log(match); // EDIT NOT IMPLEMENTED YET
  };

  $scope.isOverridden = function (match) {
    return match.adminOverride > 0 ? 'gridbox-highlight-blue' : '';
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
