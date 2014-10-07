'use strict';

describe('Unit: AdminOpportunitiesDetailCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminOpportunitiesDetailCtrl', {
      $scope: scope
    });
  }));

  describe('$scope properties', function(){

    it('should have a sorter property', function(){
      expect(scope.sorter).toBeDefined();
    });

    it('should have a highlightedGlyph property', function(){
      expect(scope.highlightedGlyph).toBeDefined();
    });

    it('should have a reverse property', function(){
      expect(scope.reverse).toBeDefined();
    });

    it('should have a readOnly property', function(){
      expect(scope.readOnly).toBeDefined();
    });

    it('should have a editButtonText property', function(){
      expect(scope.editButtonText).toBeDefined();
    });

    it('should have a basic property', function(){
      expect(scope.basic).toBeDefined();
    });

    it('should have a guidance property', function(){
      expect(scope.guidance).toBeDefined();
    });

    it('should have a declared property', function(){
      expect(scope.declared).toBeDefined();
    });

    it('should have a calculateFit property', function(){
      expect(scope.calculateFit).toBeDefined();
    });
  });

  describe('$scope.methods', function(){

    it('should have a toggleEdit method', function(){
      expect(scope.toggleEdit).toBeDefined();
      expect(typeof scope.toggleEdit).toBe('function');
    });

    it('should have a mapToView method', function(){
      expect(scope.mapToView).toBeDefined();
      expect(typeof scope.mapToView).toBe('function');
    });

    it('should have a save method', function(){
      expect(scope.save).toBeDefined();
      expect(typeof scope.save).toBe('function');
    });

    it('should have a edit method', function(){
      expect(scope.edit).toBeDefined();
      expect(typeof scope.edit).toBe('function');
    });

    it('should have a isOverridden method', function(){
      expect(scope.isOverridden).toBeDefined();
      expect(typeof scope.isOverridden).toBe('function');
    });

    it('should have a removeFrom method', function(){
      expect(scope.removeFrom).toBeDefined();
      expect(typeof scope.removeFrom).toBe('function');
    });

    it('should have a addTo method', function(){
      expect(scope.addTo).toBeDefined();
      expect(typeof scope.addTo).toBe('function');
    });

    it('should have a defaultValues method', function(){
      expect(scope.defaultValues).toBeDefined();
      expect(typeof scope.defaultValues).toBe('function');
    });

    it('should have a showCorrectValues method', function(){
      expect(scope.showCorrectValues).toBeDefined();
      expect(typeof scope.showCorrectValues).toBe('function');
    });

    it('should have a updateGuidance method', function(){
      expect(scope.updateGuidance).toBeDefined();
      expect(typeof scope.updateGuidance).toBe('function');
    });

    it('should have a ExcludeAccepted method', function(){
      expect(scope.ExcludeAccepted).toBeDefined();
      expect(typeof scope.ExcludeAccepted).toBe('function');
    });

    it('should have a adjustGlyphHighlighting method', function(){
      expect(scope.adjustGlyphHighlighting).toBeDefined();
      expect(typeof scope.adjustGlyphHighlighting).toBe('function');
    });
  });

});
