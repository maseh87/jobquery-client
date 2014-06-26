app.factory('Scheduler', ['Opportunity', 'User', '$q', function(Opportunity, User, $q) {
  var candidatesMap;

  var retrieveData  = function() {
    var data = [];
      data.push(Opportunity.getAll());
      data.push(User.getAll());
      console.log('getting data');
      return $q.all(data);
  };

  var prepareData  = function(opportunities, candidates, numberOfslots) {
    var opportunitiesMap;
    var slotQueues;

    candidates       = filterActiveCandidates(candidates);
    opportunities    = filterActiveOpportunities(opportunities);
    candidatesMap    = convertToMap(candidates);
    // opportunitiesMap = convertToMap(opportunities);
    slotQueues = slotQueueGeneration(opportunities, candidatesMap, numberOfslots);
    return slotQueues;
  };

  var slotQueueGeneration = function (opportunities, candidatesMap, numberOfSlots) {
    var slots = [];
    console.log('Before slots');
    for (var i = 0; i < opportunities.length; i++) {
      slots[i] = slots[i] === undefined ? [] : slots[i];
      for (var j = 0; j < numberOfSlots; j++) {
        slots[i][j] = slots[i][j] === undefined ? [] : slots[i][j];
        // define order of candidates per slot
        slots[i][j] = Object.keys(candidatesMap);
      }
    }

    return slots;
  };

  var filterActiveCandidates = function (candidates) {
    return candidates.filter(function (candidate) {
       if(candidate.isAdmin) return false;
       if(!candidate.attending) return false;
       if(!candidate.isRegistered) return false;
       return true;
    });
  };

  var convertToMap = function (models) {
    var mappedModels = {};
    models.forEach(function (model) {
      mappedModels[model._id] = model;
    });

    return mappedModels;
  };

  var filterActiveOpportunities = function (opportunities) {
    return opportunities.filter(function (opportunity) {
       if(!opportunity.active) return false;
       return true;
    });
  };

  var assignSlots = function (queuedSlots) {
    var board = [];
    // generate board
    for (var i = 0; i < queuedSlots.length; i++) {
      board.push([]);
    }

    console.log('board', board);
    do {
      doPass(board, queuedSlots);
    }
    while (!solutionFound(board));

    return board;
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

  var doPass = function (board, queuedSlots) {
    for (var i = 0; i < queuedSlots.length; i++) {
      for (var j = 0; j < queuedSlots[i].length; j++) {
        console.log('pass',i,j, queuedSlots[i][j] );
        if (board[i][j] === undefined) {
          // assign slot
          board[i][j] = queuedSlots[i][j].pop();
          // check constraints
            // remove assignment
        }
      }
    }
  };


  return {
    schedule : function(numberOfslots) {
      var queuedSlots;
      retrieveData().then(function (data) {
        var assigned;
        console.log('Data Retrieved', queuedSlots);
        // opportunities, candidates, numberOfSlots
        queuedSlots = prepareData(data[0], data[1], numberOfslots);
        console.log('Queued', queuedSlots);
        assigned = assignSlots(queuedSlots);
        console.log('Assigned',assignSlots(queuedSlots));
        return assigned;
      });
    }
  };
}]);
