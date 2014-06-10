describe('jobQuery Application', function(){

  describe('homepage', function(){

    it('should have the root URL', function(){
      browser.get('');
      browser.getLocationAbsUrl().then(function(url){
        console.log(url);
        expect(url).toBe('http://localhost:8000/');
      })
    })
    
  })

});