describe('UsersCompaniesDetailCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var Company = $injector.get('Company');

    createController = function(){
      return $controller('UsersCompaniesDetailCtrl', {
        $scope: $rootScope.$new(),
        Company: Company
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});