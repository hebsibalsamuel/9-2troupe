angular.module('troupe')
.directive("sideNav",function(){
  return {
    templateUrl: "directives/sideNav/sideNav.tmpl.html",
    controller: "sideNavCtrl"
  }
});
