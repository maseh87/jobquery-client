app.factory('Scheduler', ['Opportunity', 'User', 'Match', '$q', function (Opportunity, User, Match, $q) {
              // app.factory('Scheduler', ['Opportunity', 'FilterService', 'User', 'Match', '$q', function (Opportunity, FilterService, User, Match, $q) {
              //
              //   var users = FilterService.users;
              //   var opportunities = FilterService.opportunities;
              //
              //   //each opportunities sorted schedule
              //   var opportunitySortedInterests = [];
              //   var userSchedule = {};
              //   //array to populate the grid for the schedule view
              //   var scheduleData = [];
              //
              //   //make each opp schedule for 4s
              //   var opportunitySchedule = function() {
              //     _.forEach(opportunities, function(opportunity, oppId) {
              //       var arr = [];
              //       var scheduleObj = concatArrays(opportunity.interest[4], oppId);
              //       console.log("################scheduleObj", scheduleObj);
              //       opportunitySortedInterests.push(scheduleObj);
              //     });
              //     console.log(userSchedule, ' userSchedule');
              //     return opportunitySortedInterests;
              //   };
              //
              //
              //
              //
              //   //function to concate arrays for opportunity shedule
              //   var concatArrays = function(obj, oppId) {
              //       var round = 0;
              //       var result = {};
              //       var opportunityRounds = [];
              //
              //     _.forEach(obj, function(userIdArray, requestedNumber) {
              //       // schedule.push(userIdArray);
              //       for(var i = 0; i < userIdArray.length; i++) {
              //         var userId = userIdArray[i];
              //         if(round < 10) {
              //           opportunityRounds.push(userId);
              //           if(!userSchedule[userId]) {
              //             userSchedule[userId] = [];
              //           }
              //           userSchedule[userId][round] = oppId;
              //           round++;
              //         }
              //       }
              //     });
              //     result[oppId] = opportunityRounds;
              //     populateSchedule(opportunityRounds, oppId);
              //     return result;
              //   };
              //
              //
              //   //this function will populate the rows for the schedule spreadsheet
              //   var populateSchedule = function(opportunityRounds, opportunityId) {
              //     var result = {'opportunity': opportunities[opportunityId].company.name};
              //     _.forEach(opportunityRounds, function(userId, index) {
              //       var round = 'R' + (index + 1);
              //       result[userId] = round;
              //     });
              //     scheduleData.push(result);
              //   };
              //
              //
              //
              //
              //
              //     return {
              //       userSchedule: userSchedule,
              //       opportunitySchedule: opportunitySchedule,
              //       interests: opportunitySortedInterests,
              //       scheduleData: scheduleData
              //     };
  var candidatesMap;
  var candidatesTotal;

  var retrieveData  = function () {
    var data = [];
      data.push(Opportunity.getAll());
      data.push(User.getAll());
      data.push(Match.getAll());
      return $q.all(data);
  };

  var prepareData  = function (opportunities, candidates, matches, numberOfSlots, maxInterviews, minInterviews) {
    var data = {};
    data.constraints = {};
    var opportunitiesMap;
    var slotQueues;
    var matchesMap;

    candidates    = filterIneligibleCandidates(candidates);
    opportunities = filterIneligibleOpportunities(opportunities);

    matchesMap    = createMatchesMap(matches);
    candidatesMap = convertToMap(candidates);

    candidatesTotal = candidates.length;

    data.candidates    = candidates;
    data.opportunities = opportunities;
    data.constraints.numberOfSlots = numberOfSlots;
    data.constraints.minInterviews = minInterviews;
    data.constraints.maxInterviews = maxInterviews;//Math.ceil(numberOfSlots * opportunities.length / candidates.length);
    data.constraints.numberOfCandidates = candidates.length;
    data.slotQueues = slotQueueGeneration(opportunities, candidatesMap, matchesMap, numberOfSlots);
    return data;
  };

  var createMatchesMap = function (matches) {
    var matchesMap = {};

    for (var i = 0; i < matches.matches.length; i++) {
      matchesMap[matches.matches[i].user] = matchesMap[matches.matches[i].user] === undefined ? {} : matchesMap[matches.matches[i].user];
      matchesMap[matches.matches[i].user][matches.matches[i].opportunity] = matches.matches[i];
    }

    return matchesMap;
  };

  var filterIneligibleCandidates = function (candidates) {
    return candidates.filter(function (candidate) {
      if(candidate.isAdmin) return false;
      if(!candidate.attending) return false;
      if(!candidate.isRegistered) return false;
      if((candidate.searchStage === 'Out') || (candidate.searchStage === 'Accepted')) return false;
       return true;
    });
  };

  var filterIneligibleOpportunities = function (opportunities) {
    opportunities = opportunities.filter(function (opportunity) {
      if (!opportunity.active) return false;
      if (!opportunity.approved) return false;
      if (opportunity.category.name === "Not Attending Hiring Day") return false;
      return true;
    });
    return opportunities;
  };

  var convertToMap = function (models) {
    var mappedModels = {};
    models.forEach(function (model) {
      mappedModels[model._id] = model;
    });

    return mappedModels;
  };

  var slotQueueGeneration = function (opportunities, candidatesMap, matchesMap, numberOfSlots) {
    var DO_NOT_USE_ADMIN_OVERRIDE = 0;
    var slots = [];
    var candidatesInterestQueue = [];
    var candidateIds = Object.keys(candidatesMap);
    var interest;
    var isOverridden;
    var interestSort = function (a, b) {
      return a.interest - b.interest;
    };

    for (var x = 0; x < opportunities.length; x++) {
      slots[x] = slots[x] === undefined ? [] : slots[x];
      for (var y = 0; y < numberOfSlots; y++) {
        // get interest for each oppertunity and candidate intersection
        for (var i = 0; i < candidateIds.length; i++) {
          // use admin override if it is applied
          if (matchesMap[candidateIds[i]][opportunities[x]._id].adminOverride > DO_NOT_USE_ADMIN_OVERRIDE) {
            interest = matchesMap[candidateIds[i]][opportunities[x]._id].adminOverride;
            isOverridden = true;
          } else {
            interest = matchesMap[candidateIds[i]][opportunities[x]._id].userInterest;
            isOverridden = false;
          }
          candidatesInterestQueue.push({
            id : candidateIds[i],
            interest : interest,
            isOverridden : isOverridden
          });
        }
        // sort candidate by interest
        candidatesInterestQueue.sort(interestSort);
        slots[x][y] = candidatesInterestQueue;
        candidatesInterestQueue = [];
      }
    }
    return slots;
  };

  var runAssignment = function (data) {
    var output = {};
    var schedule = [];
    // generate schedule
    for (var i = 0; i < data.slotQueues.length; i++) {
      schedule.push([]);
    }

    schedule = assignBreaks(schedule);

    do {
      doPass(schedule, data);
    }
    while (isSolution(schedule) === false);

    output.constraints   = data.constraints;
    output.schedule      = schedule;
    output.opportunities = data.opportunities;
    output.candidates    = data.candidates;

    return output;
  };

  var assignBreaks = function (schedule) {
    var y = 3;

    for (var x = 0; x < schedule.length; x++) {
      schedule[x][y] = "BREAK";
      if ( y === 7) {
        y = 3;
      } else {
        y++;
      }
    }

    return schedule;
  };


  var doPass = function (board, data) {
    board.passesWithoutChange = board.passesWithoutChange === undefined ? 0 : board.passesWithoutChange;
    var slotAssignedThisPass;
    var changeLastPass = false;
    data.tempQueues = data.tempQueues || [];
    for (var x = 0; x < data.slotQueues.length; x++) {
      for (var y = 0; y < data.slotQueues[x].length; y++) {
        if (board[x][y] === undefined) {
          data.tempQueues[x] = data.tempQueues[x] || [];
          data.tempQueues[x][y] = data.tempQueues[x][y] || [];

          if (data.changeLastPass) {
            // append temp queue back on to the slot queues
            data.slotQueues[x][y] = data.slotQueues[x][y].concat(data.tempQueues[x][y]);
            data.tempQueues[x][y] = [];
          }

          // assign slot
          board[x][y] = data.slotQueues[x][y].pop();
          slotAssignedThisPass = true;
          if (board[x][y] === undefined) {
            slotAssignedThisPass = false;
          }
          // check hard constraints
          if(!hardConstraintsValid(board, data.constraints)) {
            // remove assignment
            board[x][y] = undefined;
            slotAssignedThisPass = false;
          }

          // check soft constraints
          if(!softConstraintsValid(board, data.constraints)) {
            // if there was an assignment on the last pass
            if (data.changeLastPass) {
              // push back on to queue
              data.slotQueues[x][y].push(board[x][y]);
            } else {
              // push onto temp queue
              data.tempQueues[x][y].unshift(board[x][y]);
            }

            board[x][y] = undefined;
            slotAssignedThisPass = false;

          }
          if (slotAssignedThisPass) {
            changeLastPass = true;
          }
        }
      }
    }
    data.changeLastPass = changeLastPass;
    if (!data.changeLastPass) {
      board.passesWithoutChange++;
    } else {
      board.passesWithoutChange = 0;
    }
  };

  var isSolution = function (board) {
    var validSolution = true;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === undefined) {
          validSolution = false;
        }
      }
    }
    if (board.passesWithoutChange > candidatesTotal) {
      validSolution = true;
    }

    return validSolution;
  };

  var hardConstraintsValid = function (board, constraints) {
    var isValid = true;
    isValid = isValid && oneCandidatePerTimeSlotConstraint(board);
    isValid = isValid && oneCandidatePerOppertunityConstraint(board);
    isValid = isValid && maxNumberOfInterviewsPerCandidateConstraint(board, constraints.maxInterviews);
    return isValid;
  };

  var softConstraintsValid = function (board, constraints) {
    var isValid = true;

    isValid = isValid && fairnessPerCandidate(board, constraints.numberOfCandidates, constraints.minInterviews);

    return isValid;
  };

  var oneCandidatePerTimeSlotConstraint = function (board) {
    var valid = true;
    var unique;
    for (var y = 0; y < board[0].length; y++) {
      unique = {};
      for (var x = 0; x < board.length; x++) {
        if (board[x][y] !== undefined && board[x][y] !== "BREAK") {
          unique[board[x][y].id] = unique[board[x][y].id] === undefined ? 0 : unique[board[x][y].id];
          unique[board[x][y].id]++;
          if (unique[board[x][y].id] > 1) {
            valid = false;
          }
        }
      }
    }
    return valid;
  };

  var oneCandidatePerOppertunityConstraint = function (board) {
    var valid = true;
    var unique;
    for (var x = 0; x < board.length; x++) {
      unique = {};
      for (var y = 0; y < board[x].length; y++) {
        if (board[x][y] !== undefined && board[x][y] !== "BREAK") {
          unique[board[x][y].id] = unique[board[x][y].id] === undefined ? 0 : unique[board[x][y].id];
          unique[board[x][y].id]++;
          if (unique[board[x][y].id] > 1) {
            valid = false;
          }
        }
      }
    }
    return valid;
  };

  var maxNumberOfInterviewsPerCandidateConstraint = function (board, maxInterviews) {
    var valid = true;
    board.interviewCount = {};

    for (var x = 0; x < board.length; x++) {
      for (var y = 0; y < board[x].length; y++) {
        if (board[x][y] !== undefined && board[x][y] !== "BREAK") {
          board.interviewCount[board[x][y].id] = board.interviewCount[board[x][y].id] === undefined ? 0 : board.interviewCount[board[x][y].id];
          board.interviewCount[board[x][y].id]++;
          if (board.interviewCount[board[x][y].id] > maxInterviews) {
            valid = false;
          }
        }
      }
    }
    return valid;
  };

  var fairnessPerCandidate = function (board, numberOfCandidates, minimum) {
    var MAX_INTERVIEW_DELTA = 1;
    var valid = true;
    var interviewCount = {};
    var minInterviews;
    var maxInterviews;
    var count;

    for (var x = 0; x < board.length; x++) {
      for (var y = 0; y < board[x].length; y++) {
        if (board[x][y] !== undefined && board[x][y] !== "BREAK") {
          interviewCount[board[x][y].id] = interviewCount[board[x][y].id] === undefined ? 0 : interviewCount[board[x][y].id];
          interviewCount[board[x][y].id]++;
        }
      }
    }


    var keys = Object.keys(interviewCount).length ;

    // if all candidates have been assigned at least once
    if (Object.keys(interviewCount).length === numberOfCandidates) {
      for (count in interviewCount) {
        minInterviews = minInterviews === undefined ? interviewCount[count] : minInterviews;
        maxInterviews = maxInterviews === undefined ? interviewCount[count] : maxInterviews;

        // set max
        if (interviewCount[count] > maxInterviews) {
          maxInterviews = interviewCount[count];
        }
        // set min
        if (interviewCount[count] < minInterviews) {
          minInterviews = interviewCount[count];
        }
      }

      if (maxInterviews - minInterviews > MAX_INTERVIEW_DELTA) {
        if (minInterviews < minimum) {
          valid = false;
        }
      }

    } else {
      for (count in interviewCount) {
        if (interviewCount[count] > MAX_INTERVIEW_DELTA) {
          valid = false;
        }
      }
    }

    return valid;
  };

  var processOutput = function (output) {
    var schedule          = {};
    var interviewCount    = {};
    var candidateSchedule = {};
    var candidateBreaks   = {};
    var x;
    var y;

    // calculate interview count
    for (x = 0; x < output.schedule.length; x++) {
      for (y = 0; y < output.schedule[x].length; y++) {
        if (output.schedule[x][y] !== undefined && output.schedule[x][y] !== "BREAK") {
          interviewCount[output.schedule[x][y].id] = interviewCount[output.schedule[x][y].id] === undefined ? 0 : interviewCount[output.schedule[x][y].id];
          interviewCount[output.schedule[x][y].id]++;
        }
      }
    }

    var populateArray = function () {
      var array = [];
      var max = output.constraints.numberOfSlots;
      while(max--) array.push("BREAK");

      return array;
    };


    // transform schedule to key value opp id -> to slot array
    for (x = 0; x < output.schedule.length; x++) {
      for (y = 0; y < output.schedule[x].length; y++) {
        if (output.schedule[x][y] !== undefined && output.schedule[x][y] !== "BREAK") {
          candidateSchedule[output.schedule[x][y].id] = candidateSchedule[output.schedule[x][y].id] === undefined ? populateArray() : candidateSchedule[output.schedule[x][y].id];
          candidateSchedule[output.schedule[x][y].id][y] = output.schedule[x][y].interest;
        }
      }
    }
    var fillCandidateBreaks = function (item,index) {
      if (item === 'BREAK') {
        candidateBreaks[id] = candidateBreaks[id] === undefined ? "" : candidateBreaks[id];
        candidateBreaks[id] += (index + 1) + " ";
      }
    };

    for (var id in candidateSchedule) {
      candidateSchedule[id].forEach(fillCandidateBreaks);
    }

    // transform schedule to key value candidate id -> to slot array
    for (var j = 0; j < output.schedule.length; j++) {
      schedule[output.opportunities[j]._id] = output.schedule[j];
    }
    output.interviewCount    = interviewCount;
    output.candidateBreaks   = candidateBreaks;
    output.candidateSchedule = candidateSchedule;
    output.schedule          = schedule;

    return output;
  };

  var grid = [];
  function populateGrid(numberOfRounds, maxInterviews, minInterviews, callback) {
      var processedInput;
      retrieveData().then(function (data) {
        var OPPORTUNITIES_INDEX  = 0;
        var CANDIDATES_INDEX     = 1;
        var MATCHES_INDEX        = 2;
        var assigned;
        var output;
        processedInput = prepareData(data[OPPORTUNITIES_INDEX], data[CANDIDATES_INDEX], data[MATCHES_INDEX], numberOfRounds, maxInterviews, minInterviews);
        output = runAssignment(processedInput);
        output = processOutput(output);
        callback(output);
      });
  }
  populateGrid(11, 10, 6, function(output) {
    // console.log(output);
    for (var i = 0; i < output.opportunities.length; i++) {
      // console.log(output.opportunities[i]);
      grid.push(
      {
        opportunity: output.opportunities[i].jobTitle,

      }
      );
    }
  });



  return {
    schedule : function(numberOfRounds, maxInterviews, minInterviews, callback) {
      var processedInput;
      retrieveData().then(function (data) {
        var OPPORTUNITIES_INDEX  = 0;
        var CANDIDATES_INDEX     = 1;
        var MATCHES_INDEX        = 2;
        var assigned;
        var output;
        processedInput = prepareData(data[OPPORTUNITIES_INDEX], data[CANDIDATES_INDEX], data[MATCHES_INDEX], numberOfRounds, maxInterviews, minInterviews);
        output = runAssignment(processedInput);
        output = processOutput(output);
        callback(output);
      });
    },
    grid: grid
    //mason put this here for testing
    // getData: function () {
    //   var data = [];
    //   data.push(Opportunity.getAll());
    //   data.push(User.getAll());
    //   data.push(Match.getAll());
    //   return $q.all(data);
    // }
  };
}]);