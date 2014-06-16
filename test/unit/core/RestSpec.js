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
      }).respond([{_id: 1},{_id: 2}]);

      localStorageService.set('token', 'test-token');
      User.getAll();
      $httpBackend.flush();
    });

    it('should not have authorization header set', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users',function(headers) {
        return headers.Authorization === undefined;
      }).respond(401);

      localStorageService.set('token', undefined);
      User.getAll();
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
      User.getAll().then(function(users){
        expect(Array.isArray(users)).toBe(true);
        expect(users[0]._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a POST request to add a new user', function(){
      $httpBackend.expectPOST('http://localhost:9000/api/users').respond({_id: 1});
      User.create({test: 'data'}).then(function(response){
        expect(response._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a GET request to fetch one user by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users/1').respond({_id: 1});
      User.get(1).then(function(user){
        expect(typeof user).toBe('object');
        expect(user._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a PUT request to update a single user by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/users/1').respond({_id: 1});
      var user;
      User.get(1).then(function(data){
        user = data;
      });
      $httpBackend.flush();
      
      $httpBackend.expectPUT('http://localhost:9000/api/users/1').respond({_id: 1});
      User.update(user).then(function(data){
        expect(data._id).toBe(1);
      });
      $httpBackend.flush();
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
      Tag.getAll().then(function(tags){
        expect(Array.isArray(tags)).toBe(true);
        expect(tags[0]._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a POST request to add a new tag', function(){
      $httpBackend.expectPOST('http://localhost:9000/api/tags').respond({_id: 1});
      Tag.create({test: 'data'}).then(function(response){
        expect(response._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a GET request to fetch one tag by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/tags/1').respond({_id: 1});
      Tag.get(1).then(function(tag){
        expect(typeof tag).toBe('object');
        expect(tag._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a PUT request to update a single tag by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/tags/1').respond({_id: 1});
      var tag;
      Tag.get(1).then(function(data){
        tag = data;
      });
      $httpBackend.flush();
      
      $httpBackend.expectPUT('http://localhost:9000/api/tags/1').respond({_id: 1});
      Tag.update(tag).then(function(data){
        expect(data._id).toBe(1);
      });
      $httpBackend.flush();
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
      Opportunity.getAll().then(function(opportunities){
        expect(Array.isArray(opportunities)).toBe(true);
        expect(opportunities[0]._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a POST request to add a new opportunity', function(){
      $httpBackend.expectPOST('http://localhost:9000/api/opportunities').respond({_id: 1});
      Opportunity.create({test: 'data'}).then(function(response){
        expect(response._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a GET request to fetch one opportunity by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/opportunities/1').respond({_id: 1});
      Opportunity.get(1).then(function(opportunity){
        expect(typeof opportunity).toBe('object');
        expect(opportunity._id).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should make a PUT request to update a single opportunity by _id', function(){
      $httpBackend.expectGET('http://localhost:9000/api/opportunities/1').respond({_id: 1});
      var opportunity;
      Opportunity.get(1).then(function(data){
        opportunity = data;
      });
      $httpBackend.flush();
      
      $httpBackend.expectPUT('http://localhost:9000/api/opportunities/1').respond({_id: 1});
      Opportunity.update(opportunity).then(function(data){
        expect(data._id).toBe(1);
      });
      $httpBackend.flush();
    });

  });

});
