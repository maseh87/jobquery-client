'use strict';

describe('Unit: generateGlyphs', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var generateGlyphs;

  beforeEach(inject(function($injector) {
    generateGlyphs = $injector.get('generateGlyphs');
  }));

  describe('generateGlyphs methods', function(){

    it('should have a calculateFit methods', function(){
      expect(generateGlyphs.calculateFit).toBeDefined();
      expect(typeof generateGlyphs.calculateFit).toBe('function');
    });

  });

});