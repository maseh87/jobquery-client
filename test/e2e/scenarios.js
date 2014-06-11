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
      browser.get('/#/404');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/#/404')
      });
    });

    it('should be redirected to when URL is unknown', function(){
      browser.get('/#/fjkdsljfkldsa');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/#/404');
      });
    });

  });

  describe('user state', function(){

    it('should exist', function(){
      browser.get('/#/user');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/#/user');
      });
    });

    describe('user.account state', function(){

      it('should exist', function(){
        browser.get('/#/user/account');
        browser.getLocationAbsUrl().then(function(url){
          expect(url).toBe('http://localhost:8000/#/user/account');
        });
      });

    });

  });

  describe('admin state', function(){

    it('should exist', function(){
      browser.get('/#/admin');
      browser.getLocationAbsUrl().then(function(url){
        expect(url).toBe('http://localhost:8000/#/admin')
      });
    });

  });

});