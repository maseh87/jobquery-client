describe ('admin.companies state', function(){

  it('should exist', function(){
    browser.get('/admin/companies');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/companies');
    });
  });

});

describe ('admin.companies.detail state', function(){

  it('should exist', function(){
    browser.get('/admin/companies/1');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/companies/1');
    });
  });

});

describe ('admin.companies.new state', function(){

  it('should exist', function(){
    browser.get('/admin/companies/new');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/companies/new');
    });
  });

});