'use strict';

describe('Unit: UsersCompany', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var UsersCompany;

  beforeEach(inject(function($injector) {
    UsersCompany = $injector.get('UsersCompany');
  }));

  describe('UsersCompany properties', function(){

    it('should have a getAll property', function(){
      expect(UsersCompany.getAll).toBeDefined();
      expect(typeof UsersCompany.getAll).toBe('function');
    });

    it('should have a get property', function(){
      expect(UsersCompany.get).toBeDefined();
      expect(typeof UsersCompany.get).toBe('function');
    });

  });

});