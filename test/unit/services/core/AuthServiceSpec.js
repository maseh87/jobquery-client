'use strict';

describe('Unit: AuthService', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var AuthService;

  beforeEach(inject(function($injector) {
    AuthService = $injector.get('AuthService');
  }));

  describe('AuthService methods', function(){

    it('should have a sendPasswordReset methods', function(){
      expect(AuthService.sendPasswordReset).toBeDefined();
      expect(typeof AuthService.sendPasswordReset).toBe('function');
    });

    it('should have a resetPassword methods', function(){
      expect(AuthService.resetPassword).toBeDefined();
      expect(typeof AuthService.resetPassword).toBe('function');
    });

  });

});