'use strict';

describe('Unit: UsersDashboardCtrl', function() {
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('UsersDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should do something', function(){
      expect(true).toEqual(true);
      expect(scope.what).toEqual('what');
  });

})


// describe('UserDashboardCtrlSpec', function(){
//   var $rootScope,
//       $scope,
//       $injector,
//       $sce,
//       UsersOpportunity,
//       GuidanceService,
//       generateGlyphs,
//       // DialogueService,
      
//       createController;

//   beforeEach(module('jobQuery'));

//   beforeEach(inject(function($injector){


//     $rootScope = $injector.get('$rootScope');
//     $sce = $injector.get('$sce');
//     UsersOpportunity= $injector.get('UsersOpportunity');
//     GuidanceService = $injector.get('GuidanceService');
//     generateGlyphs = $injector.get('generateGlyphs');
//     // DialogueService = $injector.get('DialogueService');
//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');

//     createController = function(){
//       return $controller('UserDashboardCtrlSpec', {
//         $scope: $scope,
//         $sce: $sce,
//         UsersOpportunity: UsersOpportunity,
//         GuidanceService: GuidanceService,
//         generateGlyphs: generateGlyphs,
//         // DialogueService: DialogueService
//       });
//     };
//   }));

//   it('should not have a bug', function(){
//     var x = 'string';

//     expect(true).toEqual(true);
//     expect(x).toEqual('string');
//   });
// })