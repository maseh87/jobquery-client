'use strict';

describe('Unit: TagModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var Tag;

  beforeEach(inject(function($injector) {
    Tag = $injector.get('Tag');
  }));

  describe('TagModel methods', function(){

    it('should have a getAll method', function(){
      expect(Tag.getAll).toBeDefined();
      expect(typeof Tag.getAll).toBe('function');
    });

    it('should have a get method', function(){
      expect(Tag.get).toBeDefined();
      expect(typeof Tag.get).toBe('function');
    });

    it('should have a create method', function(){
      expect(Tag.create).toBeDefined();
      expect(typeof Tag.create).toBe('function');
    });

    it('should have a update method', function(){
      expect(Tag.update).toBeDefined();
      expect(typeof Tag.update).toBe('function');
    });

  });

});