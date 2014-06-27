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
