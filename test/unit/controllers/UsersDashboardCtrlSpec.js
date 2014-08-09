'use strict';

describe('UserDashboardCtrlSpec', function(){
  var $rootScope,
      $scope,
      $injector,
      $sce,
      UsersOpportunity,
      GuidanceService,
      generateGlyphs,
      // DialogueService,
      
      createController;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){


    $rootScope = $injector.get('$rootScope');
    $sce = $injector.get('$sce');
    UsersOpportunity= $injector.get('UsersOpportunity');
    GuidanceService = $injector.get('GuidanceService');
    generateGlyphs = $injector.get('generateGlyphs');
    // DialogueService = $injector.get('DialogueService');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(){
      return $controller('UserDashboardCtrlSpec', {
        $scope: $scope,
        $sce: $sce,
        UsersOpportunity: UsersOpportunity,
        GuidanceService: GuidanceService,
        generateGlyphs: generateGlyphs,
        // DialogueService: DialogueService
      });
    };
  }));

  it('should not have a bug', function(){
    var x = 'string';

    expect(true).toEqual(true);
    expect(x).toEqual('string');
  });
})