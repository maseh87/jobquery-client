describe ('admin.companies state', function(){

  it('should exist', function(){
    browser.get('/#/admin/companies');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/#/admin/companies');
    });
  });

});