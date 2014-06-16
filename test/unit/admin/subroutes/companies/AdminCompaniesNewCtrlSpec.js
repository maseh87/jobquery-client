describe('AdminCompaniesNewCtrl', function(){

  var $httpBackend, scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var Company = $injector.get('Company');
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();

    createController = function(){
      return $controller('AdminCompaniesNewCtrl', {
        $scope: scope,
        Company: Company
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should be able to make POST requests', function(){
    var controller = createController();
    $httpBackend.expectPOST('http://localhost:9000/api/companies').respond({_id: 1});
    scope.create();
    $httpBackend.flush();
  });

  it('should be able to add and remove media links', function(){
    var controller = createController();
    scope.addMedia();
    expect(scope.newCompany.media.length).toBe(1);
    scope.addMedia();
    expect(scope.newCompany.media.length).toBe(2);
    scope.removeMedia(0);
    expect(scope.newCompany.media.length).toBe(1);
  });

  it('should be able to add and remove regular links', function(){
    var controller = createController();
    scope.addLink();
    expect(scope.newCompany.links.length).toBe(1);
    scope.addLink();
    expect(scope.newCompany.links.length).toBe(2);
    scope.removeLink(0);
    expect(scope.newCompany.links.length).toBe(1);
  });

});