describe('UsersCompaniesCtrl', function(){

  var $httpBackend, SERVER_URL;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    var UsersCompany = $injector.get('UsersCompany');
    SERVER_URL = $injector.get('SERVER_URL');

    createController = function(){
      return $controller('UsersCompaniesCtrl', {
        $scope: $rootScope.$new(),
        UsersCompany: UsersCompany
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should make a GET request for all companies', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/public/companies').respond([{},{}]);
    var controller = createController();
    $httpBackend.flush();
  });

});