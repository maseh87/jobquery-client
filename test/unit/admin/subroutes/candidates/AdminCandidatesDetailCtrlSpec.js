describe('AdminCandidatesDetailCtrl', function(){
  var User,
    $rootScope,
    $controller;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    $rootScope  = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    User        = $injector.get('User');

    createController = function(){
      return $controller('AdminCandidatesDetailCtrl', {
          Resource    : User,
          $controller : $controller,
          $scope      : $rootScope.$new()
        });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});
