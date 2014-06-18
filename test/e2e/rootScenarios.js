describe('jobQuery application', function(){

  describe('home state', function(){

    it('should exist', function(){
      browser.get('');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/');
      });

    });

  });

  describe('404 state', function(){

    it('should exist', function(){
      browser.get('/404');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/404');
      });
    });

    it('should be redirected to when URL is unknown', function(){
      browser.get('/fjkdsljfkldsa');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/404');
      });
    });

  });

  describe('sidebar', function(){

    it('should allow you to navigate between states', function(){
      browser.get('/users');
      browser.findElement(by.css("a[href*='/users/dashboard']")).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/users/dashboard');
      });

      browser.findElement(by.css("a[href*='/users/account']")).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/users/account');
      });

      browser.findElement(by.css("a[href*='/users/companies']")).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/users/companies');
      });

      browser.findElement(by.css("a[href*='/users/opportunities']")).click();
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/users/opportunities');
      });
    });

  });

});
