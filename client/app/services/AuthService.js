angular.module('authService', [])
  .factory('Auth', function ($http, $q,$window, AuthToken) {
    var authFactory = {};
    authFactory.login = function (email, password) {
      return $http.post('/api/user/login', {
          email: email,
          password: password
        })
        .then(success=>{
          AuthToken.setToken(success.data.token);
          
        })
    }
    authFactory.logout = function () {
      AuthToken.setToken();
    }
    authFactory.isLoggedIn = function () {
      if (AuthToken.getToken())
        return true
      else
        return false
    }
    authFactory.getUser = function () {
      if (AuthToken.getToken())
        return $http.get('/api/users', {
          cache: true
        });
      else
        return $q.reject({
          message: 'El usuario no tiene token'
        })
    }
    return authFactory;

  })
  .factory('AuthToken', function ($window) {
    var authTokenFactory = {};
    authTokenFactory.getToken = function () {
      return $window.localStorage.getItem('token');
    }
    authTokenFactory.setToken = function (token) {
      if (token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    }
    return authTokenFactory;
  })
  .factory('AuthInterceptor', function ($q, AuthToken) {
    var interceptorFactory = {};
    interceptorFactory.request = function (config) {
      var token = AuthToken.getToken();
      if (token)
        config.headers.Authorization = token;
      console.log(token)
      return config;
    }
    interceptorFactory.responseError = function (response) {
      if (response.status == 403) {
        AuthToken.setToken();
        $location.path('/api/user/login');
      }
      return $q.reject(response);
    }
    return interceptorFactory;
  })