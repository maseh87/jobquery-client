describe ('admin.dashboard state', function(){

  it('should exist', function(){
    browser.get('/admin/dashboard');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/dashboard');
    });
  });

});