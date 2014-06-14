var appDev = angular.module('jobQueryDev', ['jobQuery', 'ngMockE2E']);

appDev.run(function($httpBackend){

  $httpBackend.whenPOST(/api/).respond(['201']);
  $httpBackend.whenPUT(/api/).respond(['201']);
  $httpBackend.whenGET(/api/).respond(function(request, url){

    var route = url.split('/').slice(4);
    var resource = route[0];
    var id = route[1];
    switch(resource){
      case 'users':
        return id ? ['200', users[id - 1]] : ['200', users];
        break;
      case 'messages':
        return id ? ['200', messages[id - 1]] : ['200', messages];
        break;
      case 'tags':
        return id ? ['200', tags[id - 1]] : ['200', tags];
        break;
      case 'companies':
        return id ? ['200', companies[id - 1]] : ['200', companies];
        break;
      case 'opportunities':
        return id ? ['200', opportunities[id - 1]] : ['200', opportunities];
        break;
      case 'matches':
        var subroute = route[1];
        var id = route[2];
        if(!subroute){
          return ['200', matches];
        } else if (subroute === 'users') {
          var filteredMatches = matches.filter(function(match){
            return id === match.userId;
          });
          return ['200', filteredMatches];
        } else if (subroute === 'opportunities') {
          var filteredMatches = matches.filter(function(match){
            return id === match.oppId;
          });
        } else {
          return ['404'];
        }
        break;
      default:
        return ['404'];
    }

  });
  $httpBackend.whenGET(/.tpl.html/).passThrough();

});