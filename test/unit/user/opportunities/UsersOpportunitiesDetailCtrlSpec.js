describe('UsersOpportunitiesDetailCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var Opportunity = $injector.get('Opportunity');

    createController = function(){
      return $controller('UsersOpportunitiesDetailCtrl', {
        $scope: $rootScope.$new(),
        Opportunity: Opportunity
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});