var app1=angular.module('troupe')
  .controller('masterGridCtrl', masterGridCtrl);

  function masterGridCtrl($scope,$mdDialog,$http,$rootScope){

    $scope.showEdit = function(name,color,column,ids) {
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,          
                  templateUrl: 'directives/masterGrid/addTile/editTileDialog.tmpl.html',
                  controller: function masterGridCtrl($scope,$mdDialog,$http,$rootScope,$window) {
                                 $scope.cancel = function() {
                                       $mdDialog.hide();
                                 }

                                $scope.sample={};
                                $scope.sample.tname=name;
                                $scope.sample.color=color;
                                if(column===2){
                                  $scope.sample.size="Small";
                                }
                                else if (column===3) {
                                  $scope.sample.size="Medium";
                                }
                                else if (column===4) {
                                  $scope.sample.size="Large";
                                }
                                // console.log($scope.sample);

                                 $scope.edittile = function(tile,tileSize,tileColor) {
                                       console.log("hi");
                                       $scope.tileObj2={};
                                       $scope.tileObj2.channelid=[];
                                       $scope.tileObj2.tileName=tile;

                                       if(tileSize==="Small"){
                                         $scope.tileObj2.row=2;
                                         $scope.tileObj2.column=2;
                                       }
                                       else if(tileSize==="Medium"){
                                         $scope.tileObj2.row=3;
                                         $scope.tileObj2.column=3;
                                       }
                                       else if(tileSize==="Large"){
                                         $scope.tileObj2.row=2;
                                         $scope.tileObj2.column=4;
                                       }
                                       $scope.tileObj2.colour=tileColor;
                                       console.log($scope.tileObj2);

                                       var h =JSON.stringify($scope.tileObj2);

                                       console.log(h);
                                       $http.patch("http://10.219.93.3:3000/tiles/"+ids, h).
                                       success(function(data, status, headers, config) {
                                          console.log("data");
                                          //$window.location.reload();
                                       }).
                                       error(function(data, status, headers, config) {});

                                       $mdDialog.hide();
                                       $window.location.reload();
                                     }
                                   }
                 });
    };

    $scope.onDropComplete = function (index, obj, evt)
    {
      var otherObj = $scope.msg[index];
      var otherIndex = $scope.msg.indexOf(obj);
      $scope.msg[index] = obj;
      $scope.msg[otherIndex] = otherObj;
      $scope.tiles_id = [];
      console.log($scope.msg);
      // var h =JSON.stringify($scope.msg);
      // console.log(h);

      $http.get("http://10.219.93.3:3000/tiles/")
      .then(function(response) {
        console.log("Response data:" + response.data);
        $scope.tilelength =response.data.length;
        console.log($scope.tilelength);
        for (var i = 0; i < $scope.tilelength; i++)
        {
          $scope.tiles_id[i] = response.data[i].id;
        }
        console.log($scope.tiles_id);
        for (var i = 0; i < $scope.tilelength; i++)
        {
          console.log($scope.tiles_id[i]);
          $http.delete("http://10.219.93.3:3000/tiles/"+$scope.tiles_id[i])
           .then(function(response) {
             console.log($scope.tiles_id[i]);
             console.log("inside delete");
           }, function(response) {
           $scope.content = "Something went wrong";
           });
        }
        // for (var j = 0; j < $scope.msg.length; j++)
        // {
        //   console.log($scope.msg.length);
        //  $http.post("http://10.219.93.3:3000/tiles/",$scope.msg[0] )
        //   .then(function(response){
        //          console.log($scope.msg.length);
        //    },function(response){
        //      $scope.content = "Something went wrong";
        //    });
         //
        //    $http.post("http://10.219.93.3:3000/tiles/",$scope.msg[1] )
        //     .then(function(response){
        //            console.log($scope.msg.length);
        //      },function(response){
        //        $scope.content = "Something went wrong";
        //      });
        // }
    });
  }
}
