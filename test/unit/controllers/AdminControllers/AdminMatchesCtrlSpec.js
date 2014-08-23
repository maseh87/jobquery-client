'use strict';

describe('Unit: AdminMatchesCtrl', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var ctrl, scope, FilterService, Match, Opportunity, User, DialogueService, document;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, $injector, $document) {

    document = angular.element(document);
    FilterService = $injector.get('FilterService');
    Match = $injector.get('Match');
    Opportunity = $injector.get('Opportunity');
    User = $injector.get('User');
    DialogueService = $injector.get('DialogueService');

    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('AdminMatchesCtrl', {
      $scope: scope,
      FilterService: FilterService,
      Match: Match,
      Opportunity: Opportunity,
      User: User,
      DialogueService: DialogueService,
      $document: document
    });
  }));

  describe('$scope properties', function(){
    // it('should have an edit method', function(){
    //   $document.getElementById('dialogue-box');
    //   expect(scope.edit).toBeDefined();
    // });
  });

});
