app.controller('AdminCandidatesDetailCtrl', ['User', '$scope', '$stateParams', 'Match', 'Company', 'Tag', 'Category', '$q',
function (User, $scope, $stateParams, Match, Company, Tag, Category, $q) {

  var user, companies, matches, categories, opportunityCategories;
  $scope.submitText = 'Update Candidate Info';

  var bindUserCategory = function(user, categories){
    if(user.category){
      var categoryId = user.category._id;
      categories.forEach(function(category){
        if(category._id === categoryId){
          user.category = category;
        }
      });
    }
  };

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
      $scope.user = user;
      return Category.getAll('User');
    }).then(function(data){
      categories = data;
      return Category.getAll('Opportunity');
    }).then(function(data){
      opportunityCategories = data;
      $scope.categories = categories;
      $scope.matches = parseData(matches, companies);
      bindUserCategory($scope.user, $scope.categories);
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
    categoriesObj = objectify(opportunityCategories);
    companies = objectify(companies);
    matches.forEach(function(match){
      parsed.push({
        companyName: companies[match.opportunity.company].name,
        jobTitle: match.opportunity.jobTitle,
        userInterest: match.userInterest,
        category: categoriesObj[match.opportunity.category].name
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

    var handleCategory = function(){
      var deferred = $q.defer();
      if(user.category && !user.category._id){
        Category.create(user.category).then(function(data){
          user.category._id = data._id;
          deferred.resolve();
        });
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

    $scope.submitText = 'Submitting...';
    handleCategory().then(function(){
      return User.update(user);
    }).then(function (updated) {
      $scope.updated = true;
      $scope.submitText = 'Candidate Info Updated';
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

  $scope.addNewCategory = function(categoryName){
    var newCategory = {
      name: categoryName,
      type: 'User'
    };
    $scope.categories.push(newCategory);
    $scope.user.category = $scope.categories[$scope.categories.length - 1];
    $scope.creatingCategory = false;
  };

  $scope.interceptCategory = function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      $scope.addNewCategory($scope.newCategory);
    }
  }

  initialize();


}]);
