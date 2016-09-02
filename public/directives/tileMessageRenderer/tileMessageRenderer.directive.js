angular.module('troupe')
  .directive('tileMessageRenderer', function() {
    return {
      templateUrl: 'directives/tileMessageRenderer/tileMessageRenderer.tmpl.html',
      controller: 'tileMessageRendererCtrl',
      scope: {
        tileName: '@',
        tileChannel:'@'
      }
    }
  });
