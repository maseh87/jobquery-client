describe('AdminMessagesCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminMessagesCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});

describe('AdminMessagesDetailCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminMessagesDetailCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});

describe('AdminMessagesNewCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminMessagesNewCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});