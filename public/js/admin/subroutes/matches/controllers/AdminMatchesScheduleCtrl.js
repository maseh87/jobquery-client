app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 
  function ($scope, $state, Match, Opportunity, User) {

    $scope.slots = 6;
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

}]);