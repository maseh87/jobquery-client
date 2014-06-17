describe('UsersOpportunitiesDetailCtrl', function(){

  var $httpBackend, SERVER_URL;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var UsersOpportunity = $injector.get('UsersOpportunity');
    $httpBackend = $injector.get('$httpBackend');
    SERVER_URL = $injector.get('SERVER_URL');

    createController = function(){
      return $controller('UsersOpportunitiesDetailCtrl', {
        $scope: $rootScope.$new(),
        UsersOpportunity: UsersOpportunity
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should make a GET request for a single opportunity', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/public/opportunities/1').respond({});
    var controller = createController();
    $httpBackend.flush();
  });

});