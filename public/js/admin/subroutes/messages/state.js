app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.messages', {
      url: '/messages',
      templateUrl: '/js/admin/subroutes/messages/templates/messages.tpl.html',
      controller: 'AdminMessagesCtrl'
    })
    .state('admin.messages.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/messages/templates/detail.tpl.html',
      controller: 'AdminMessagesDetailCtrl'
    })
    .state('admin.messages.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/messages/templates/new.tpl.html',
      controller: 'AdminMessagesNewCtrl'
    });

}]);