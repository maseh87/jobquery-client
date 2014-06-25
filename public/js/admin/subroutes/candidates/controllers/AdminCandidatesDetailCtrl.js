app.controller('AdminCandidatesDetailCtrl', ['User', '$scope', '$stateParams', 'Match', 'Company', 'Tag',
function (User, $scope, $stateParams, Match, Company, Tag) {

  var user, companies, matches;

  var initialize = function(){
    User.get($stateParams._id).then(function(data){
      user = data;
      $scope.tags = parseUserTags(user);
      return Match.getOpportunities(user._id);
    }).then(function(data){
      matches = data.matches
      return Company.getAll();
    }).then(function(data){
      companies = data;
      $scope.matches = parseData(matches, companies);
      $scope.user = user;
    });
  };

  var parseUserTags = function(user){
    var tags = {
      public: {
        scale: [],
        binary: [],
        text: []
      },
      private: []
    };
    user.tags.forEach(function(tag){
      var privateValue = tag.privateValue;
      tag = tag.tag;
      if(!tag.isPublic){
        tag.value = privateValue;
        tags.private.push(tag);
      } else {
        tags.public[tag.type].push(tag);
      }
    });
    return tags;
  };

  var parseData = function(matches, companies){
    var parsed = [];
    companies = objectify(companies);

    matches.forEach(function(match){
      parsed.push({
        companyName: companies[match.opportunity.company].name,
        jobTitle: match.opportunity.jobTitle,
        userInterest: match.userInterest
      });
    });

    return parsed;
  };

  var objectify = function(array){
    var obj = {};
    array.forEach(function(item){
      obj[item._id] = item;
    });
    return obj;
  };

  $scope.update = function (user) {
    user.tags.forEach(function(tag){
      if(tag.tag.value || tag.tag.value === null) tag.privateValue = tag.tag.value;
    });
    User.update(user)
    .then(function (updated) {
      $scope.updated = true;
    },function (updated) {
      $scope.saveError = true;
    });
  };

  $scope.filter = function(tag){
    return tag.value !== null;
  };

  $scope.addPrivateTag = function(tag){
    if(tag.type === 'scale'){
      tag.value = 4;
    } else if (tag.type === 'binary') {
      tag.value = 'no';
    } else {
      tag.value = '';
    }
  };

  $scope.removePrivateTag = function(tag){
    tag.value = null;
  };

  initialize();


}]);
