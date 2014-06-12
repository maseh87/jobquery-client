app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.tags', {
      url: '/tags',
      templateUrl: '/js/admin/subroutes/tags/templates/tags.tpl.html',
      controller: 'AdminTagsCtrl'
    })
    .state('admin.tags.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/tags/templates/new.tpl.html',
      controller: 'AdminTagsNewCtrl'
    });

}]);