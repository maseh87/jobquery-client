describe ('users.account state', function(){

  it('should exist', function(){
    browser.get('/users/account');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/users/account');
    });
  });

});