app.factory('TagResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/tags/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Tag', ['TagResource', '$http', 'SERVER_URL', function (TagResource, $http, SERVER_URL) {
  var tagMethods = {};

  tagMethods.getAll = function (id) {
    var url = SERVER_URL + '/api/tags';
    if(id) {
      url += '/' + id;
    }
    return $http({
      method: 'GET',
      url: url,
      cache: true
    })
    .then(function(response) {
      return response.data;
    });
  };

  tagMethods.get = function (id) {
    return tagMethods.getAll(id);
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
