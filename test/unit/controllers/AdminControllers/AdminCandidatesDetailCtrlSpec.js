'use strict';

describe('Unit: AdminCandidatesDetailCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminCandidatesDetailCtrl', {
      $scope: scope
    });
  }));

  describe('$scope methods', function(){

    describe('$scope.update', function(){

      it('should have an update method', function(){
        expect(scope.update).toBeDefined();
        expect(typeof scope.update).toBe('function');
      });
    
    });

    describe('$scope.filter', function(){

      it('should have a filter method', function(){
        expect(scope.filter).toBeDefined();
        expect(typeof scope.filter).toBe('function');
      });

    });

    describe('$scope.addPrivateTag', function(){

      it('should have an addPrivateTag method', function(){
        expect(scope.addPrivateTag).toBeDefined();
        expect(typeof scope.addPrivateTag).toBe('function');
      });

    });

    describe('$scope.removePrivateTag', function(){

      it('should have a removePrivateTag method', function(){
        expect(scope.removePrivateTag).toBeDefined();
        expect(typeof scope.removePrivateTag).toBe('function');
      });

    });

    describe('$scope.addNewCategory', function(){

      it('should have a addNewCategory method', function(){
        expect(scope.addNewCategory).toBeDefined();
        expect(typeof scope.addNewCategory).toBe('function');
      });

    });

  });
});
