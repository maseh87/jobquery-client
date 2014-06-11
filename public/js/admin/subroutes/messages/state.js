app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.messages', {
      url: '/messages',
      templateUrl: '/js/admin/subroutes/messages/templates/messages.tpl.html',
      controller: 'AdminMessagesCtrl'
    });

}]);