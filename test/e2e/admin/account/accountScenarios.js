describe ('admin.account state', function(){

  it('should exist', function(){
    browser.get('/admin/account');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/account');
    });
  });

});