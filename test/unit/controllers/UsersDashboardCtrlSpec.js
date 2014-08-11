'use strict';

describe('Unit: UsersDashboardCtrl', function() {
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersDashboardCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){

    it('should have a submitText property', function(){
      expect(scope.submitText).toBeDefined();
    });

    it('should have a pendingRequests property', function(){
      expect(scope.pendingRequests).toBeDefined();
    });

    it('should have a slides property', function(){
      expect(scope.slides).toBeDefined();
    });

    it('should have a default property', function(){
      expect(scope.default).toBeDefined();
    });

    it('should have a isVideo property', function(){
      expect(scope.isVideo).toBeDefined();
    });

    it('should have a tips property', function(){
      expect(scope.tips).toBeDefined();
    });
  });

  describe('$scope methods', function(){

    it('should have a trustSrc method', function(){
      expect(scope.trustSrc).toBeDefined();
      expect(typeof scope.trustSrc).toBe('function');
    });

    it('should have a setImage method', function(){
      expect(scope.setImage).toBeDefined();
      expect(typeof scope.setImage).toBe('function');
    });

    it('should have a updateInterest method', function(){
      expect(scope.updateInterest).toBeDefined();
      expect(typeof scope.updateInterest).toBe('function');
    });

    it('should have a hasInterest method', function(){
      expect(scope.hasInterest).toBeDefined();
      expect(typeof scope.hasInterest).toBe('function');
    });

    it('should have a submit method', function(){
      expect(scope.submit).toBeDefined();
      expect(typeof scope.submit).toBe('function');
    });
  })

});