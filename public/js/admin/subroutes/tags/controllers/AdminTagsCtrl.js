app.controller('AdminTagsCtrl', ['$scope', 'Tag', 'Category', '$q',
  function ($scope, Tag, Category, $q) {

  $scope.pendingRequests = 0;

  var initialize = function () {
    //Step 1. Fetch all tags
    Tag.getAll().then(function (tags) {
      tags = tags.filter(function (tag) { return tag.active; });

      //Step 2. Fetch all categories
      Category.getAll('Tag').then(function (data) {
        $scope.categoryRefs = data;
        //Step 3. Objectify categories, keyed by category._id
        var categories = {};
        data.forEach(function (category) {
          if(category.active){
            category.readOnly = true;
            category.tags = [];
            categories[category._id] = category;
          }
          if(category.name.match(/New Category/)){
            category.name = 'New Category';
          }
        });
        categories.uncategorized = {
          name: 'uncategorized',
          tags: []
        };
        //Step 4. Push tags into categories if one exists. If not, push the tag into undefined.
        tags.forEach(function (tag) {
          //Set tag.readOnly value for template
          tag.readOnly = true;
          //If tag.category is null, push to uncategorized straightaway
          if (tag.category === null) {
            categories.uncategorized.tags[tag.position] = tag;
          } else {
            var id = tag.category._id;
            if (categories[id]) {
              categories[id].tags[tag.position] = tag;
            } else {
              categories.uncategorized.tags[tag.position] = tag;
            }
          }
        });
        delete categories.uncategorized;
        //Step 5. Resolve Descrepancies
        var promises = [];
        var sortPosition = function (a, b) {
          return a.position - b.position;
        };
        for (var key in categories) {
          var array = categories[key].tags;
          array.sort(sortPosition);
          for (var i = 0; i < array.length; i++) {
            var tag = array[i];
            if (tag === undefined) {
              array.splice(i, array.length - i);
              break;
            }
            if (tag && (tag.position !== i)) {
              tag.position = i;
              console.log('error found, correcting');
              promises.push(Tag.update(tag));
            }
          }
        }
        $q.all(promises).then(function (data) {
          $scope.categories = categories;
        });

      });
    });
  };

  $scope.moveUp = function (index, category) {
    //1. Grab current tag.
    var current = category.tags[index];
    //2. Grab next tag.
    var next = category.tags[index - 1];
    //3. Update positions of both tags.
    current.position--;
    next.position++;
    category.tags.splice(index - 1, 2, current, next);
    //4. If either tag is saved in the database, submit a PUT request
    var promises = [];
    if (current._id) promises.push(Tag.update(current));
    if (next._id) promises.push(Tag.update(next));
    $scope.pendingRequests++;
    return $q.all(promises).then(function () {
      $scope.pendingRequests--;
    });
  };

  $scope.moveDown = function (index, category) {
    //1. Grab current tag.
    var current = category.tags[index];
    //2. Grab next tag.
    var next = category.tags[index + 1];
    //3. Update positions of both tags.
    current.position++;
    next.position--;
    category.tags.splice(index, 2, next, current);
    //4. If either tag is saved in the database, submit a PUT request
    var promises = [];
    if (current._id) promises.push(Tag.update(current));
    if (next._id) promises.push(Tag.update(next));
    $scope.pendingRequests++;
    return $q.all(promises).then(function(){
      $scope.pendingRequests--;
    });
  };

  var swapCategories = function (tag, index, category) {
    //First splice the tag out of the category tags array.
    $scope.categories[category._id].tags.splice(index, 1);
    //Push the tag onto the new category tags array, setting position in the process.
    tag.position = $scope.categories[tag.newCatId].tags.length;
    tag.category = tag.newCatId;
    $scope.categories[tag.newCatId].tags.push(tag);
    //Update the position of all tags which come after it.
    var promises = [];
    for (var i = index; i < category.tags.length; i++) {
      category.tags[i].position--;
      promises.push(Tag.update(category.tags[i]));
    }
    return $q.all(promises);
  };

  $scope.save = function (tag, index, category) {
    if (typeof tag.category !== 'string' && tag.newCatId !== tag.category._id) {
      swapCategories(tag, index, category).then(function () {
        return $scope.save(tag, index);
      });
    } else if (tag.name && tag.label) {
      $scope.pendingRequests++;
      if (tag._id) {
        Tag.update(tag).then( function (data) {
          $scope.pendingRequests--;
        });
      } else {
        Tag.create(tag).then( function (data) {
          $scope.pendingRequests--;
          tag._id = data._id;
        });
      }
    }
  };

  $scope.add = function (category) {
    category.tags.push({
      category: category._id,
      position: category.tags.length
    });
  };

  var reduceAfterIndex = function (tags, index) {
    tag.position--;
    return Tag.update(tag);
  };

  var increaseTagPosition = function (tag) {
    tag.position++;
    return Tag.update(tag);
  };

  $scope.remove = function (tag, index, category) {
    $scope.pendingRequests++;
    var removeTagFromDatabasePromise = function () {
      if (tag._id) {
        tag.active = false;
        tag.category = tag.category._id;
        return Tag.update(tag);
      } else {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      }
    };

    var removeTagFromPage = function () {
      category.tags.splice(index, 1);
    };

    var reducePositionOfTagsPromise = function () {
      var promises = [];
      for(var i = index; i < category.tags.length; i++){
        var tag = category.tags[i];
        tag.position--;
        if(category.tags[i]._id){
          promises.push(Tag.update(category.tags[i]));
        }
      }
      return $q.all(promises);
    };

    removeTagFromDatabasePromise().then(function () {
      removeTagFromPage();
      return reducePositionOfTagsPromise().then (function () {
        $scope.pendingRequests--;
      });
    });

  };

  $scope.addCategory = function () {
    var newCategory = {
      name: 'New Category ' + Math.floor(Math.random() * 1000000),
      type: 'Tag'
    };
    $scope.pendingRequests++;
    Category.create(newCategory).then(function (category) {
      $scope.pendingRequests--;
      newCategory._id = category._id;
      $scope.categories[category._id] = {
        _id: newCategory._id,
        type: 'Tag',
        name: 'New Category'
      };
    });
  };

  $scope.saveCategory = function (category) {
    $scope.pendingRequests++;
    Category.update(category).then(function (category) {
      $scope.pendingRequests--;
      console.log('category updated');
    });
  };

  $scope.removeCategory = function(category){
    var date = new Date();
    category.active = false;
    category.name = category.name + ' ' + date;
    $scope.pendingRequests++;
    Category.update(category).then(function(category){
      $scope.pendingRequests--;
      delete $scope.categories[category._id];
    });
  };

  initialize();

}]);
