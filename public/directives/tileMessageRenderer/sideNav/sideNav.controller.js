angular.module('troupe')
  .controller('sideNavCtrl', function ($scope, $timeout, $mdSidenav, $log, $http,user) {

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.onlineArr = [];
    $scope.offlineArr = [];

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);

      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
     function buildDelayedToggler(navID) {
       return debounce(function() {
         // Component lookup should always be available since we are not using `ng-if`
         $mdSidenav(navID)
           .toggle()
           .then(function () {
             user.getUsers().success(function(users) {
               $scope.onlineArr = [];
               $scope.offlineArr = [];
                users.forEach(function(user) {
                  if(  user["status"] === "on") {
                    user.class="online"
                    $scope.onlineArr.push(user);

                  }
                  else {
                    user.class="offline";
                    $scope.offlineArr.push(user);
                  }
                });

            //    $scope.socket.emit('onOff',$scope.offlineArr);
             });
           });
       }, 200);
     }


    $scope.test = function(userName){
      console.log("hello "+ userName);
    };

    $scope.close = function () {
        $scope.online_array = [];
      $mdSidenav('left').close()
    };

});
