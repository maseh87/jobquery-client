//app.factory('Scheduler', ['Opportunity', 'User', 'Match', '$q', function (Opportunity, User, Match, $q) {
app.factory('Scheduler', ['Opportunity', 'FilterService', 'User', 'Match', '$q', function (Opportunity, FilterService, User, Match, $q) {

var later = function(){
  // var matchesSortedByInterest = FilterService.matchesSortedByInterest;
  // // console.dir(matchesSortedByInterest);
  // var usersForSchedule = FilterService.usersForSchedule;

  // var opportunityAppointment = [];
  // var userSchedule = {};
  // var scheduleData = [];
  // var oppToSchedule;

  // var createScheduleMatrix = function() {
  //   var opportunities = FilterService.opportunities;
  //   var scheduleMatrix = {};
  //   var indexNumber = 0;
  //   var breakRounds = [4,5,6,7,8];
  //   _.forEach(opportunities, function(opportunity, oppId) {
  //     var roundsForThisOpportunity = new Array(11);
  //     var breakRound = breakRounds[indexNumber % 5];
  //     roundsForThisOpportunity[breakRound] = 'BREAK';
  //     scheduleMatrix[oppId] = roundsForThisOpportunity;
  //     indexNumber++;
  //   });
  //   return scheduleMatrix;
  // };

  // var scheduleMatrix = createScheduleMatrix();
  // //makeScheduleData(usersForSchedule, opportunities, matchesSortedByInterest);

  // //////scheduleAllMatches()/////////////////
  // var scheduleAllMatches =function() {
  //   //for everything interestLevel
  //   for(var interestLevel = 14; interestLevel > 1; interestLevel--){
  //     var numberOfRoundsScheduledTicker = 0;
  //     //while matchesSortedByInterest at this interestLevel has keys
  //     var matchesForThisInterestLevel = matchesSortedByInterest[interestLevel];
  //     while ( matchesForThisInterestLevel ) {
  //       //for each interestLevel starting at the lowest
  //       for(var numberOfRequests in matchesForThisInterestLevel){
  //         //for each userId
  //         for(var userId in matchesForThisInterestLevel[numberOfRequests]){
  //           //if interestLevel is less than 11
  //           if( interestLevel < 11 ){
  //             //if # for this user equals numberOfRoundsScheduledTicker
  //             if(usersForSchedule[userId].numberOfRounds === numberOfRoundsScheduledTicker) {
  //               //pop oppId and schedule it(schedule it is a helper function)
  //               oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
  //               //scheduleSingleOpp(oppToSchedule, userId);
  //             }
  //           }else{
  //             //pop oppId and schedule it(schedule it is a helper function)
  //             oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
  //             //scheduleSingleOpp(oppToSchedule, userId);
  //           }

  //           //check if userId's value is empty
  //           if(matchesForThisInterestLevel[numberOfRequests][userId].length === 0){
  //             //delete userId
  //             delete matchesForThisInterestLevel[numberOfRequests][userId];
  //           }
  //         }
  //         //if the numberOfRequests has no properties, delete it
  //         if( Object.keys(matchesForThisInterestLevel[numberOfRequests]).length === 0 ) {
  //           delete matchesForThisInterestLevel[numberOfRequests];
  //         }
  //       }
  //       numberOfRoundsScheduledTicker++;
  //       //if the matchesForThisInterestLevel has no properties, delete it
  //       if( Object.keys(matchesForThisInterestLevel).length === 0 ) {
  //         delete matchesSortedByInterest[interestLevel];
  //       }
  //     }
  //   }
  // };

  // scheduleAllMatches();


  return {
    // userSchedule: userSchedule,
  //  opportunitySchedule: makeScheduleData,
    //interests: opportunityAppointment,
    // scheduleData: scheduleData
  };
};

// setTimeout(later, 4000);

}]);
