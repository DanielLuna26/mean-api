(function () {
  'use strict';

  angular.module('userCtrl', [
    'userService'
  ]).controller('userController', function (User) {
    var vm = this;

    User.all()
      .then(function (success) {
        vm.users = success.data.users;
        
      })
  })
})();