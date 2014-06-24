app.factory('GuidanceService', function(){

  var objectifyUserTags = function(user){
    var tags = user.tags;
    var tagsObj = {};

    tags.forEach(function(tag){
      tagsObj[tag.tag._id] = tag.value;
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

    tags.forEach(function(tag){
      if(tag.importance === 'must'){
        processed.must[tag.tag.type].push({
          name: tag.tag.name,
          value: tag.value,
          userValue: userTags[tag.tag._id]
        });
      } else if (tag.importance === 'nice'){
        processed.nice[tag.tag.type].push({
          name: tag.tag.name,
          value: tag.value,
          userValue: userTags[tag.tag._id]
        });
      }
    });

    return processed;
  };

  return {
    processTags: function(opportunity, user){
      return processTags(opportunity, user);
    }
  }

});