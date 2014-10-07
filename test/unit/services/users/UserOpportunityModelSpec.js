'use strict';

describe('Unit: UsersOpportunity', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var UsersOpportunity;

  beforeEach(inject(function($injector) {
    UsersOpportunity = $injector.get('UsersOpportunity');
  }));

  describe('UsersOpportunity properties', function(){

    it('should have a getAll property', function(){
      expect(UsersOpportunity.getAll).toBeDefined();
      expect(typeof UsersOpportunity.getAll).toBe('function');
    });

    it('should have a get property', function(){
      expect(UsersOpportunity.get).toBeDefined();
      expect(typeof UsersOpportunity.get).toBe('function');
    });

    it('should have a update property', function(){
      expect(UsersOpportunity.update).toBeDefined();
      expect(typeof UsersOpportunity.update).toBe('function');
    });

  });

});