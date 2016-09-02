angular.module('troupe')
  .directive('auto', function() {
    return {
      templateUrl: 'directives/autoComplete/auto.tmpl.html',
      controller:'myCtrl'
    }
  })
