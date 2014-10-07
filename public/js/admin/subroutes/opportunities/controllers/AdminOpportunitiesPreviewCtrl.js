app.controller('AdminOpportunitiesPreviewCtrl', ['$scope', '$stateParams', 'Opportunity', '$sce',
  function($scope, $stateParams, Opportunity, $sce) {
  $scope.slides = [];
  $scope.default = true;
  $scope.isVideo = false;

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  Opportunity.get($stateParams._id).then(function (data) {
    $scope.opportunity = data;
    $scope.company = data.company;
    var company = $scope.company;
    if (company.media.length === 0) {
      $scope.defaultImage = "http://thesimplephysicist.com/wp-content/uploads/2014/05/default-avatar.jpg";
    }

    for (var j = 0; j < company.media.length; j++) {
      //if media is video, save it as video
      $scope.defaultImage = company.media[0].url;
      if (company.media[j].url.match(/youtube/)){
        $scope.slides.push({
          video: company.media[j].url,
          caption: company.media[j].caption
        });
      } else {
        $scope.slides.push({
          image: company.media[j].url,
          caption: company.media[j].caption
        });
      }
    }
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
    if( imageUrl.match(/youtube/)) {
      $scope.isVideo = true;
    }
    else{
      $scope.default = false;
      $scope.isVideo = false;
    }
  };

  $scope.tips = ['You have zero interest in this opportunity or already have a conversation in progress. We will actively avoid introducing you.',
    'You\'re not that interested right now but you\'d be open to conversation, especially if they\'re interested in you.',
    'Your interest is piqued and you\'d like to learn more. This opportunity could be pretty high on your list.',
    'You are very interested in this opportunity and it stands among the top of your list. You have to meet this team!'
  ];
}]);
