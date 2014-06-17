describe('AdminCandidatesNewCtrl', function(){
  var User,
      $rootScope,
      $controller,
      $httpBackend;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    $rootScope   = $injector.get('$rootScope');
    $controller  = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    User         = $injector.get('User');

    $scope     = $rootScope.$new();

    controller = $controller('AdminCandidatesNewCtrl', {
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
    expect(typeof controller).toBe('object');
  });

  it('sendEmails should exist', function() {
    expect(typeof $scope.sendEmails).toBe('function');
  });

  it('emailCSVPattern should exist', function(){
    expect(typeof $scope.emailCSVPattern).toBe('function');
  });

  it('sendEmails should make no post request when undefined passed in', function() {
    $scope.sendEmails(undefined);
  });

  it('sendEmails should make one post request when one email address passed in', function() {
    var email = 'test@test.com';
    $httpBackend.expectPOST('http://localhost:9000/api/users', {'0':'test@test.com'}).respond({});
    $scope.sendEmails(email);
    $httpBackend.flush();
  });

  it('sendEmails should make two post request when two email address passed in', function() {
    var email = 'test@test.com,test1@test.com';
    $httpBackend.expectPOST('http://localhost:9000/api/users', {'0':'test@test.com', '1': 'test1@test.com'}).respond({});
    $scope.sendEmails(email);
    $httpBackend.flush();
  });

  it('sendEmails should reset $scope.emails to empty string', function() {
    $scope.emails = 'test@test.com,test1@test.com';
    var email = 'test@test.com,test1@test.com';
    $httpBackend.expectPOST('http://localhost:9000/api/users', {'0':'test@test.com', '1': 'test1@test.com'}).respond({});
    $scope.sendEmails(email);
    $httpBackend.flush();

    expect($scope.emailStrings === '').toBe(true);
  });

  it('invoking emailCSVPattern should return a object', function(){
    expect(typeof $scope.emailCSVPattern()).toBe('object');
  });

  it('invoking emailCSVPattern should return a object with a test function attribute', function(){
    expect(typeof $scope.emailCSVPattern().test).toBe('function');
  });

  it('invoking emailCSVPattern test function with empty string should return false', function(){
    expect($scope.emailCSVPattern().test("")).toBe(false);
  });

  it('invoking emailCSVPattern test function with undefined should return false', function(){
    expect($scope.emailCSVPattern().test(undefined)).toBe(false);
  });

  it('invoking emailCSVPattern test function with valid email should return true', function(){
    expect($scope.emailCSVPattern().test('test@test.com')).toBe(true);
  });

  it('invoking emailCSVPattern test function with invalid email should return false', function(){
    expect($scope.emailCSVPattern().test('test@testcom')).toBe(false);
  });

  it('invoking emailCSVPattern test function with valid emails should return true', function(){
    expect($scope.emailCSVPattern().test('test@test.com,test@tes.com')).toBe(true);
  });

  it('invoking emailCSVPattern test function with invalid emails should return false', function(){
    expect($scope.emailCSVPattern().test('test@test.com,testtes.com')).toBe(false);
  });


});
