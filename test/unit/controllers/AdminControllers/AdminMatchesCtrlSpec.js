'use strict';

describe('Unit: AdminMatchesCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminMatchesCtrl', {
      $scope: scope
    });
  }));

  // describe('$scope properties', function(){
  //   it('should have a slots property', function(){
  //     expect(scope.slots).toBeDefined();
  //   });
  // });

});