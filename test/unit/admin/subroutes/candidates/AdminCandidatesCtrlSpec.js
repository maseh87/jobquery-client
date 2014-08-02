describe('AdminCandidatesCtrl', function(){
  // var SERVER_URL = 'http://jobquerystagingserver.azurewebsites.net';
  var SERVER_URL = 'http://localhost:9000';
  var User,
      $scope,
      $rootScope,
      $controller,
      $httpBackend,
      $stateParams,
      controller;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');
    $rootScope   = $injector.get('$rootScope');
    $controller  = $injector.get('$controller');
    User         = $injector.get('User');

    $scope = $rootScope.$new();
    controller = $controller('AdminCandidatesCtrl', {
          Resource    : User,
          $controller : $controller,
          $scope      : $scope
        });
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/users').respond([]);
    $httpBackend.expectGET(SERVER_URL + '/api/matches').respond([]);
    expect(typeof controller).toBe('object');
    $httpBackend.flush();
  });

  it('User.get and Match.get functions should be invoked', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users').respond([]);
    $httpBackend.expectGET(SERVER_URL + '/api/matches').respond([]);
    $httpBackend.flush();
  });

  it('User.get and Match.get functions should be invoked', function() {
    $httpBackend.expectGET(SERVER_URL + '/api/users').respond([{
      _id: 1,
      category: {name : 'one'},

    },{
      _id: 2,
      category : {name : 'two'},
    }]);
    $httpBackend.expectGET(SERVER_URL + '/api/matches').respond([]);
    $httpBackend.flush();
  });

});

var getUsers = function() {
  var users = [];
  users.push({
     "email":"Jeffrey@gregorio.tv",
     "name":"Mae Bernier",
     "github":"github.com/Carmine",
     "linkedin":"linkedin.com/in/Dimitri",
     "isAdmin":false,
     "city":"San Francisco",
     "state":"CA",
     "country":"USA",
     "category":{
        "name":"schemas",
        "_id":"53a26bbed8b8750000aef2f8",
        "__v":0,
        "updatedAt":"2014-06-19T04:49:02.835Z",
        "createdAt":"2014-06-19T04:49:02.829Z",
        "rank":18,
        "type":"Tag"
     },
     "_id":"53a26bbfd8b8750000aef43b",
     "__v":0,
     "updatedAt":"2014-06-19T04:49:03.240Z",
     "createdAt":"2014-06-19T04:49:03.190Z",
     "messages":[

     ],
     "tags":[
     ],
     "searchStage":"Early",
     "isRegistered":true
  });

  users.push({
     "email":"Jeffrey@gregorio.tv",
     "name":"Mae Bernier",
     "github":"github.com/Carmine",
     "linkedin":"linkedin.com/in/Dimitri",
     "isAdmin":false,
     "city":"San Francisco",
     "state":"CA",
     "country":"USA",
     "category":{
        "name":"schemas",
        "_id":"53a26bbed8b8750000aef2f8",
        "__v":0,
        "updatedAt":"2014-06-19T04:49:02.835Z",
        "createdAt":"2014-06-19T04:49:02.829Z",
        "rank":18,
        "type":"Tag"
     },
     "_id":"53a26bbfd8b8750000aef43b",
     "__v":0,
     "updatedAt":"2014-06-19T04:49:03.240Z",
     "createdAt":"2014-06-19T04:49:03.190Z",
     "messages":[

     ],
     "tags":[
     ],
     "searchStage":"Early",
     "isRegistered":true
  });



  return users;
};
