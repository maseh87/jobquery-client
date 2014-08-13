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

    it('should have a update method', function(){
      expect(scope.update).toBeDefined();
    });

    it('should have a filter method', function(){
      expect(scope.filter).toBeDefined();
    });

    it('should have a addPrivateTag method', function(){
      expect(scope.addPrivateTag).toBeDefined();
    });

    it('should have a removePrivateTag method', function(){
      expect(scope.removePrivateTag).toBeDefined();
    });

    it('should have a addNewCategory method', function(){
      expect(scope.addNewCategory).toBeDefined();
    });

  });
});