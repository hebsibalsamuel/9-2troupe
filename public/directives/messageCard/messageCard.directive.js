angular.module('troupe')
  .directive('messageCard', function($document) {
    return {
      templateUrl: 'directives/messageCard/messageCard.tmpl.html',
      controller: 'messageCardCtrl',
      scope: {
        message: '='
      },
      link: function (scope,element) {
        //console.log("element is "+document.getElementById('msg'));
        //var el=document.getElementById('msg');
        //var el=angular.element('msg');
        var el1 = $document[0].getElementById('msg')
        var rawE = angular.element(el1);
        var raw = rawE[0];
        // el.scrollTop=el.scrollHeight;
        rawE.bind('scroll', function () {
            console.log('in scroll');
            console.log(raw.scrollTop);
            console.log(raw.scrollHeight);
            if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                console.log("I am at the bottom");
                scope.$apply(attrs.scrolly);
            }
        });
        //console.log("value of el is "+raw);
        //console.log(raw.scrollHeight);
        //console.log(raw.offsetHeight);
        //console.log(raw.scrollTop);
    }
    }
  })
