angular.module('troupe')
 .service('channelNameForList', function($http,$rootScope) {
       this.getchName = function(id) {
         return $http.get('http://10.219.93.3:3000/projects/'+id);
       }
 })

 .service('projects123',function($http,$rootScope){
   this.getNames = function(id){
     return $http.get('http://10.219.93.3:3000/projects/'+id);
   }
 });
