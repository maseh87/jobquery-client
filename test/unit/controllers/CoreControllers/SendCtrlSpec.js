'use strict';

describe('Unit: SendCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('SendCtrl', {
      $scope: scope
    });
  }));

  describe('$scope methods', function(){
    it('should have a sendPasswordReset method', function(){
      expect(scope.sendPasswordReset).toBeDefined();
      expect(typeof scope.sendPasswordReset).toBe('function');
    });
  });

});