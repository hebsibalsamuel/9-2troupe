angular.module('troupe')
  .directive('editProfile', function() {
    return {
      templateUrl: 'directives/navbar/editProfile/editProfile.tmpl.html',
      controller: 'editProfileCtrl',
    }
  });
