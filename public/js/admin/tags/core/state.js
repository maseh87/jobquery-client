app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.tags', {
      url: '/tags',
      templateUrl: '/js/admin/tags/core/templates/tags.tpl.html',
      controller: 'AdminTagsCtrl'
    });

}]);