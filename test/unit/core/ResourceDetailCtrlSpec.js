describe('ResourceDetailCtrl', function(){
  var $httpBackend, $rootScope, createController, User, $stateParams;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');

    $stateParams = $injector.get('$stateParams');
    $stateParams._id = 1;

    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    User = $injector.get('User');

    createController = function(Resource){
      return $controller('ResourceDetailCtrl', {
        '$scope': $rootScope,
        '$stateParams': $stateParams,
        Resource: Resource
      });
    };

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch a single user', function(){
    $httpBackend.expectGET('http://localhost:9000/api/users/1')
    .respond({});
    var controller = createController(User);
    $httpBackend.flush();
  });

});

