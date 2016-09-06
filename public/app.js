angular.module('troupe',['ngMaterial','ui.router','luegg.directives','ngAnimate','ngDraggable'])
  .run(function($rootScope,$http,$location) {
    // to support multiple users only for demo purpose
    $rootScope.snippethighlight="";
    $rootScope.msg=[];
    var username = $location.$$absUrl.split('=')[1];
    username = username.substring(0,username.length-2);
    $http.get('http://localhost:3000/users?username='+username).success(function(user) {
      $rootScope.tiles = user[0].tile;
      // console.log(  $rootScope.tiles);
      $rootScope.userName = user[0].username;
    });
  })
 .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
                .state('/', {
                     url: '/',
                     templateUrl: 'views/main.tmpl.html'
                 })
                 .state('editProfile', {
                    url: '/editProfile',
                   templateUrl: 'directives/navbar/editProfile/editProfile.tmpl.html'
                 })
                 .state('editProfile.viewProfile', {
                   url: '/viewProfile',
                   templateUrl: 'directives/navbar/editProfile/viewProfile.tmpl.html'
                 })
                 .state('editProfile.projectManage', {
                   url: '/projectManage',
                   templateUrl: 'directives/navbar/editProfile/projectManage.tmpl.html'
                 })
                 .state('editProfile.privacy', {
                   url: '/privacy',
                   templateUrl: 'directives/navbar/editProfile/privacy.tmpl.html'
                 });

         });
