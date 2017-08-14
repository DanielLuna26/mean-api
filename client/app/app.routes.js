angular.module('app.routes', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/api',
      })
      .when('/api/user/login',{
        templateUrl: '/api/user/login',
        controller: 'mainControlller',
        controllerAs: 'login'      
      })
      .when('/api/users',{
        templateUrl: '/api/user',
        controller: 'userController',
        controllerAs: 'user'
      })
      $locationProvider.html5Mode(true);
  })