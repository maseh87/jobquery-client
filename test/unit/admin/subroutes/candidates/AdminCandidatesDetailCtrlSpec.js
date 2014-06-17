describe('AdminCandidatesDetailCtrl', function(){
  var SERVER_URL = 'http://jobquery.azurewebsites.net';
  var User,
      $rootScope,
      $controller,
      $httpBackend,
      $stateParams;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    $httpBackend = $injector.get('$httpBackend');
    $rootScope   = $injector.get('$rootScope');
    $controller  = $injector.get('$controller');
    $stateParams = $injector.get('$stateParams');
    User         = $injector.get('User');

    $scope = $rootScope.$new();
    $stateParams._id = '1';

    controller = $controller('AdminCandidatesDetailCtrl', {
        Resource     : User,
        $controller  : $controller,
        $scope       : $scope,
        $stateParams : $stateParams
      });

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    expect(typeof controller).toBe('object');
    $httpBackend.flush();
  });

  it('User.get function should be invoked', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    expect(typeof $scope.update).toBe('function');
    $httpBackend.flush();
  });

  it('create function should exist', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    expect(typeof $scope.update).toBe('function');
    $httpBackend.flush();
  });

  it('invoking update function with user should send put request', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    $httpBackend.expectPUT(SERVER_URL + '/api/users/1',{_id : 1}).respond({});
    $scope.update({_id : 1});
    $httpBackend.flush();
  });

  it('invoking update function with user should set saved to true', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    $httpBackend.expectPUT(SERVER_URL + '/api/users/1',{_id : 1}).respond({});
    $scope.update({_id : 1});
    $httpBackend.flush();
    expect($scope.updated === true).toBe(true);
  });

  it('invoking update function with user and a error occurs should set save error to true', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users/1').respond({});
    $httpBackend.expectPUT(SERVER_URL + '/api/users/1',{_id : 1}).respond(500);
    $scope.update({_id : 1});
    $httpBackend.flush();
    expect($scope.saveError === true).toBe(true);
  });

});
