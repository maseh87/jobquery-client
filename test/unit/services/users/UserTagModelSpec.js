'use strict';

describe('Unit: UserTag', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var UserTag;

  beforeEach(inject(function($injector) {
    UserTag = $injector.get('UserTag');
  }));

  describe('UserTag properties', function(){

    it('should have a getAll property', function(){
      expect(UserTag.getAll).toBeDefined();
      expect(typeof UserTag.getAll).toBe('function');
    });

  });

});