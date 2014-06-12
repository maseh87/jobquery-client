describe ('admin.candidates state', function(){

  it('should exist', function(){
    browser.get('/admin/candidates');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/candidates');
    });
  });

});

describe ('admin.candidates.detail state', function(){

  it('should exist', function(){
    browser.get('/admin/candidates/1');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/candidates/1');
    });
  });

});

describe ('admin.candidates.detail.edit state', function(){

  it('should exist', function(){
    browser.get('/admin/candidates/1/edit');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/candidates/1/edit');
    });
  });

});

describe ('admin.candidates.new state', function(){

  it('should exist', function(){
    browser.get('/admin/candidates/new');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/candidates/new');
    });
  });

});