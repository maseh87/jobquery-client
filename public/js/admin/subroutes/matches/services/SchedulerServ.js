app.factory('Scheduler', ['Opportunity', 'User', 'Match', '$q', function(Opportunity, User, Match, $q) {
  var candidatesMap;

  var retrieveData  = function() {
    var data = [];
      data.push(Opportunity.getAll());
      data.push(User.getAll());
      data.push(Match.getAll());
      console.log('getting data');
      return $q.all(data);
  };

  var prepareData  = function(opportunities, candidates, matches, numberOfSlots) {
    var data = {};
    data.constraints = {};
    var opportunitiesMap;
    var slotQueues;
    var matchesMap;


    matchesMap    = createMatchesMap(matches);
    candidates    = filterActiveCandidates(candidates);
    opportunities = filterActiveOpportunities(opportunities);
    candidatesMap = convertToMap(candidates);
    // opportunitiesMap = convertToMap(opportunities);

    data.constraints.maxInterviews = Math.ceil(numberOfSlots * opportunities.length / candidates.length);
    data.constraints.numberOfCandidates = candidates.length;
    data.slotQueues = slotQueueGeneration(opportunities, candidatesMap, matchesMap, numberOfSlots);
    return data;
  };

  var createMatchesMap = function (matches) {
    var matchesMap = {};

    for (var i = 0; i < matches.matches.length; i++) {
      matchesMap[matches.matches[i].user] = matchesMap[matches.matches[i].user] === undefined ? {} : matchesMap[matches.matches[i].user] ;
      matchesMap[matches.matches[i].user][matches.matches[i].opportunity] = matches.matches[i];
    }

    return matchesMap;
  };

  var filterActiveCandidates = function (candidates) {
    return candidates.filter(function (candidate) {
       if(candidate.isAdmin) return false;
       //if(!candidate.attending) return false;
       //if(!candidate.isRegistered) return false;
       return true;
    });
  };

  var filterActiveOpportunities = function (opportunities) {
    opportunities = opportunities.filter(function (opportunity) {
       if(!opportunity.active) return false;
       return true;
    });
    //TODO REMOVE REMOVE HARDCODED oppertunities restriction
    return opportunities.slice(0,10);
  };

  var convertToMap = function (models) {
    var mappedModels = {};
    models.forEach(function (model) {
      mappedModels[model._id] = model;
    });

    return mappedModels;
  };

  var slotQueueGeneration = function (opportunities, candidatesMap, matchesMap, numberOfSlots) {
    var slots = [];
    var candidates = [];
    var candidateIds = Object.keys(candidatesMap);
    var interestSort = function (a, b) {
      return a.interest - b.interest;
    };

    for (var x = 0; x < opportunities.length; x++) {
      slots[x] = slots[x] === undefined ? [] : slots[x];
      for (var y = 0; y < numberOfSlots; y++) {
        slots[x][y] = slots[x][y] === undefined ? [] : slots[x][y];
        // define order of candidates per slot
        slots[x][y] = candidateIds;
        // get interest for each oppertunity and candidate intersection
        for (var i = 0; i < candidateIds.length; i++) {
          candidates.push({
            id : candidateIds[i],
            interest : matchesMap[candidateIds[i]][opportunities[x]._id].userInterest
          });
        }

        candidates.sort(interestSort);
        slots[x][y] = candidates;
        candidates = [];
      }
    }
    return slots;
  };

  var runAssignment = function (data) {
    var board = [];
    // generate board
    for (var i = 0; i < data.slotQueues.length; i++) {
      board.push([]);
    }
    do {
      doPass(board, data);

    }
    while (solutionFound(board) === false);

    return board;
  };

  var doPass = function (board, data) {
    var slotApplied;
    var changeLastPass = false;
    var temp;
    data.tempQueues = data.tempQueues || [];
    for (var x = 0; x < data.slotQueues.length; x++) {
      for (var y = 0; y < data.slotQueues[x].length; y++) {
        if (board[x][y] === undefined) {
          data.tempQueues[x] = data.tempQueues[x] || [];
          data.tempQueues[x][y] = data.tempQueues[x][y] || [];

          if (data.changeLastPass) {
            // append temp array back on to the slot queues
            if (data.tempQueues[x][y].length > 0) {
              //debugger;
            }
            data.slotQueues[x][y] = data.slotQueues[x][y].concat(data.tempQueues[x][y]);
            data.tempQueues[x][y] = [];
          }

          // assign slot
          board[x][y] = data.slotQueues[x][y].pop();
          slotApplied = true;
          if (board[x][y] === undefined) {
            slotApplied = false;
          }
          // check hard constraints
          if(!hardConstraintsValid(board, data.constraints)) {
            // remove assignment
            board[x][y] = undefined;
            slotApplied = false;
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
            slotApplied = false;

          }
          if (slotApplied) {
            changeLastPass = true;
          }
        }
      }
    }
    data.changeLastPass = changeLastPass;
  };

  var solutionFound = function (board) {
    var validSolution = true;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === undefined) {
          validSolution = false;
        }
      }
    }
    return validSolution;
  };

var hardConstraintsValid = function (board, constraints) {
  var isValid = true;
  // check candidate is not assigned twice in the same time slot
  isValid = isValid && oneCandidatePerTimeSlotConstraint(board);
  // check candidate is not assigned twice to interview with the same oppertunity
  isValid = isValid && oneCandidatePerOppertunityConstraint(board);
  isValid = isValid && maxNumberOfInterviewsPerCandidateConstraint(board, constraints.maxInterviews);
  return isValid;
};

var softConstraintsValid = function (board, constraints) {
  var isValid = true;

  isValid = isValid && fairnessPerCandidate(board, constraints.numberOfCandidates);

  return isValid;
};

var oneCandidatePerTimeSlotConstraint = function (board) {
  var valid = true;
  var unique;
  for (var y = 0; y < board[0].length; y++) {
    unique = {};
    for (var x = 0; x < board.length; x++) {
      if (board[x][y] !== undefined) {
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
      if (board[x][y] !== undefined) {
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
      if (board[x][y] !== undefined) {
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

var fairnessPerCandidate = function (board, numberOfCandidates) {
  var valid = true;
  var interviewCount = {};
  var interviewsDelta = 0;
  var minInterviews;
  var maxInterviews;
  var count;

  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      if (board[x][y] !== undefined) {
        interviewCount[board[x][y].id] = interviewCount[board[x][y].id] === undefined ? 0 : interviewCount[board[x][y].id];
        interviewCount[board[x][y].id]++;
      }
    }
  }

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

    if (maxInterviews - minInterviews > 1) {
      valid = false;
    }

  } else {
    for (count in interviewCount) {
      if (interviewCount[count] > 1) {
        valid = false;
      }
    }
  }

  return valid;
};

  return {
    schedule : function(numberOfslots) {
      var processedInput;
      retrieveData().then(function (data) {
        var assigned;
        console.log('Data Retrieved', data);
        // opportunities, candidates, matches, numberOfSlots
        processedInput = prepareData(data[0], data[1], data[2], numberOfslots);
        console.log('Queued', processedInput);
        assigned = runAssignment(processedInput);
        console.log('Assigned',assigned);

        var interviewCount = {};

        for (var x = 0; x < assigned.length; x++) {
          for (var y = 0; y < assigned[x].length; y++) {
            if (assigned[x][y] !== undefined) {
              interviewCount[assigned[x][y].id] = interviewCount[assigned[x][y].id] === undefined ? 0 : interviewCount[assigned[x][y].id];
              interviewCount[assigned[x][y].id]++;
            }
          }
        }
        return assigned;
      });
    }
  };
}]);
