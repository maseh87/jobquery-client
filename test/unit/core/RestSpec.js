describe('Rest', function(){

  beforeEach(module('jobQuery'));

  describe('AuthHttpInterceptor', function(){
    var localStorageService,
        User,
        $httpBackend;

    beforeEach(inject(function($injector){
      User = $injector.get('User');
      localStorageService = $injector.get('localStorageService');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have test-token set on the authorization header', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users',function(headers) {
        return headers.Authorization === 'Bearer test-token';
      } ).respond([{_id: 1},{_id: 2}]);

      localStorageService.set('token', 'test-token');
      User.query();
      $httpBackend.flush();
    });

    it('should not have authorization header set', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users',function(headers) {
        return headers.Authorization === undefined;
      } ).respond(401);

      localStorageService.set('token', undefined);
      User.query();
      $httpBackend.flush();
    });

  });

  describe('User', function(){
    var User, $httpBackend;

    beforeEach(inject(function($injector){

      User = $injector.get('User');
      $httpBackend = $injector.get('$httpBackend');

    }));

    it('should exist', function(){
      expect(User).toBeDefined();
    });

    it('should make GET requests for all users', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users').respond([{_id: 1},{_id: 2}]);
      var result = User.query();
      $httpBackend.flush();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]._id).toBe(1);
    });

    it('should make GET requests for individual users', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users/1').respond({_id: 1});
      var result = User.get({_id: 1});
      $httpBackend.flush();
      expect(typeof result).toBe('object');
      expect(result._id).toBe(1);
    });

    it('should make a POST request to add a new user', function(){
      var user = new User({test: 'data'});
      $httpBackend.expectPOST('http://localhost:9000/api/users').respond(201, '');
      var postRequest = user.$save();
      $httpBackend.flush();
      postRequest.then(function(response){
        expect(response).toBe(201);
      });
    });

    it('should make PUT requests to update users by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users/1').respond({_id: 1});
      var user = User.get({_id: 1});
      $httpBackend.flush();

      $httpBackend.expectPUT('http://localhost:9000/api/users/1').respond(201, '');
      user.test = 'data';
      var putRequest = User.update({_id: 1}, user);
      $httpBackend.flush();

      putRequest.$promise.then(function(response){
        expect(response).toBe(201);
      });
    });

  });

  describe('Message', function(){
    var Message, $httpBackend;

    beforeEach(inject(function($injector){
      Message = $injector.get('Message');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should exist', function(){
      expect(Message).toBeDefined();
    });

    it('should make GET requests for all messages', function(){
      $httpBackend.expectGET('http://localhost:9000/api/messages').respond([{_id: 1},{_id: 2}]);
      var result = Message.query();
      $httpBackend.flush();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]._id).toBe(1);
    });

    it('should make POST requests to add new messages', function(){
      var message = new Message({test: 'data'});
      $httpBackend.expectPOST('http://localhost:9000/api/messages').respond(201, '');
      var postRequest = message.$save();
      $httpBackend.flush();
      postRequest.then(function(response){
        expect(response).toBe(201);
      });
    });

    it('should make GET requests for a single message', function(){
      $httpBackend.expectGET('http://localhost:9000/api/messages/1').respond({_id: 1});
      var message = Message.get({_id: 1});
      $httpBackend.flush();
      expect(message._id).toBe(1);
    });

  });

  describe('Tag', function(){
    var Tag, $httpBackend;

    beforeEach(inject(function($injector){
      Tag = $injector.get('Tag');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should exist', function(){
      expect(Tag).toBeDefined();
    });

    it('should make GET requests for all tags', function(){
      $httpBackend.expectGET('http://localhost:9000/api/tags').respond([{_id: 1},{_id: 2}]);
      var result = Tag.query();
      $httpBackend.flush();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]._id).toBe(1);
    });

    it('should make GET requests for individual tags', function(){
      $httpBackend.expectGET('http://localhost:9000/api/tags/1').respond({_id: 1});
      var result = Tag.get({_id: 1});
      $httpBackend.flush();
      expect(typeof result).toBe('object');
      expect(result._id).toBe(1);
    });

    it('should make a POST request to create a new tag', function(){
      var tag = new Tag({test: 'data'});
      $httpBackend.expectPOST('http://localhost:9000/api/tags').respond(201, '');
      var postRequest = tag.$save();
      $httpBackend.flush();
      postRequest.then(function(response){
        expect(response).toBe(201);
      });
    });

    it('should make PUT requests to update tags by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/tags/1').respond({_id: 1});
      var tag = Tag.get({_id: 1});
      $httpBackend.flush();

      $httpBackend.expectPUT('http://localhost:9000/api/tags/1').respond(201, '');
      tag.test = 'data';
      var putRequest = Tag.update({_id: 1}, tag);
      $httpBackend.flush();

      putRequest.$promise.then(function(response){
        expect(response).toBe(201);
      });
    });

  });

  describe('Company', function(){
    var Company, $httpBackend;

    beforeEach(inject(function($injector){
      Company = $injector.get('Company');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should exist', function(){
      expect(Company).toBeDefined();
    });

    it('should make GET requests for all companies', function(){
      $httpBackend.expectGET('http://localhost:9000/api/companies').respond([{_id: 1},{_id: 2}]);
      Company.getAll().then(function(companies){
        expect(Array.isArray(companies)).toBe(true);
        expect(companies[0]._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a POST request to add a new company', function(){
      $httpBackend.expectPOST('http://localhost:9000/api/companies').respond({_id: 1});
      Company.create({test: 'data'}).then(function(response){
        expect(response._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a GET request to fetch one company by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/companies/1').respond({_id: 1});
      Company.get(1).then(function(company){
        expect(typeof company).toBe('object');
        expect(company._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a PUT request to update a single company by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/companies/1').respond({_id: 1});
      var company;
      Company.get(1).then(function(data){
        company = data;
      });
      $httpBackend.flush();
      
      $httpBackend.expectPUT('http://localhost:9000/api/companies/1').respond({_id: 1});
      Company.update(company).then(function(data){
        expect(data._id).toBe(1);
      });
      $httpBackend.flush();
    });

  });

  describe('Opportunity', function(){
    var Opportunity, $httpBackend;

    beforeEach(inject(function($injector){
      Opportunity = $injector.get('Opportunity');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should exist', function(){
      expect(Opportunity).toBeDefined();
    });

    it('should make GET requests for all opportunities', function(){
      $httpBackend.expectGET('http://localhost:9000/api/opportunities').respond([{_id: 1},{_id: 2}]);
      var result = Opportunity.query();
      $httpBackend.flush();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]._id).toBe(1);
    });

    it('should make a POST request to add a new opportunity', function(){
      var opportunity = new Opportunity({test: 'data'});
      $httpBackend.expectPOST('http://localhost:9000/api/opportunities').respond(201, '');
      var postRequest = opportunity.$save();
      $httpBackend.flush();
      postRequest.then(function(response){
        expect(response).toBe(201);
      });
    });

    it('should make a GET request to fetch one opportunity by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/opportunities/1').respond({_id: 1});
      var result = Opportunity.get({_id: 1});
      $httpBackend.flush();
      expect(typeof result).toBe('object');
      expect(result._id).toBe(1);
    });

    it('should make a PUT request to update a single opportunity by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/opportunities/1').respond({_id: 1});
      var opportunity = Opportunity.get({_id: 1});
      $httpBackend.flush();

      $httpBackend.expectPUT('http://localhost:9000/api/opportunities/1').respond(201, '');
      opportunity.test = 'data';
      var putRequest = Opportunity.update({_id: 1}, opportunity);
      $httpBackend.flush();

      putRequest.$promise.then(function(response){
        expect(response).toBe(201);
      });
    });

  });

});
