'use strict';

describe('Unit: CompanyModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var Category;

  beforeEach(inject(function($injector) {
    Category = $injector.get('Category');
  }));

  describe('CompanyModel methods', function(){

    it('should have a getAll method', function(){
      expect(Category.getAll).toBeDefined();
      expect(typeof Category.getAll).toBe('function');
    });

    it('should have a create method', function(){
      expect(Category.create).toBeDefined();
      expect(typeof Category.create).toBe('function');
    });

    it('should have a update method', function(){
      expect(Category.update).toBeDefined();
      expect(typeof Category.update).toBe('function');
    });

  });

});