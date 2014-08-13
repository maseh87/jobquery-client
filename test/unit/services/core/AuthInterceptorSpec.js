'use strict';

describe('Unit: AuthInterceptor', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var authHttpInterceptor;

  beforeEach(inject(function($injector) {
    authHttpInterceptor = $injector.get('authHttpInterceptor');
  }));

  describe('authHttpInterceptor properties', function(){

    it('should have a sendPasswordReset property', function(){
      expect(authHttpInterceptor.request).toBeDefined();
      expect(typeof authHttpInterceptor.request).toBe('function');
    });

  });

});