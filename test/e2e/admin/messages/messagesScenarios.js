describe ('admin.messages state', function(){

  it('should exist', function(){
    browser.get('/#/admin/messages');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/#/admin/messages');
    });
  });

});