'use strict';

describe('Unit: UsersSidebarCtrl', function() {
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersSidebarCtrl', {
      $scope: scope
    });
  }));

  //NEED TO REFACTOR CTRL TO REMOVE DOM MANIPULATION BEFORE TESTS WILL WORK

  // describe('$scope properties', function(){
  //   it('should have a currentStateHeading property', function(){
  //     expect(scope.currentStateHeading).toBeDefined();
  //   });
  // });

  // describe('$scope methods', function(){
  //   it('should have a goToDetail method', function(){
  //     expect(scope.goToDetail).toBeDefined();
  //     expect(typeof scope.goToDetail).toBe('function');
  //   });
  // });
});