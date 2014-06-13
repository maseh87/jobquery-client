app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.candidates', {
      abstract: true,
      url: '/candidates',
      template: '<ui-view/>',
      resolve: {
        Resource: ['User', function(User){
          return User;
        }]
      }
    })
      .state('admin.candidates.all', {
        url: '',
        templateUrl: '/js/admin/subroutes/candidates/templates/candidates.tpl.html',
        controller: 'ResourceCtrl'
      })
      .state('admin.candidates.detail', {
        url: '/:_id',
        templateUrl: '/js/admin/subroutes/candidates/templates/detail.tpl.html',
        controller: 'ResourceDetailCtrl'
      })
      .state('admin.candidates.edit', {
        url: '/:_id/edit',
        templateUrl: '/js/admin/subroutes/candidates/templates/edit.tpl.html',
        controller: 'ResourceEditCtrl'
      })
      .state('admin.candidates.new', {
        url: '/new',
        templateUrl: '/js/admin/subroutes/candidates/templates/new.tpl.html',
        controller: 'ResourceCandidateCtrl'
      });

}]);