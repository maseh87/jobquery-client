describe ('admin.candidates state', function(){

  it('should exist', function(){
    browser.get('/#/admin/candidates');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/#/admin/candidates');
    });
  });

});