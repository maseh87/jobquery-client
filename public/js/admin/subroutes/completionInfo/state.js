app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.completionInfo', {
      url: '/completionInfo',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('admin.completionInfo.all', {
      url: '',

      templateUrl: '/js/admin/subroutes/completionInfo/templates/completionInfo.tpl.html',
      controller: 'CompletionInfoCtrl'
    });

}]);
