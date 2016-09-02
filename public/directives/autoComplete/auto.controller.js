angular.module('troupe')
.controller('myCtrl', function ($scope, $http, $q, GetProjectService) {

   $scope.searchText = "";
   $scope.selectedItem = [];
   $scope.isDisabled = false;
   $scope.noCache = false;

   $scope.selectedItemChange = function (item) {
       //alert("Item Changed");
       console.log(item);
   }
   $scope.searchTextChange = function (str) {
 return GetProjectService.getProject(str);
   }

})

.factory('GetProjectService', function ($http, $q) {
   return {


       getProject: function(str) {
           // the $http API is based on the deferred/promise APIs exposed by the $q service
           // so it returns a promise for us by default
   //var url = "http://10.219.85.91:3000/projects?projectName_like="+str;
           return $http.get(url)
               .then(function(response) {
                   if (typeof response.data === 'object') {
                       return response.data;
                   } else {
                       // invalid response
                       return $q.reject(response.data);
                   }

               }, function(response) {
                   // something went wrong
                   return $q.reject(response.data);
               });
       }
   };
});
