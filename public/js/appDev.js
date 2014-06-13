var appDev = angular.module('jobQueryDev', ['jobQuery', 'ngMockE2E']);

appDev.run(function($httpBackend){

  $httpBackend.whenGET(/.tpl.html/).passThrough();

});