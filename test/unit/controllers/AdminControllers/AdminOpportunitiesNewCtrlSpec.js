'use strict';

describe('Unit: AdminOpportunitiesNewCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminOpportunitiesNewCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){

    it('should have a sorter property', function(){
      expect(scope.sorter).toBeDefined();
    });

    it('should have a reverse property', function(){
      expect(scope.reverse).toBeDefined();
    });

    it('should have a readOnly property', function(){
      expect(scope.readOnly).toBeDefined();
    });

    it('should have a basic property', function(){
      expect(scope.basic).toBeDefined();
    });

    it('should have a guidance property', function(){
      expect(scope.guidance).toBeDefined();
    });

    it('should have a calculateFit property', function(){
      expect(scope.calculateFit).toBeDefined();
    });

  });

  describe('$scope methods', function(){

    it('should have a interceptCompany method', function(){
      expect(scope.interceptCompany).toBeDefined();
      expect(typeof scope.interceptCompany).toBe('function');
    });

    it('should have a interceptCategory method', function(){
      expect(scope.interceptCategory).toBeDefined();
      expect(typeof scope.interceptCategory).toBe('function');
    });

    it('should have a mapToView method', function(){
      expect(scope.mapToView).toBeDefined();
      expect(typeof scope.mapToView).toBe('function');
    });

    it('should have a save method', function(){
      expect(scope.save).toBeDefined();
      expect(typeof scope.save).toBe('function');
    });

  });

});