angular.module('troupe')
  .service('channel', function($http) {
    this.getMessages = function() {
      return $http.get('http://localhost:3000/message');
    }
  });
