describe('ResourceNewCtrl', function(){
  var $httpBackend,
      $rootScope,
      $controller,
      User,
      createController,
      scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    scope = $rootScope.$new();
    User = $injector.get('User');

    createController = function(Resource){
      return $controller('ResourceNewCtrl', {
        '$scope': scope,
        Resource: Resource
      });
    };

  }));

  it('should exist', function(){
    var controller = createController({});
    expect(typeof controller).toBe('object');
  });


  it('should post a new user', function(){
    $httpBackend.expectPOST('http://localhost:9000/api/users')
    .respond({});
    var controller = createController(User);
    scope.save({});
    $httpBackend.flush();
    expect(scope.saved).toBe(true);
  });

  it('should set save to true on successful save', function(){
    $httpBackend.expectPOST('http://localhost:9000/api/users')
    .respond({});
    var controller = createController(User);
    scope.save({_id : 1}, {});
    $httpBackend.flush();
    expect(scope.saved).toBe(true);
  });

  it('should set error on scope when trying to save and there is a server error', function(){
    $httpBackend.expectPOST('http://localhost:9000/api/users')
    .respond(500);
    var controller = createController(User);
    scope.save({_id : 1}, {});
    $httpBackend.flush();
    expect(scope.saveError).toBe(true);
  });

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
