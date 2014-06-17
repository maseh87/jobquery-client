describe ('users.opportunities state', function(){

  it('should exist', function(){
    browser.get('/users/opportunities');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/users/opportunities');
    });
  });

});

describe ('users.opportunities.detail state', function(){

  it('should exist', function(){
    browser.get('/users/opportunities/1');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/users/opportunities/1');
    });
  });

});