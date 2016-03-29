angular.module('wingspan', []).
controller('MainCtrl', function($rootScope, $scope, $http) {
    
    // Get the cities data that I can show in the drop-down
    $http.get('/api/v1/cities').success(function(data) {
        $scope.cities = (JSON.parse(data.info)).Cities;
        console.log($scope.cities);
    }).error(function(err) {
        $scope.error = err;
    });
    
    $scope.suggestions = [];
    $scope.selectedIndex = -1;
    
    $scope.search = function() {
        $scope.suggestions = [];
        var maxListLength = 5;
        for(var i = 0; i < $scope.cities.length; i++) {
            var cityName = angular.lowercase($scope.cities[i].name);
            var cityCode = angular.lowercase($scope.cities[i].code);
            var searchText = angular.lowercase($scope.searchText);
            if (cityName.indexOf(searchText) === 0 || cityCode.indexOf(searchText) === 0) {
                $scope.suggestions.push($scope.cities[i].name + ' (' + $scope.cities[i].code +')');
                maxListLength--;
                if (maxListLength <= 0) {
                    break;
                }
            }
        }
    }
    
    $scope.keyDown = function(event) {
        if (event.keyCode === 13) {
            $scope.suggestions = [];
            $scope.searchText = $scope.suggestions[$scope.selectedIndex];
        }
    }
    
    $scope.keyUp = function(event) {
        if (event.keyCode !== 8 || event.keyCode !== 46) {
            if ($scope.searchText === "") {
                $scope.suggestions = [];
            }
        }
    }
    
    $scope.selectCity = function(index) {
        $scope.searchText = $scope.suggestions[index];
        $scope.suggestions = [];
    }
});