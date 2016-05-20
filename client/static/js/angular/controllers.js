var API_HOSTNAME = 'http://localhost:4000/v1';

tindrectoryApp

  .controller('UserSearchController', function($scope, $http) {
    var options = {};

    $scope.onSearchQueryChange = function() {
      var path = API_HOSTNAME + '/search/users/' + $scope.q;

      $http({
        method: 'GET',
        url: path
      }).then(function successCallback(results) {
        $scope.results = results.data.response;
      }, function errorCallback(response) {

      });

    }
  })
;