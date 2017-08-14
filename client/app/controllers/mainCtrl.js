angular.module('mainCtrl', [])
  .controller('mainControlller', function ($rootScope, $location, Auth) {
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function () {
      vm.loggedIn = Auth.isLoggedIn();
    })
    Auth.getUser()
      .then(data=>{
        vm.user = data;
      })
    vm.doLogin = function () {
      Auth.login(vm.loginData.email, vm.loginData.password)
        .then(function(data) {
          $location.path('/api/users');
        })
    }
    vm.doLogout = function () {
      Auth.logout();
      vm.user = {}
      $location.path('/api/user/login')
    }
  })