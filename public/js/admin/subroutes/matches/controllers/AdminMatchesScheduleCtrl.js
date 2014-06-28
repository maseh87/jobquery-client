app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler', 
  function ($scope, $state, Match, Opportunity, User, Scheduler) {

    var schedulerOutput = Scheduler.schedule(); 
    // i herd u like schedules, so i put a schedule in ur schedule so u can schedule while u schedule

    $scope.opportunities = schedulerOutput.opportunities;
    $scope.schedule = schedulerOutput.schedule;



/*
output = {
  opportunitites: [
    {
      _id : "111",
      // rest of opportunity props
    },
    {
      _id : "222",
      // rest of opportunity props
    }
  ],
  schedule : {
    "111" : [
      {
        // user id
        id : "2342342",
        interest : 4
      },
      {
        // user id
        id : "423424",
        interest : 4
      }
      // rest of schedule for specific opp
    ],
    "222" : [
      {
        // user id
        id : "2342342",
        interest : 4
      },
      {
        // user id
        id : "423424",
        interest : 4
      }
      // rest of schedule for specific opp
    ],
  }

}
*/

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