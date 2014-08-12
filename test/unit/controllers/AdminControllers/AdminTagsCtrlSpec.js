'use strict';

describe('Unit: AdminTagsCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminTagsCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){

    it('should have a pendingRequests property', function(){
      expect(scope.pendingRequests).toBeDefined();
    });

  });

  describe('$scope methods', function(){

    it('should have a moveUp method', function(){
      expect(scope.moveUp).toBeDefined();
      expect(typeof scope.moveUp).toBe('function');
    });

    it('should have a moveDown method', function(){
      expect(scope.moveDown).toBeDefined();
      expect(typeof scope.moveDown).toBe('function');
    });

    it('should have a save method', function(){
      expect(scope.save).toBeDefined();
      expect(typeof scope.save).toBe('function');
    });

    it('should have a add method', function(){
      expect(scope.add).toBeDefined();
      expect(typeof scope.add).toBe('function');
    });

    it('should have a moveUp method', function(){
      expect(scope.moveUp).toBeDefined();
      expect(typeof scope.moveUp).toBe('function');
    });

    it('should have a remove method', function(){
      expect(scope.remove).toBeDefined();
      expect(typeof scope.remove).toBe('function');
    });

    it('should have a addCategory method', function(){
      expect(scope.addCategory).toBeDefined();
      expect(typeof scope.addCategory).toBe('function');
    });

    it('should have a saveCategory method', function(){
      expect(scope.saveCategory).toBeDefined();
      expect(typeof scope.saveCategory).toBe('function');
    });

    it('should have a removeCategory method', function(){
      expect(scope.removeCategory).toBeDefined();
      expect(typeof scope.removeCategory).toBe('function');
    });

  });
});