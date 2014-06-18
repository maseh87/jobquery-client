describe('UsersOpportunitiesDetailCtrl', function(){

  var $httpBackend, SERVER_URL, scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var $stateParams = $injector.get('$stateParams');
    var UsersOpportunity = $injector.get('UsersOpportunity');
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    SERVER_URL = $injector.get('SERVER_URL');

    createController = function(){
      return $controller('UsersOpportunitiesDetailCtrl', {
        $scope: scope,
        UsersOpportunity: UsersOpportunity,
        $stateParams: {_id: 1}
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

  it('should make a PUT request when updating interest data', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/public/opportunities/1').respond({});
    var controller = createController();
    $httpBackend.flush();

    $httpBackend.expectPUT(SERVER_URL + '/api/public/opportunities/1').respond({});
    scope.opportunity = {_id: 1, match: {interest: 1, answers: ['', '']}};
    scope.submit();
    $httpBackend.flush();
  });

});