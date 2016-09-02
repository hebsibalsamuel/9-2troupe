angular.module('troupe')
  .service('editProfile', function($http) {
    this.getMessages = function() {
      return $http.get('http://10.219.93.3:3000/profile');
    }
  });
