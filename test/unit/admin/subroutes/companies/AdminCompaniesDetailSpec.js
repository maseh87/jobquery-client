describe('AdminCompaniesDetailCtrl', function(){
  // var SERVER_URL = 'http://jobquerystagingserver.azurewebsites.net';
  var SERVER_URL = 'http://localhost:9000';
  var $httpBackend, scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var Company = $injector.get('Company');
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();

    createController = function(){
      return $controller('AdminCompaniesDetailCtrl', {
        $scope: scope,
        Company: Company
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should be able to make PUT requests', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/companies/1').respond({_id: 1, media: [], links: []});
    var controller = createController();
    $httpBackend.flush();

    $httpBackend.expectPUT(SERVER_URL + '/api/companies/1').respond({_id: 1});
    scope.update({_id: 1});
    $httpBackend.flush();
  });

  it('should be able to add and remove media links', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/companies/1').respond({_id: 1, media: [], links: []});
    var controller = createController();
    $httpBackend.flush();

    scope.addMedia();
    expect(scope.company.media.length).toBe(1);
    scope.addMedia();
    expect(scope.company.media.length).toBe(2);
    scope.removeMedia(0);
    expect(scope.company.media.length).toBe(1);
  });

  it('should be able to add and remove regular links', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/companies/1').respond({_id: 1, media: [], links: []});
    var controller = createController();
    $httpBackend.flush();

    scope.addLink();
    expect(scope.company.links.length).toBe(1);
    scope.addLink();
    expect(scope.company.links.length).toBe(2);
    scope.removeLink(0);
    expect(scope.company.links.length).toBe(1);
  });

});
