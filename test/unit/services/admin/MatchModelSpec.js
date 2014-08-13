'use strict';

describe('Unit: MatchModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var Match;

  beforeEach(inject(function($injector) {
    Match = $injector.get('Match');
  }));

  describe('MatchModel methods', function(){

    it('should have a getAll method', function(){
      expect(Match.getAll).toBeDefined();
      expect(typeof Match.getAll).toBe('function');
    });

    it('should have a getUsers method', function(){
      expect(Match.getUsers).toBeDefined();
      expect(typeof Match.getUsers).toBe('function');
    });

    it('should have a getOpportunities method', function(){
      expect(Match.getOpportunities).toBeDefined();
      expect(typeof Match.getOpportunities).toBe('function');
    });

    it('should have a update method', function(){
      expect(Match.update).toBeDefined();
      expect(typeof Match.update).toBe('function');
    });

    it('should have a batchProcess method', function(){
      expect(Match.batchProcess).toBeDefined();
      expect(typeof Match.batchProcess).toBe('function');
    });

  });

});