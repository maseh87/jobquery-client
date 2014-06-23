app.factory('Category', ['$http', 'SERVER_URL', function ($http, SERVER_URL) {
    var categoryMethods = {};

    categoryMethods.getAll = function (type) {
      if(!type){
        return $http({
          method: 'GET',
          url: SERVER_URL + '/api/categories'
        }).then(function (response) {
          return response.data;
        });
      } else {
        return $http({
          method: 'GET',
          url: SERVER_URL + '/api/categories/type/' + type
        }).then(function (response) {
          return response.data;
        });
      }
    };

    categoryMethods.create = function (category) {
      return $http({
        method: 'POST',
        url: SERVER_URL + '/api/categories',
        data: category
      }).then(function (response) {
        return response.data;
      });
    };

    categoryMethods.update = function (category) {
      return $http({
        method: 'PUT',
        url: SERVER_URL + '/api/categories/' + category._id,
        data: category
      }).then(function (response) {
        return response.data;
      });
    };

    return categoryMethods;
  }]);
