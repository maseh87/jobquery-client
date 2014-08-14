'use strict';

describe('Unit: UsersAccount', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var UsersAccount;

  beforeEach(inject(function($injector) {
    UsersAccount = $injector.get('UsersAccount');
  }));

  describe('UsersAccount properties', function(){

    it('should have a get property', function(){
      expect(UsersAccount.get).toBeDefined();
      expect(typeof UsersAccount.get).toBe('function');
    });

    it('should have a update property', function(){
      expect(UsersAccount.update).toBeDefined();
      expect(typeof UsersAccount.update).toBe('function');
    });

  });

});