app.factory('generateGlyphs', function () {

  var service = {};

  var findGlyph = function (importance, type, tagThreshold, userLevel) {

    if (importance === 'must') {
      if ( (userLevel >= tagThreshold && type === 'scale') ||
           (userLevel === tagThreshold && type === 'binary') ) {
        return 'glyphicon-thumbs-up';
      } else {
        return 'glyphicon-remove';
      }
    } else if (importance === 'nice') {
      if ( (userLevel >= tagThreshold && type === 'scale') ||
           (userLevel === tagThreshold && type === 'binary') ) {
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

  service.calculateFit = function (importance, type, tagThreshold, userLevel) {
    var icon = findGlyph(importance, type, tagThreshold, userLevel);
    var color = colorIcons(icon);
    return [icon, color];
  };

  return service;
});
