describe('AdminCandidatesCtrl', function(){
  var SERVER_URL = 'http://jobquery.azurewebsites.net';
  var User,
      $scope,
      $rootScope,
      $controller,
      $httpBackend,
      $stateParams,
      controller;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');
    $rootScope   = $injector.get('$rootScope');
    $controller  = $injector.get('$controller');
    User         = $injector.get('User');

    $scope = $rootScope.$new();
    controller = $controller('AdminCandidatesCtrl', {
          Resource    : User,
          $controller : $controller,
          $scope      : $scope
        });
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/users').respond([]);
    expect(typeof controller).toBe('object');
    $httpBackend.flush();
  });

  it('User.get function should be invoked', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users').respond([]);
    $httpBackend.flush();
  });

});
