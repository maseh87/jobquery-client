describe ('users.companies state', function(){

  it('should exist', function(){
    browser.get('/users/companies');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/users/companies');
    });
  });

});

describe ('users.companies.detail state', function(){

  it('should exist', function(){
    browser.get('/users/companies/1');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/users/companies/1');
    });
  });

});