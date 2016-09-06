angular.module('troupe')
  .service('navbarNewTile', function($http) {
    this.newTile = function()
    {
      return $http.get('http://localhost:3000/tiles');
    }
    this.newChannelDrop = function()
    {
      return $http.get('http://localhost:3000/channelsdrop');
    }
    // this.newTilePosting = function(h)
    // {
    //   return $http.patch('http://localhost:3000/tiles',h);
    // }

  });
