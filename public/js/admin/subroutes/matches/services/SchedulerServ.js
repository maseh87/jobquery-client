//app.factory('Scheduler', ['Opportunity', 'User', 'Match', '$q', function (Opportunity, User, Match, $q) {
app.factory('Scheduler', ['Opportunity', 'FilterService', 'User', 'Match', '$q', function (Opportunity, FilterService, User, Match, $q) {

var later = function(){

  // var matchesSortedByInterest = FilterService.matchesSortedByInterest;
  // var usersForSchedule = FilterService.usersForSchedule;
  // var opportunities = FilterService.opportunities;
  //
  // var opportunityAppointment = [];
  // var userSchedule = {};
  // var scheduleData = [];
  // var oppToSchedule;
  //
  // var createScheduleMatrix = function() {
  //   // var opportunities = FilterService.opportunities;
  //   var scheduleMatrix = {};
  //   var indexNumber = 0;
  //   var breakRounds = [4,5,6,7,8];
  //   _.forEach(opportunities, function(opportunity, oppId) {
  //     //console.log("HERERERERERERERERRRRRRRRRR");
  //     var roundsForThisOpportunity = new Array(11);
  //     var breakRound = breakRounds[indexNumber % 5];
  //     roundsForThisOpportunity[breakRound] = 'BREAK';
  //     scheduleMatrix[oppId] = roundsForThisOpportunity;
  //     indexNumber++;
  //   });
  //     console.dir(scheduleMatrix);
  //   return scheduleMatrix;
  // };
  //
  // var scheduleMatrix = createScheduleMatrix();
  // //makeScheduleData(usersForSchedule, opportunities, matchesSortedByInterest);
  //
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
  //               console.log("Calling scheduleSingleOpp()");
  //             }
  //           }else{
  //             //pop oppId and schedule it(schedule it is a helper function)
  //             oppToSchedule = matchesForThisInterestLevel[numberOfRequests][userId].pop();
  //             //scheduleSingleOpp(oppToSchedule, userId);
  //             console.log("Calling scheduleSingleOpp()");
  //           }
  //
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
  ///console.dir(matchesSortedByInterest);
  /////scheduler function//////
  // inputs oppId, userId

  //userForSchedule = usersForSchedule[userId];
  //oppSchedule = scheduleMatrix[oppId];

  //var wasScheduled = false;
  //for each timeSlot in oppSchdedule

    //if it is empty && !userForSchedule[scheduleForThisUser][timeSlot]
      //oppSchedule[timeSlot] = userId;
      //userForSchedule[scheduleForThisUser][timeSlot] = oppId;
      //wasScheduled = true;
      //userForSchedule[numberOfRounds]++;
      //break (from for loop)
  //if !wasScheduled
    //for each timeSlot in oppSchedule
      //if wasScheduled
        //break

      //if timeSlot is undefined
        //var emptySpaceIndex = timeSlot
        //for each tiemSlot2 in oppSchedule
          //if timeSlot2 is not undefined
            //var possibleSwitchIndex = timeSlot2
            //wasScheduled = switch(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule)
            //if wasScheduled
              //break


  /////switch(emptySpaceIndex, possibleSwitchIndex, oppSchedule, userForSchedule)////
  //if userForSchedule[scheduleForThisUser][possibleSwitchIndex]
    //return false

  //var possibleUserToSwitchWith = oppSchdedule[possibleSwitchIndex]
  //var isBreak = possibleUserToSwitchWith === 'BREAK'
  //if !isBreak && usersForSchedule[possibleUserToSwitchWith][scheduleForThisUser][emptySpaceIndex]
    //return false

  //oppSchedule[emptySpaceIndex] = possibleUserToSwitchWith
  //if !isBreak
    //usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser.emptySpaceIndex = oppId;
    //delete usersForSchedule[possibleUserToSwitchWith].scheduleForThisUser.possibleSwitchIndex;

  //oppSchedule[possibleSwitchIndex] = userId
  //userForSchedule.scheduleForThisUser.possibleSwitchIndex = oppId;
  //userForSchedule.numberOfRounds++;

  //return true


    return {
    //   userSchedule: userSchedule,
    // //  opportunitySchedule: makeScheduleData,
    //   //interests: opportunityAppointment,
    //   scheduleData: scheduleData
    };
  };
  //setTimeout(later, 6000);
}]);