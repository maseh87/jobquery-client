describe('UsersCompaniesDetailCtrl', function(){

  var $httpBackend, SERVER_URL;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    var Company = $injector.get('Company');
    SERVER_URL = $injector.get('SERVER_URL');

    createController = function(){
      return $controller('UsersCompaniesDetailCtrl', {
        $scope: $rootScope.$new(),
        Company: Company
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should make a GET request for a single company', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/companies/1').respond({});
    var controller = createController();
    $httpBackend.flush();
  });

});