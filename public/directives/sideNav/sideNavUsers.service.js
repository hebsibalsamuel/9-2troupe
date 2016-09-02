angular.module('troupe')
 .service('user',function($http) {
   this.getUsers = function() {

     return $http.get("http://10.219.93.3:3000/users");
   }
 });
