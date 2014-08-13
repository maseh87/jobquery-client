'use strict';

describe('Unit: UserModel', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var User;

  beforeEach(inject(function($injector) {
    User = $injector.get('User');
  }));

  describe('UserModel methods', function(){

    it('should have a getAll method', function(){
      expect(User.getAll).toBeDefined();
      expect(typeof User.getAll).toBe('function');
    });

    it('should have a get method', function(){
      expect(User.get).toBeDefined();
      expect(typeof User.get).toBe('function');
    });

    it('should have a create method', function(){
      expect(User.create).toBeDefined();
      expect(typeof User.create).toBe('function');
    });

    it('should have a update method', function(){
      expect(User.update).toBeDefined();
      expect(typeof User.update).toBe('function');
    });

    it('should have a invite method', function(){
      expect(User.invite).toBeDefined();
      expect(typeof User.invite).toBe('function');
    });

    it('should have a login method', function(){
      expect(User.login).toBeDefined();
      expect(typeof User.login).toBe('function');
    });

  });

});