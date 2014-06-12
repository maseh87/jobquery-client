describe('AdminOpportunitiesCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminOpportunitiesCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});

describe('AdminOpportunitiesDetailCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminOpportunitiesDetailCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});

describe('AdminOpportunitiesEditCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminOpportunitiesEditCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});

describe('AdminOpportunitiesNewCtrl', function(){

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('AdminOpportunitiesNewCtrl', {$scope: $rootScope.$new()});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

});