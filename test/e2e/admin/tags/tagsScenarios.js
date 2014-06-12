describe ('admin.tags state', function(){

  it('should exist', function(){
    browser.get('/admin/tags');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/tags')
    });
  });

});

describe ('admin.tags.new state', function(){

  it('should exist', function(){
    browser.get('/admin/tags/new');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/tags/new');
    });
  });

});