'use strict';

describe('Unit: UsersCompaniesCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersCompaniesCtrl', {
      $scope: scope
    });
  }));

  describe('$scope.opp', function(){
    it('should have scope.opp that equals "Opportunities"', function(){
      expect(scope.opp).toBeDefined();
      expect(scope.opp).toEqual('Opportunities');
    });
  });

  describe('$scope.num', function(){
    it('should have a scope.num function', function(){
      expect(scope.num).toBeDefined();
      expect(typeof scope.num).toEqual('function');
    });
  });

  describe('$scope.location', function(){
    it('should have a scope.location function', function(){
      expect(scope.location).toBeDefined();
      expect(typeof scope.location).toEqual('function');
    });
  });


});