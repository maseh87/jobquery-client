app.factory('GuidanceService', function(){

  var objectifyUserTags = function(user){
    var tags = user.tags;
    var tagsObj = {};

    tags.forEach(function(tag){
      // populated, so must got down one level for id
      if (tag.tag._id) {
        tagsObj[tag.tag._id] = tag.value;
      // not populated, so tag is already the id
      } else {
        tagsObj[tag.tag] = tag.value;
      }
    });
    return tagsObj;
  };

  var processTags = function(opportunity, user){
    var userTags = objectifyUserTags(user);
    var tags = opportunity.tags;
    var processed = {
      'must': {
        'scale': [],
        'binary': [],
        'text': []
      },
      'nice': {
        'scale': [],
        'binary': [],
        'text': []
      }
    };
    var points = [0, 0];
    var score;

    tags.forEach(function(tag){
      if(tag.importance === 'must'){
        processed.must[tag.tag.type].push({
          name:         tag.tag.name,
          value:        tag.value,
          userValue:    userTags[tag.tag._id],
          type:         tag.tag.type,
          importance:   tag.importance
        });
        // define 'importance' but not enumerable
        Object.defineProperty(processed.must, 'importance', {
          value: 'must',
          enumerable: false
        });
        // calculate scores for 'must'
        if (tag.tag.type === 'scale') {
          if (userTags[tag.tag._id] >= tag.value) {
            points[0] += 1;
          }
          points[1] += 1;
        } else if (tag.tag.type ==='binary') {
          if (userTags[tag.tag._id] === tag.value) {
            points[0] += 1;
          }
          points[1] += 1;
        }
      } else if (tag.importance === 'nice'){
        processed.nice[tag.tag.type].push({
          name:         tag.tag.name,
          value:        tag.value,
          userValue:    userTags[tag.tag._id],
          type:         tag.tag.type,
          importance:   tag.importance
        });
        // define 'importance' but not enumerable
        Object.defineProperty(processed.nice, 'importance', {
          value: 'nice',
          enumerable: false
        });
        // disabled
        // calculate scores for 'nice'
        // half-weight for 'nice', but can only ever be positive
        // if (tag.tag.type === 'scale') {
        //   if (userTags[tag.tag._id] >= tag.value) {
        //     points[0] += Number(userTags[tag.tag._id] * 0.50);
        //     points[1] += Number(userTags[tag.tag._id] * 0.50);
        //   }
        // } else if (tag.tag.type ==='binary') {
        //   if (userTags[tag.tag._id] === tag.value) {
        //     points[0] += 4 * 0.50;
        //     points[1] += 4 * 0.50;
        //   }
        // }
      }
    });

    // default score to 100% if there are no criteria
    if (points[1] === 0) {
      score = 100;
    } else {
      score = Number((points[0] / points[1] * 100).toFixed(0));
    }
    return [processed, score];
  };

  return {
    processTags: function(opportunity, user){
      return processTags(opportunity, user);
    }
  };

});
