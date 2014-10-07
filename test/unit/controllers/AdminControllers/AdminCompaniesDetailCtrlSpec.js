'use strict';

describe('Unit: AdminCompaniesDetailCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector) {


    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminCompaniesDetailCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){
    it('should have a readOnly property', function(){
      expect(scope.readOnly).toBeDefined();
    });
  });

  describe('$scope methods', function(){

    describe('$scope.toggleEdit', function(){

      it('should have a toggleEdit method', function(){
        expect(scope.toggleEdit).toBeDefined();
        expect(typeof scope.toggleEdit).toBe('function');
      });

    });

    describe('$scope.update', function(){

      it('should have an update method', function(){
        expect(scope.update).toBeDefined();
        expect(typeof scope.update).toBe('function');
      });

    });

    describe('$scope.addMedia', function(){

      it('should have an addMedia method', function(){
        expect(scope.addMedia).toBeDefined();
        expect(typeof scope.addMedia).toBe('function');
      });

    });

    describe('$scope.removeMedia', function(){

      it('should have a removeMedia method', function(){
        expect(scope.removeMedia).toBeDefined();
        expect(typeof scope.removeMedia).toBe('function');
      });

    });

    describe('$scope.addLink', function(){

      it('should have an addLink method', function(){
        expect(scope.addLink).toBeDefined();
        expect(typeof scope.addLink).toBe('function');
      });

    });

    describe('$scope.removeLink', function(){

      it('should have a removeLink method', function(){
        expect(scope.removeLink).toBeDefined();
        expect(typeof scope.removeLink).toBe('function');
      });

    });

  });

});