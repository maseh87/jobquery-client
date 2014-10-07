'use strict';

describe('Unit: AdminDashboardCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminDashboardCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){
    it('should have a candidateCategoryQuery property', function(){
      expect(scope.candidateCategoryQuery).toBeDefined();
    });
  });

  describe('$scope methods', function(){

    describe('$scope.humanifyDate', function(){

      it('should have a humanifyDate method', function(){
        expect(scope.humanifyDate).toBeDefined();
        expect(typeof scope.humanifyDate).toBe('function');
      });

    });

    describe('$scope.updateMatch', function(){

      it('should have a updateMatch method', function(){
        expect(scope.updateMatch).toBeDefined();
        expect(typeof scope.updateMatch).toBe('function');
      });

    });

    describe('$scope.batchProcess', function(){

      it('should have a batchProcess method', function(){
        expect(scope.batchProcess).toBeDefined();
        expect(typeof scope.batchProcess).toBe('function');
      });

    });

    describe('$scope.customQuery', function(){

      it('should have a customQuery method', function(){
        expect(scope.customQuery).toBeDefined();
        expect(typeof scope.customQuery).toBe('function');
      });

    });

    describe('$scope.fetchAll', function(){

      it('should have a fetchAll method', function(){
        expect(scope.fetchAll).toBeDefined();
        expect(typeof scope.fetchAll).toBe('function');
      });

    });

    describe('$scope.filterEntries', function(){

      it('should have a filterEntries method', function(){
        expect(scope.filterEntries).toBeDefined();
        expect(typeof scope.filterEntries).toBe('function');
      });

    });

    describe('$scope.populateEntries', function(){

      it('should have a populateEntries method', function(){
        expect(scope.populateEntries).toBeDefined();
        expect(typeof scope.populateEntries).toBe('function');
      });

    });

    describe('$scope.sort', function(){

      it('should have a sort method', function(){
        expect(scope.sort).toBeDefined();
        expect(typeof scope.sort).toBe('function');
      });

    });

  });

});