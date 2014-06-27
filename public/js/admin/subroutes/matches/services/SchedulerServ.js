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

  var prepareData  = function(opportunities, candidates, matches, numberOfslots) {
    var opportunitiesMap;
    var slotQueues;
    var matchesMap;

    matchesMap       = createMatchesMap(matches);
    candidates       = filterActiveCandidates(candidates);
    opportunities    = filterActiveOpportunities(opportunities);
    console.log('cans', candidates.length);
    candidatesMap    = convertToMap(candidates);
    // opportunitiesMap = convertToMap(opportunities);
    slotQueues = slotQueueGeneration(opportunities, candidatesMap, matchesMap, numberOfslots);
    return slotQueues;
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
    return opportunities.slice(0,5);
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

    console.log('Before slots', matchesMap);
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

  var assignSlots = function (queuedSlots) {
    var board = [];
    // generate board
    for (var i = 0; i < queuedSlots.length; i++) {
      board.push([]);
    }
    //debugger;
    console.log('board', board);
    do {
      doPass(board, queuedSlots);
    }
    while (solutionFound(board) === false);

    return board;
  };

  var solutionFound = function (board) {
    var validSolution = true;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === undefined) {
          console.log('board',board,i,j);
          validSolution = false;
        }
      }
    }
    return validSolution;
  };

  var doPass = function (board, queuedSlots) {
    console.log('pass', board );
    for (var x = 0; x < queuedSlots.length; x++) {
      for (var y = 0; y < queuedSlots[x].length; y++) {
        if (board[x][y] === undefined) {
          // assign slot
          board[x][y] = queuedSlots[x][y].pop();
          // check constraints
          if(!constraintsValid(board)) {
            // remove assignment
            board[x][y] = undefined;
          }
        }
      }
    }
  };

var constraintsValid = function (board) {
  var isValid = true;
  // check candidate is not assigned twice in the same time slot
  isValid = isValid && oneCandidatePerTimeSlotConstraint(board);
  isValid = isValid && oneCandidatePerOppertunityConstraint(board);
  // check candidate is not assigned twice to interview with the same oppertunity
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

  return {
    schedule : function(numberOfslots) {
      var queuedSlots;
      retrieveData().then(function (data) {
        var assigned;
        console.log('Data Retrieved', data);
        // opportunities, candidates, matches, numberOfSlots
        queuedSlots = prepareData(data[0], data[1], data[2], numberOfslots);
        console.log('Queued', queuedSlots);
        assigned = assignSlots(queuedSlots);
        console.log('Assigned',assigned);
        return assigned;
      });
    }
  };
}]);
