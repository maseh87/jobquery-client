'use strict';

describe('Unit: AdminCandidatesCtrl', function(){
  var ctrl, scope, User, Match, $httpBackend;

  // Load the module with MainController
  beforeEach(module('jobQuery'));

  // Inject services used inside controller
  beforeEach(inject(function($injector){
    User = $injector.get('User');
    Match = $injector.get('Match');
    $httpBackend = $injector.get('$httpBackend');
  }));

  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminCandidatesCtrl', {
      $scope: scope,
      User: User,
      Match: Match
    });

  }));

  // afterEach(function(){

  //   $httpBackend.verifyNoOutstandingExpectation();
  //   $httpBackend.verifyNoOutstandingRequest();

  // });

  describe('$scope properties', function(){

    describe('query property', function(){

      it('should have a query property', function(){
        expect(scope.query).toBeDefined();
      });

      it('should be an empty string', function(){
        expect(scope.query).toBe('');
      });

    });

    describe('config property', function(){

      it('should have a config property', function(){
        expect(scope.config).toBeDefined();
      });

      it('should be an object', function(){
        expect(typeof scope.config).toBe('object');
      });

      it('should have an exclude property', function(){
        expect(scope.config.exclude).toBeDefined();
      });
    });

    describe('sorter property', function(){

      it('should have a sorter property', function(){
        expect(scope.sorter).toBeDefined();
      });

      it('should equal "name"', function(){
        expect(scope.sorter).toBe('name');
      });
    });

    describe('noPercentMessage property', function(){

      it('should have a noPercentMessage property', function(){
        expect(scope.noPercentMessage).toBeDefined();
      });

      it('should equal "n/a"', function(){
        expect(scope.noPercentMessage).toBe('n/a');
      });
    });

  });

  describe('$scope methods', function(){

    describe('toggleAccepted method', function(){

      it('should have a toggleAccepted method', function(){
        expect(scope.toggleAccepted).toBeDefined();
        expect(typeof scope.toggleAccepted).toBe('function');
      });

      it('should call $scope.excludeAccepted when passed a truthy argument', function(){
        spyOn(scope, 'excludeAccepted');
        scope.toggleAccepted(true);
        expect(scope.excludeAccepted).toHaveBeenCalled();
      });

      it('should call $scope.includeAccepted when passed a falsy argument', function(){
        spyOn(scope, 'includeAccepted');
        scope.toggleAccepted(false);
        expect(scope.includeAccepted).toHaveBeenCalled();
      });

    });

    describe('excludeAccepted method', function(){

      it('should have a excludeAccepted method', function(){
        expect(scope.excludeAccepted).toBeDefined();
        expect(typeof scope.excludeAccepted).toBe('function');
      });

      it('should create $scope.groups object', function(){
        expect(scope.groups).toBeUndefined();

        scope.excludeAccepted();

        expect(scope.groups).toBeDefined();
        expect(typeof scope.groups).toBe('object');

      });

    });

    describe('includeAccepted method', function(){

      it('should have a includeAccepted method', function(){
        expect(scope.includeAccepted).toBeDefined();
        expect(typeof scope.includeAccepted).toBe('function');
      });

    });

    describe('toggleCheckbox method', function(){

      it('should have a toggleCheckbox method', function(){
        expect(scope.toggleCheckbox).toBeDefined();
        expect(typeof scope.toggleCheckbox).toBe('function');
      });

      it('should call User.update', function(){
        var user = {};
        user._id = 2;
        var property = true;
        user.property = property;

        spyOn(User, 'update');
        scope.toggleCheckbox(user, property);
        expect(User.update).toHaveBeenCalled();

      });

    });

    describe('downloadData method', function(){

      it('should have a downloadData method', function(){
        expect(scope.downloadData).toBeDefined();
        expect(typeof scope.downloadData).toBe('function');
      });

    });

  });
});