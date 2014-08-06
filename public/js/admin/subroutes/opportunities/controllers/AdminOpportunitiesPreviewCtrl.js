app.controller('AdminOpportunitiesPreviewCtrl', ['$scope', '$stateParams', 'Opportunity',
  function($scope, $stateParams, Opportunity) {

  Opportunity.get($stateParams._id).then(function (data) {
    $scope.opportunity = data;
    $scope.company = data.company;
  });

  $scope.tips = ['You have zero interest in this opportunity or already have a conversation in progress. We will actively avoid introducing you.',
    'You\'re not that interested right now but you\'d be open to conversation, especially if they\'re interested in you.',
    'Your interest is piqued and you\'d like to learn more. This opportunity could be pretty high on your list.',
    'You are very interested in this opportunity and it stands among the top of your list. You have to meet this team!'
  ];
}]);