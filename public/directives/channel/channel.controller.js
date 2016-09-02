angular.module('troupe')
  .controller('channelCtrl', channelCtrl);

  function channelCtrl($scope,channel,$http,channelNameForList,projects123,$rootScope) {
      $scope.socket = io();
      $scope.messages = [];
      $scope.newMessageObject={};
      $scope.highlite = [];
      var projID;



      var check=function(a,b) {
   $http.get("http://10.219.93.3:8080/file/"+b)
     .then(function(response) {
       //console.log(response.data);
         $scope.messages[a]["content"]=response.data;
         // console.log($scope.messages[i].content);
              }, function(response) {
     $scope.content = "Something went wrong";   //Second function handles error
     });

  }

  $scope.$on('highlightSnippet', function(ngRepeatFinishedEvent,element) {
          //var x = angular.element(document.querySelector('pre code'));
          var x = document.querySelectorAll('pre code');

          for(counter=0; counter< x.length; counter++){
            var m=$scope.highlite[counter];
            // console.log(m);
            console.log(counter);
            hljs.highlightBlock(x[m]);

          }

        //   .each(function(i, block) {
        //     hljs.highlightBlock(block);
        // });
      });


       channel.getMessages().success(function(messages) {
            //console.log(messages);

            $scope.messages= messages;
         for (var i = 0; i < messages.length; i++){

           if(messages[i].type=="snippet")
           {
             //  console.log(messages[i].content);
              $scope.highlite.push(i);
               check(i,messages[i].content);

             }
         }
       });
      $scope.checkIfEnterKeyWasPressed=function($event,typedMessage){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            var date = new Date();
            var hr = date.getHours();
            var min = date.getMinutes();
            if(min < 9)
              min="0"+min;
            var time = hr+":"+min;
            var newDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
            console.log("you have use the enter keys");
            $scope.typedMessage="";
            $scope.newMessageObject={
               "channelId": $scope.chId,
               "user": $rootScope.userName,
               "time":time,
               "content":typedMessage,
               "date":newDate,
               "userAvatar":"Koala.jpg",
               "github_user": $scope.github_user,
               "github_repo": $scope.github_repo,
               "github_token" : $scope.github_token
              }

             $scope.socket.emit('message',$scope.newMessageObject);
             //alert($scope.github_user+"+"+$scope.github_repo+"+"+$scope.github_token)
          }
        };
        $scope.addingSnippet=function(ev,typedMessage){

              var date = new Date();
              var hr = date.getHours();
              var min = date.getMinutes();
              if(min < 9)
                min="0"+min;
              var time = hr+":"+min;
              var newDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
              console.log("Snippet has been added");
              $scope.typedMessage="";
              $scope.newMessageObject={
                 "channelId": $scope.chId,
                 "user": $rootScope.userName,
                 "time":time,
                 "content":typedMessage,
                 "date":newDate,
                 "userAvatar":"Koala.jpg",
                 "github_user": $scope.github_user,
                 "github_repo": $scope.github_repo,
                 "github_token" : $scope.github_token
               }
               $scope.socket.emit('message',$scope.newMessageObject);
               //alert($scope.github_user+"+"+$scope.github_repo+"+"+$scope.github_token)
          };
        $scope.$on('msgChannelId',function(event,data){
            $scope.messages=[];
            $scope.glued=true;
            channel.getMessages().success(function(messages) {
            for(var i=0;i<messages.length;i++){
               if(messages[i].channelId==data.channelId) {
                $scope.chId=data.channelId;
                $scope.messages.push(messages[i]);
               }
              }
            });
            channelNameForList.getchName(data.projectId).success(function (projects) {

              for(var i=0;i<projects.channels.length;i++){
                if(projects.channels[i].channelId==data.channelId) {
                  console.log(data.channelId);
                $scope.ch=projects.channels[i].channelName;
                }
              }
            })

          projects123.getNames(data.projectId).success(function(projects){

            // for(var i=0;i<projects.channels.length;i++){
              // if(projects.channels[i].channelId==data.channelId) {
                   $scope.github_user = projects.gitUserName;
                   $scope.github_token = projects.accessToken;
                   $scope.github_repo = projects.gitRepoName;
                   alert(projects);
                  // alert(projects.gitUserName+""+projects.accessToken+""+projects.gitRepoName);
                //  }
              //  }
          })

        });
        $scope.socket.on('message', function(message) {
          console.log('recieved message',message);
          $scope.messages.push(message);
          $scope.$apply();
        });


      //adding users**********
      $scope.addPeople=function (ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
             controller: addUsersControl,
             templateUrl: 'directives/channel/addpeople.tmpl.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: useFullScreen
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          },
          function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
      };
      function addUsersControl($scope, $mdDialog, $mdMedia, project) {
        $scope.final_arr = [];
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      };

     };
