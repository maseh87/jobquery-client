describe ('admin.opportunities state', function(){

  it('should exist', function(){
    browser.get('/#/admin/opportunities');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/#/admin/opportunities');
    });
  });

});