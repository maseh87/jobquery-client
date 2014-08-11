'use strict';

describe('Unit: UsersCompaniesDetailCtrl', function() {
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersCompaniesDetailCtrl', {
      $scope: scope
    });
  }));

  it('should have a scope', function(){
    expect(scope).toBeDefined();
  });

});