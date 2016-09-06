angular.module('troupe')
  .service('project', function($http) {
    this.getProjects = function() {
      return $http.get('http://localhost:3000/projects');
    }
    this.getSpecProjects = function(id) {
      return $http.get('http://localhost:3000/projects/'+id);
    }
    this.postProjects = function(str) {
      return $http.post('http://localhost:3000/projects',str);
    }

    this.patchSpecProjects = function(id,str) {
      return $http.patch('http://localhost:3000/projects/'+id,str);
    }
  });
