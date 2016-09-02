angular.module('troupe')
  .directive('select', function() {
    return {
      templateUrl: 'select/select.tmpl.html',
      controller:'BasicDemoCtrl'
    }
  })
