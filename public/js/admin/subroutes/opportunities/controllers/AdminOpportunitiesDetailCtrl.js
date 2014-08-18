app.controller('AdminOpportunitiesDetailCtrl',
  ['$scope', '$stateParams', '$state','Opportunity', 'Match', 'Tag', 'Category', 'Company', 'generateGlyphs', 'User',
  function ($scope, $stateParams, $state, Opportunity, Match, Tag, Category, Company, generateGlyphs, User) {
  $scope.sorter = 'score';
  $scope.reverse = true;
  var originalCompanyId;
  $scope.oppData = {};

  $scope.seePreview = function() {
    $state.go("admin.opportunities.preview", {_id: $scope.oppData._id});
  };
// ui-sref="admin.opportunities.preview({_id: oppData._id})"
  Company.getAll().then(function (companies) {
    $scope.companies = companies;

    Match.getUsers($stateParams._id).then(function (data) {

      $scope.mapToView(data.opportunity, data.matches);
      $scope.oppData = data.opportunity;
      $scope.matchData = data.matches;
    });
  });

  Tag.getAll().then(function (tags) { $scope.tags = tags; });

  Category.getAll('Opportunity')
  .then(function (categories) { $scope.categories = categories; });

  $scope.readOnly = true;
  $scope.editButtonText = "✎  Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "✎  Edit Opportunity" : "✔  Save Opportunity";
  };

  $scope.basic = {};
  $scope.guidance = {};
  $scope.declared = [];
  $scope.mapToView = function (oppData, matchData) {
    $scope.basic._id = oppData._id;
    $scope.basic.description = oppData.description;
    $scope.basic.company = oppData.company._id;
    originalCompanyId = oppData.company._id;
    $scope.basic.title = oppData.jobTitle;
    $scope.basic.location = oppData.company.city;
    $scope.basic.links = oppData.links;
    $scope.basic.active = oppData.active;
    $scope.basic.approved = oppData.approved;
    $scope.basic.group = oppData.category;
    $scope.basic.internal =
      oppData.internalNotes.length ?
      oppData.internalNotes[0].text : null;
    $scope.basic.notes =
      oppData.notes.length ?
      oppData.notes[0].text : null;

    // guidance = opportunity tags
    var guidance = {};
    guidance.questions = oppData.questions;
    guidance.tags = oppData.tags.map(function (tagData) {
      return {data: tagData.tag, value: tagData.value, importance: tagData.importance};
    });
    $scope.guidance = guidance;

    // declared = user tags
    $scope.interestThreeOrAbove = 0;
    $scope.interestResponses = 0;
    var declared = matchData.map(function (matchModel) {
      if (matchModel.userInterest > 0) {
        $scope.interestResponses += 1;
      }
      if (matchModel.userInterest >= 3) {
        $scope.interestThreeOrAbove +=1 ;
      }

      //Normalize question and answer arrays.
      matchModel.answers = matchModel.answers || [];
      var numQuestions = guidance.questions.length;
      var numAnswers = matchModel.answers.length;
      var difference = numQuestions - numAnswers;
      for(var i = 0; i < difference; i++){
        matchModel.answers.push({answer: ''});
      }

      return {
        _id: matchModel.user._id,
        name: matchModel.user.name,
        email: matchModel.user.email,
        star: matchModel.star,
        upVote: matchModel.upVote,
        downVote: matchModel.downVote,
        noGo: matchModel.noGo,
        interest: matchModel.userInterest,
        answers: matchModel.answers,
        category: matchModel.user.category ? matchModel.user.category.name : 'N/A',
        searchStage: matchModel.user.searchStage,
        adminOverride: matchModel.adminOverride,
        points: [0, 0], // default: [points, possible points]
        score: 0, // points[0] / points[1]
        tags: (function () {
          var tagsByKeys = {};
          matchModel.user.tags.forEach(function (tag) {
            tagsByKeys[tag.tag._id] = tag.tag.isPublic ? tag.value : tag.privateValue;
          });
          return tagsByKeys;
        })()
      };
    });
    $scope.declared = declared;
    $scope.updateGuidance();
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
        k -= 1;
      }
    }

    var oppData = {};
    oppData._id = $scope.basic._id;
    oppData.active = $scope.basic.active;
    oppData.approved = $scope.basic.approved;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    oppData.category = $scope.basic.group._id;
    oppData.company = $scope.basic.company;
    oppData.links = $scope.basic.links;
    oppData.notes = $scope.basic.notes ? [ {text: $scope.basic.notes} ] : [];
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) {
      return {tag: tag.data._id, value: tag.value, importance: tag.importance};
    });

    // update opportunity
    Opportunity.update(oppData).then(function(data){
    });

    // update
    if (originalCompanyId !== oppData.company) {
      $scope.companies.forEach(function (company) {
        // remove opportunity._id from original company
        if (company._id === originalCompanyId) {
          var indexToRemove = company.opportunities.indexOf(oppData._id);
          company.opportunities.splice(indexToRemove, 1);
          Company.update(company);
        }

        // add opportunity._id to new company
        if (company._id === oppData.company) {
          company.opportunities.push(oppData._id);
          Company.update(company);
        }
      });
      originalCompanyId = oppData.company;
    }
    $scope.updateGuidance();
  };

  $scope.edit = function (user) {
    //user.adminOverride = user.value;
    Match.update(user);
  };

  $scope.isOverridden = function (user) {
    // no adminOverride
    if (user.adminOverride === 0) {
      if (user.interest ===4) {
        return 'gridbox-highlight-4';
      } else if (user.interest === 3) {
        return 'gridbox-highlight-3';
      } else if (user.interest === 2) {
        return 'gridbox-highlight-2';
      } else if (user.interest === 1) {
        return 'gridbox-highlight-1';
      } else if (user.interest === 0) {
        return 'gridbox-highlight-0';
      }
    // with adminOverride
    } else {
      if (user.adminOverride > user.interest) {
        return 'gridbox-highlight-green';
      } else if (user.adminOverride === user.interest) {
        return 'gridbox-highlight-grey';
      } else if (user.adminOverride < user.interest) {
        return 'gridbox-highlight-red';
      }
    }
  };

  $scope.removeFrom = function (index, array) {
    array.splice(index, 1);
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };

  $scope.defaultValues = function (tag) {
    if (tag.data.type === 'scale') {
        tag.value = 4;
      } else if (tag.data.type === 'binary') {
        tag.value = 'yes';
      } else {
        tag.value = 'text';
      }
  };

  $scope.showCorrectValues = function (tag, id) {
    for (var i = 0; i < $scope.tags.length; i += 1) {
      if ($scope.tags[i]._id === id) {
        var differentType = tag.data.type !== $scope.tags[i].type;
        tag.data.type = $scope.tags[i].type;
        if (differentType) {
          $scope.defaultValues(tag);
        }
        tag.data.name = $scope.tags[i].name;
        break;
      }
    }
  };

  $scope.updateGuidance = function () {
  // filtered guidance = no text type
  $scope.filteredTags = $scope.guidance.tags.filter(function (tag) {
    return (tag.value !== 'text');
  });
  // $scope.filteredTags = $scope.guidance.tags;

    // calculate summary stats
    $scope.filteredStats = {};
    if ($scope.filteredTags.length > 0) {
      $scope.filteredTags.forEach(function (tag) {
        $scope.filteredStats[tag.data._id] = {
          importance: tag.importance,
          threshold: tag.value,
          type: tag.data.type,
          count: 0
        };
      });
    }

    // reset scores to recalculate
    $scope.declared.forEach(function (user) {
      user.points[0] = 0;
      user.points[1] = 0;
    });

    // count # of people meeting thresholds
    Object.keys($scope.filteredStats).forEach(function (tagId) {
      if ($scope.filteredStats[tagId].type === 'scale') {
        $scope.declared.forEach(function (user) {
          if (user.tags[tagId] >= $scope.filteredStats[tagId].threshold) {
            $scope.filteredStats[tagId].count += 1;
          }
        });
      } else if ($scope.filteredStats[tagId].type === 'binary') {
        $scope.declared.forEach(function (user) {
          if (user.tags[tagId] === $scope.filteredStats[tagId].threshold) {
            $scope.filteredStats[tagId].count += 1;
          }
        });
      }
    });

    // calculate match results per user
    $scope.declared.forEach(function (user) {
      // loop over all tags to compare & calculate match score
      Object.keys($scope.filteredStats).forEach(function (tagId) {
        // must have
        if ($scope.filteredStats[tagId].importance === 'must') {
          if ($scope.filteredStats[tagId].type === 'scale') {
            if (user.tags[tagId] >= $scope.filteredStats[tagId].threshold) {
              // only add points if threshold is met
              user.points[0] += 1;
            }
            // but always add to the denominator
            user.points[1] += 1;
          } else if ($scope.filteredStats[tagId].type === 'binary') {
            if (user.tags[tagId] === $scope.filteredStats[tagId].threshold) {
              user.points[0] += 1;
            }
            user.points[1] += 1;
          }
        }
      });
      user.score = Number((user.points[0] / user.points[1] * 100).toFixed(0));
    });
  };

  $scope.calculateFit = generateGlyphs.calculateFit;

  $scope.ExcludeAccepted = function () {
    return function (item) {
      if (item.searchStage === 'Accepted') {
        return false;
      } else {
        return true;
      }
    };
  };

  $scope.highlightedGlyph = {};

  //Toggle or highlight glyphicon when click only on the current ng-repeat index
  $scope.adjustGlyphHighlighting = function(glyphName, index, user) {
    if (!user[glyphName]){
      toggleOnDbGlyph(user, glyphName);
    }else{
      toggleOffDbGlyph(user, glyphName);
    }
  };

  var toggleOnDbGlyph = function(user, glyph){
    //Only One Glyph can be true at once. We will set the selected glyph to true and then iterate
    //over the rest of them to make sure they are all false
    var glyphs = {
      'star': true,
      'upVote': true,
      'downVote': true,
      'noGo': true
    };
    //
    user[glyph] = true;

    delete glyphs[glyph];

    for(var glyphName in glyphs){
      user[glyphName] = false;
    }
    console.dir(user);
    $scope.edit(user);
  };

  var toggleOffDbGlyph = function(user, glyph){
    user[glyph] = false;
  };


}]);
