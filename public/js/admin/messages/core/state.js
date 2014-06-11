app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.messages', {
      url: '/messages',
      templateUrl: '/js/admin/messages/core/templates/messages.tpl.html',
      controller: 'AdminMessagesCtrl'
    });

}]);