app.factory('TagResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/tags/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Tag', ['TagResource', function (TagResource) {
  var tagMethods = {};

  tagMethods.getAll = function () {
    return TagResource.query().$promise;
  };

  tagMethods.get = function (id) {
    return TagResource.get({_id: id}).$promise;
  };

  tagMethods.create = function (newTag) {
    var tag = new TagResource(newTag);
    return tag.$save();
  };

  tagMethods.update = function (tag) {
    return TagResource.update({_id: tag._id}, tag).$promise;
  };

  return tagMethods;
}]);
