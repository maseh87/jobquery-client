'use strict';

describe('Unit: OpportunityModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var Opportunity;

  beforeEach(inject(function($injector) {
    Opportunity = $injector.get('Opportunity');
  }));

  describe('OpportunityModel methods', function(){

    it('should have a getAll method', function(){
      expect(Opportunity.getAll).toBeDefined();
      expect(typeof Opportunity.getAll).toBe('function');
    });

    it('should have a get method', function(){
      expect(Opportunity.get).toBeDefined();
      expect(typeof Opportunity.get).toBe('function');
    });

    it('should have a create method', function(){
      expect(Opportunity.create).toBeDefined();
      expect(typeof Opportunity.create).toBe('function');
    });

    it('should have a update method', function(){
      expect(Opportunity.update).toBeDefined();
      expect(typeof Opportunity.update).toBe('function');
    });

  });

});