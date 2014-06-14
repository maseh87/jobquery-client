describe ('admin.opportunities state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities');
    });
  });

});

describe ('admin.opportunities.detail state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities/1');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities/1');
    });
  });

});

describe ('admin.opportunities.detail.edit state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities/1/edit');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities/1/edit');
    });
  });

});

describe ('admin.opportunities.new state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities/new');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities/new');
    });
  });

});