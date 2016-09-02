angular.module('troupe')
  .directive('navbar', function() {
    return {
      templateUrl: 'directives/navbar/navbar.tmpl.html',
      controller: 'navbarCtrl'
    }
  });
