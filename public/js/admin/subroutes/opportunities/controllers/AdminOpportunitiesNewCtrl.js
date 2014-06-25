app.controller('AdminOpportunitiesNewCtrl',
  ['$scope', '$stateParams', '$state', 'Opportunity', 'User', 'Tag', 'Category', 'Company',
  function ($scope, $stateParams, $state, Opportunity, User, Tag, Category, Company) {

  User.getAll().then(function (users) {
    $scope.mapToView(users);
  });

  $scope.readOnly = false;

  Tag.getAll().then(function (tags) { $scope.tags = tags; });

  Category.getAll('Opportunity').then(function (categories) {
    $scope.categories = categories;
    $scope.basic.category = categories[0]; // default
  });

  Company.getAll().then(function (companies) {
    $scope.companies = companies;
    $scope.basic.company = companies[0]; // default
  });

  $scope.basic = {
    _id: '',
    description: '',
    company: {},
    title: '',
    location: '',
    links: [],
    active: true,
    approved: false,
    category: {},
    internalNotes: '',
    notes: ''
  };

  $scope.guidance = {
    questions: [],
    tags: []
  };

  // declared = user tags
  $scope.mapToView = function(users) {
    $scope.declared = users.map(function (user) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        tags: (function () {
          var tagsByKeys = {};
          user.tags.forEach(function (tag) {
            tagsByKeys[tag.tag._id] = tag.value;
          });
          return tagsByKeys;
        })()
      };
    });
  };

  $scope.save = function () {
    // remove any empty tags and duplicate tags (preference for higher order)
    var existingTags = {};
    for (var i = 0; i < $scope.guidance.tags.length; i += 1) {
      var currentTag = $scope.guidance.tags[i];
      // check for empty tags
      if (!currentTag.data || !currentTag.data._id) {
        $scope.guidance.tags.splice(i, 1);
        i -= 1;
        continue;
      }
      // check for duplicate tags
      if (existingTags.hasOwnProperty(currentTag.data._id)) {
        $scope.guidance.tags.splice(i, 1);
        i -= 1;
      } else {
        existingTags[currentTag.data._id] = true;
      }
    }

    // remove any empty questions
    for (var j = 0; j < $scope.guidance.questions.length; j += 1) {
      var currentQ = $scope.guidance.questions[j];
      // check for empty questions
      if (currentQ.question === '') {
        $scope.guidance.questions.splice(j, 1);
        j -= 1;
      }
    }

    // remove any empty links
    for (var k = 0; k < $scope.basic.links.length; k += 1) {
      var currentLink = $scope.basic.links[k];
      // check for empty links
      if (currentLink.title === '' || currentLink.url === '') {
        $scope.basic.links.splice(k, 1);
        j -= 1;
      }
    }

    var oppData = {};
    // no _id; need to create opportunity first
    oppData.active = $scope.basic.active;
    oppData.approved = $scope.basic.approved;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    oppData.category = $scope.basic.category._id;
    oppData.company = $scope.basic.company._id;
    oppData.links = $scope.basic.links;
    oppData.notes = $scope.basic.notes ? [ {text: $scope.basic.notes} ] : [];
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) {
      return {tag: tag.data._id, value: tag.value, importance: tag.importance};
    });

    Opportunity.create(oppData).then(function(data){
      $state.go('admin.opportunities.detail', { _id : data._id});
    });
  };

  $scope.removeFrom = function (index, array) {
    array.splice(index, 1);
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };

  $scope.showCorrectValues = function (tag, id) {
    for (var i = 0; i < $scope.tags.length; i += 1) {
      if ($scope.tags[i]._id === id) {
        tag.data.type = $scope.tags[i].type;
        tag.data.name = $scope.tags[i].name;
        if (tag.data.type === 'scale') {
          tag.value = 4;
        } else if (tag.data.type === 'binary') {
          tag.value = 'yes';
        } else {
          tag.value = 'text';
        }
        break;
      }
    }
    console.log('$scope.guidance.tags:', $scope.guidance.tags);
  };

  $scope.updateGuidance = function () {
    // filtered guidance = no text type
    // $scope.filteredTags = $scope.guidance.tags.filter(function (tag) {
    //   return (tag.value !== 'text');
    // });
    $scope.filteredTags = $scope.guidance.tags;

    // calculate summary stats
    $scope.filteredStats = {};
    $scope.filteredTags.forEach(function (tag) {
      $scope.filteredStats[tag.data._id] = {
        threshold: tag.value,
        type: tag.data.type,
        count: 0
      };
    });

    Object.keys($scope.filteredStats).forEach(function (tagId) {
      if ($scope.filteredStats[tagId].type === 'scale') {
        $scope.declared.forEach(function (match) {
          if (match.tags[tagId] >= $scope.filteredStats[tagId].threshold) {
            $scope.filteredStats[tagId].count += 1;
          }
        });
      } else if ($scope.filteredStats[tagId].type === 'binary') {
        $scope.declared.forEach(function (match) {
          if (match.tags[tagId] === $scope.filteredStats[tagId].threshold) {
            $scope.filteredStats[tagId].count += 1;
          }
        });
      }
    });
  };

}]);
