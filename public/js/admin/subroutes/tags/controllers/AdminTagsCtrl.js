app.controller('AdminTagsCtrl', ['$scope', 'Tag', 'Category', '$q', function($scope, Tag, Category, $q){

  $scope.pendingRequests = 0;

  var initialize = function(){
    //Step 1. Fetch all tags
    Tag.getAll().then(function(tags){
      console.log(tags.length);
      tags = tags.filter(function(tag){ return tag.active; });

      //Step 2. Fetch all categories
      Category.getAll('Tag').then(function(data){

        //Step 3. Objectify categories, keyed by category._id
        var categories = {};
        data.forEach(function(category){
          category.tags = [];
          categories[category._id] = category;
        });
        categories.uncategorized = {
          name: 'uncategorized',
          tags: []
        };
        //Step 4. Push tags into categories if one exists. If not, push the tag into undefined.
        tags.forEach(function(tag){
          //Set tag.readOnly value for template
          tag.readOnly = true;
          //If tag.category is null, push to uncategorized straightaway
          if(tag.category === null){
            categories.uncategorized.tags[tag.position] = tag;
          } else {
            var id = tag.category._id;
            if(categories[id]){
              categories[id].tags[tag.position] = tag;
            } else {
              categories.uncategorized.tags[tag.position] = tag;
            }
          }
        });
        //Step 5. Resolve Descrepancies
        var promises = [];
        for(var key in categories){
          var array = categories[key].tags;
          array.sort(function(a, b){
            return a.position - b.position;
          });
          for(var i = 0; i < array.length; i++){
            var tag = array[i];
            if(tag === undefined){
              console.log('undefined tag, splicing rest of array');
              array.splice(i, array.length - i);
              break;
            }
            if(tag && (tag.position !== i)){
              tag.position = i;
              console.log('error found, correcting');
              promises.push(Tag.update(tag));
            }
          }
        };
        $q.all(promises).then(function(data){
          $scope.categories = categories;
          console.log(categories);
        });

      });
    });
  };

  $scope.moveUp = function(index, category){
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
    if(current._id) promises.push(Tag.update(current));
    if(next._id) promises.push(Tag.update(next));
    $scope.pendingRequests++;
    return $q.all(promises).then(function(){
      $scope.pendingRequests--;
    });
  };

  $scope.moveDown = function(index, category){
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
    if(current._id) promises.push(Tag.update(current));
    if(next._id) promises.push(Tag.update(next));
    $scope.pendingRequests++;
    return $q.all(promises).then(function(){
      $scope.pendingRequests--;
    });
  };

  $scope.save = function(tag){
    $scope.pendingRequests++;
    if(tag._id){
      Tag.update(tag).then(function(data){
        $scope.pendingRequests--;
      });
    } else {
      console.log(tag);
      Tag.create(tag).then(function(data){
        $scope.pendingRequests--;
        tag._id = data._id;
      });
    }
  };

  $scope.add = function(category){
    category.tags.push({
      category: category._id,
      position: category.tags.length
    });
  };

  var reduceAfterIndex = function(tags, index){
    tag.position--;
    return Tag.update(tag);
  };

  var increaseTagPosition = function(tag){
    tag.position++;
    return Tag.update(tag);
  };

  $scope.remove = function(tag, index, category){
    $scope.pendingRequests++;
    var removeTagFromDatabasePromise = function(){
      if(tag._id){
        tag.active = false;
        tag.category = tag.category._id;
        return Tag.update(tag);
      } else {
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      }
    };

    var removeTagFromPage = function(){
      category.tags.splice(index, 1);
    };

    var reducePositionOfTagsPromise = function(){
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

    removeTagFromDatabasePromise().then(function(){
      removeTagFromPage();
      return reducePositionOfTagsPromise().then(function(){
        $scope.pendingRequests--;
      });
    });

  };

  initialize();

}]);