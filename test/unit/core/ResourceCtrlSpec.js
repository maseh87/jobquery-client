describe('ResourceCtrl', function(){
  var $httpBackend,
      $rootScope,
      createController,
      User;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    User = $injector.get('User');

    createController = function(Resource){
      return $controller('ResourceCtrl', {
        '$scope': $rootScope,
        Resource: Resource
      });
    };

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch a list of resources', function(){
    $httpBackend.expectGET('http://localhost:9000/api/users')
    .respond([{},{}]);
    var controller = createController(User);
    $httpBackend.flush();
  });

});
