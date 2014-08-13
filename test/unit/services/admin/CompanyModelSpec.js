'use strict';

describe('Unit: CompanyModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var Company;

  beforeEach(inject(function($injector) {
    Company = $injector.get('Company');
  }));

  describe('CompanyModel methods', function(){

    it('should have a getAll method', function(){
      expect(Company.getAll).toBeDefined();
      expect(typeof Company.getAll).toBe('function');
    });

    it('should have a create method', function(){
      expect(Company.create).toBeDefined();
      expect(typeof Company.create).toBe('function');
    });

    it('should have a update method', function(){
      expect(Company.update).toBeDefined();
      expect(typeof Company.update).toBe('function');
    });

  });

});