app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.tags', {
      url: '/tags',
      templateUrl: '/js/admin/subroutes/tags/templates/tags.tpl.html',
      controller: 'AdminTagsCtrl'
    });

}]);