angular.module('troupe')
  .controller('tileMessageRendererCtrl', function($window,navbarNewTile,$rootScope,$timeout,$scope,messageRouter,$interval,$http) {
    $scope.channels = [];
    $scope.obj = {};
    $scope.messages = [];
    $scope.messageCount = 0;
    $scope.tempMessages = [];
    $scope.cha=[];
    $scope.chanlary=[];
    $scope.drop={
    channelid:[]
    };


    var count = 0;
    var flag=0;


    $interval(function (i) {
      if($scope.messages.length > 0) {
          $scope.messages.splice(0,1);
      }
      $scope.messages.push($scope.tempMessages[count % 4]);
      count++;
      if(count > 4) {
          count = 0;
      }

    }, 10000);

    //$scope.messageCount=$scope.messages.length;

    console.log("haaaaaaaiiiiiiii"+$scope.tileName+"  "+$rootScope.tiles[0]["id"]);
    $rootScope.msg.forEach(function(tile) {
      if($scope.tileName == tile['id']) {
        $scope.channels =   $scope.tileChannel;

      }
    });

    $scope.$on('message', function(event,data) {
      if($scope.channels.indexOf(String(data.channelId)) > -1) {
        if(data.user!=$rootScope.userName) {
          $scope.tempMessages.push(data);
          console.log($scope.tempMessages);
          $scope.messageCount++;
        }
      }
    });
    $scope.onClickDisplayChannel=function(message){
      $rootScope.$broadcast('msgChannelId',message);
    }

    // Modified code for file
  // for ticking the box present


  $scope.checkdrp=function(a)
{

  var hb=parseInt(a);
  if($scope.tileChannel.indexOf(hb)>-1) {
    return true;
    }
    else {
      return false;
    }
}


$scope.tilechan=[];

$scope.click=function(a,b)
{

  if(flag==0)
  {
  $scope.tilechan=JSON.parse($scope.tileChannel);
  flag=flag+1;
}
  console.log(a,b);
  var ab=parseInt(a);
  if(b==true)
  {
    var indexvalue=$scope.tilechan.indexOf(ab);
   console.log(a,indexvalue,typeof ab);
    $scope.tilechan.splice(indexvalue,1);
  }
  else{
    $scope.tilechan.push(ab);
  }
  console.log($scope.tilechan);
  //$scope.drop.channelid=$scope.tileChannel;
}

$scope.dropbox=function()
{
   $scope.drop.channelid=$scope.tilechan;
   var h =JSON.stringify($scope.drop);

  $http.patch("http://localhost:3000/tiles/"+$scope.tileName, h).
  success(function(data, status, headers, config) {
         console.log("done");
         //console.log(checkvalue[i]+" "+tileName);
       $scope.cha=[];
       $scope.drop.channelid=[];
       $scope.tilechan=[];
    }).
   error(function(data, status, headers, config) {});
    $window.location.reload();
 }

$scope.deletetile=function(){
  //console.log(tileName);
  $http.delete("http://localhost:3000/tiles/"+$scope.tileName)
   .then(function(response) {

   $scope.tileobj = response.data;
   console.log($scope.tileobj.length);

//
navbarNewTile.newTile().then(function(response)
{
  $rootScope.msg = response.data;  //First function handles success
  }, function(response) {
  $scope.content = "Something went wrong";   //Second function handles error
  });
 }, function(response) {
 $scope.content = "Something went wrong";
 });
}

navbarNewTile.newChannelDrop().then(function(a)
{
     //First function handles success
     $scope.droplist = a.data;
      //console.log($scope.msg.channel[0].name1);
 }, function(response) {
      //Second function handles error
      $scope.content = "Something went wrong";
 });

  });
