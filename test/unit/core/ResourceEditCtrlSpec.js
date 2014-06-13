describe('ResourceEditCtrl', function(){
  var $controller,
      $httpBackend,
      $rootScope,
      createController,
      User,
      scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    scope = $rootScope.$new();
    User = $injector.get('User');

    createController = function(Resource){
      return $controller('ResourceEditCtrl', {
        '$scope': scope,
        Resource: Resource
      });
    };

  }));

  it('should exist', function(){
    var controller = createController({});
    expect(typeof controller).toBe('object');
  });


  it('should set updated to true on successful update', function(){
    $httpBackend.expectPUT('http://localhost:9000/api/users')
    .respond({});
    var controller = createController(User);
    scope.update({_id : 1}, {});
    $httpBackend.flush();
    expect(scope.updated).toBe(true);
  });

  it('should set error on scope when trying to edit and there is a server error ', function(){
    $httpBackend.expectPUT('http://localhost:9000/api/users')
    .respond(500);
    var controller = createController(User);
    scope.update({_id : 1}, {});
    $httpBackend.flush();
    expect(scope.updateError).toBe(true);
  });

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
