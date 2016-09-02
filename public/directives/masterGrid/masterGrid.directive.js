angular.module('troupe')
  .directive('masterGrid', function() {
    return {
      templateUrl: 'directives/masterGrid/masterGrid.tmpl.html',
      controller:'masterGridCtrl'
    }
  }) 
