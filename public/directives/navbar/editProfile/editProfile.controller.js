angular.module('troupe')
  .controller('editProfileCtrl',['$scope','editProfile', function($scope, editProfile){
       editProfile.getMessages().success(function(messages) {
            $scope.user = messages;
       });
  }]);
