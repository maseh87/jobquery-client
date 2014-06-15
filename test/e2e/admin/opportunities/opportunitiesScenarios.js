describe ('admin.opportunities state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities');
    });
  });

  it('should display rows of opportunities with an NG-repeat directive', function () {
      browser.get('/admin/opportunities');
      element.all(by.repeater('opportunity in resources')).each(function(element) {
        expect(element.getText()).not.toBe('');
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

describe ('admin.opportunities.new state', function(){

  it('should exist', function(){
    browser.get('/admin/opportunities/new');
    browser.getLocationAbsUrl().then(function(url){
      expect(url).toBe('http://localhost:8000/admin/opportunities/new');
    });
  });

});