angular.module('app',['ngAnimate'])
    .controller('ctrl', function($scope,$interval) {
       $scope.list = [];
       $scope.tempList = [];
       
       for(var i=0;i<10;i++) {
           var obj = {name: "Ram"+i};
           $scope.tempList.push(obj);
       };
       
       var count = 0;
       
       $interval(function(i) {
           if($scope.list.length > 0) {
               $scope.list.splice(0,1);
           }
           $scope.list.push($scope.tempList[count % 10]);
           count++;
           if(count > 10) {
               count = 0;
           }
           
       },10000);
       
    });