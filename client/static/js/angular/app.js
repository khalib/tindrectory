var tindrectoryApp = angular.module('tindrectory', ['ngRoute', 'ngSanitize'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller:'UserSearchController',
        templateUrl:'../templates/user/search.html'
      })
      .otherwise({
        redirectTo:'/'
      });
  })
;