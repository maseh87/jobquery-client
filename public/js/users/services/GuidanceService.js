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
            // add if threshold is met
            points[0] += Number(userTags[tag.tag._id]);
          }
          points[1] += Number(tag.value); // always add to denominator
        } else if (tag.tag.type ==='binary') {
          if (userTags[tag.tag._id] === tag.value) {
            points[0] += 4; // assume perfect score
          }
          points[1] += 4; // assume binary questions are out of 4
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
        // calculate scores for 'nice'
        // half-weight for 'nice', but can only ever be positive
        if (tag.tag.type === 'scale') {
          if (userTags[tag.tag._id] >= tag.value) {
            points[0] += Number(userTags[tag.tag._id] * 0.50);
            points[1] += Number(userTags[tag.tag._id] * 0.50);
          }
        } else if (tag.tag.type ==='binary') {
          if (userTags[tag.tag._id] === tag.value) {
            points[0] += 4 * 0.50;
            points[1] += 4 * 0.50;
          }
        }
      }
    });

    score = Number((points[0] / points[1] * 100).toFixed(0));

    return [processed, score];
  };

  return {
    processTags: function(opportunity, user){
      return processTags(opportunity, user);
    }
  };

});

app.factory('generateGlyphs', function () {

  var service = {};

  var findGlyph = function (tagType, tagThreshold, userLevel) {
    if (tagType === 'must') {
      if (userLevel >= tagThreshold) {
        return 'glyphicon-thumbs-up';
      } else {
        return 'glyphicon-remove';
      }
    } else {
      if (userLevel >= tagThreshold) {
        return 'glyphicon-plus';
      } else {
        return '';
      }
    }
  };

  var colorIcons = function (icon) {
    if (icon === 'glyphicon-thumbs-up') {
      return 'green';
    } else if (icon ==='glyphicon-remove') {
      return 'red';
    } else if (icon ==='glyphicon-plus') {
      return 'grey';
    }
  };

  service.calculateFit = function (tagType, tagThreshold, userLevel) {
    var icon = findGlyph(tagType, tagThreshold, userLevel);
    var color = colorIcons(icon);
    return [icon, color];
  };

  return service;
});
