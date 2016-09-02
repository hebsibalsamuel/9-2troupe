angular.module('troupe')
  .directive('channel', function() {
    return {
      templateUrl: 'directives/channel/channel.tmpl.html',
      controller: 'channelCtrl'
    }
  })
