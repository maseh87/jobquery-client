'use strict';

describe('Unit: AdminCandidatesCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminCandidatesCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){

    it('should have a query property', function(){
      expect(scope.query).toBeDefined();
    });

    it('should have a config property', function(){
      expect(scope.config).toBeDefined();
    });

    it('should have a sorter property', function(){
      expect(scope.sorter).toBeDefined();
    });

    it('should have a noPercentMessage property', function(){
      expect(scope.noPercentMessage).toBeDefined();
    });
  });

  describe('$scope methods', function(){

    it('should have a toggleAccepted method', function(){
      expect(scope.toggleAccepted).toBeDefined();
      expect(typeof scope.toggleAccepted).toBe('function');
    });

    it('should have a excludeAccepted method', function(){
      expect(scope.excludeAccepted).toBeDefined();
      expect(typeof scope.excludeAccepted).toBe('function');
    });

    it('should have a includeAccepted method', function(){
      expect(scope.includeAccepted).toBeDefined();
      expect(typeof scope.includeAccepted).toBe('function');
    });

    it('should have a toggleCheckbox method', function(){
      expect(scope.toggleCheckbox).toBeDefined();
      expect(typeof scope.toggleCheckbox).toBe('function');
    });

    it('should have a downloadData method', function(){
      expect(scope.downloadData).toBeDefined();
      expect(typeof scope.downloadData).toBe('function');
    });

  });
});