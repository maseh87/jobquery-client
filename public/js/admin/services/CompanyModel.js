app.factory('CompanyResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/companies/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Company', ['CompanyResource', function (CompanyResource) {
  var companyMethods = {};

  companyMethods.getAll = function () {
    return CompanyResource.query().$promise;
  };

  companyMethods.get = function (id) {
    return CompanyResource.get({_id: id}).$promise;
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
