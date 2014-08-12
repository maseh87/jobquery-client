'use strict';

describe('Unit: UsersOpportunitiesCtrl', function() {
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersOpportunitiesCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){
    it('should have a sorter property', function(){
      expect(scope.sorter).toBeDefined();
    });
  });

  describe('$scope methods', function(){
    it('should have a goToDetail method', function(){
      expect(scope.goToDetail).toBeDefined();
      expect(typeof scope.goToDetail).toBe('function');
    });
  });
});