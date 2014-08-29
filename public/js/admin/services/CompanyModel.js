app.factory('CompanyResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/companies/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Company', ['CompanyResource', 'SERVER_URL', '$http', function (CompanyResource, SERVER_URL, $http) {
  var companyMethods = {};

  companyMethods.getAll = function (id) {
    var url = SERVER_URL + '/api/companies';
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

  companyMethods.get = function (id) {
    return companyMethods.getAll(id);
  };

  companyMethods.create = function (company) {
    var company = new CompanyResource(company);
    return company.$save();
  };

  companyMethods.update = function (company) {
    return CompanyResource.update({_id: company._id}, company).$promise;
  };

  return companyMethods;
}]);
