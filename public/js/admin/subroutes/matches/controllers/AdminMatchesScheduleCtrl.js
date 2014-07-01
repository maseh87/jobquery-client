app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler',
  function ($scope, $state, Match, Opportunity, User, Scheduler) {

    $scope.slots = [
        {time: '09:00am'},
        {time: '09:15am'},
        {time: '09:30am'},
        {time: '09:45am'},
        {time: '10:00am'},
        {time: '10:15am'},
        {time: '10:30am'},
        {time: '10:45am'},
        {time: '11:00am'},
        {time: '11:15am'},
        {time: '11:30am'}
    ];

    var schedulerOutput = Scheduler.schedule(11, 10, 6, function(output) {
        $scope.opportunities = output.opportunities;
        $scope.schedule = output.schedule;
        console.log(output);
    });
    // i herd u like schedules, so i put a schedule in ur schedule so u can schedule while u schedule

    // $scope.opportunities = schedulerOutput.opportunities;
    // $scope.schedule = schedulerOutput.schedule;



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
