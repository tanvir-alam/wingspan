angular.module('wingspan', []).
controller('MainCtrl', function($rootScope, $scope, $http) {
    var cityPairs;
    var originList = [];
    
    // get all the Origin Locations
    $http.get('/v1/lists/supported/shop/flights/origins-destinations').success(function(data) {
        cityPairs = (JSON.parse(data.info)).OriginDestinationLocations;
        for (var i = 0; i < cityPairs.length; i++) {
            if (originList.indexOf(cityPairs[i].OriginLocation) < 0) {
                originList.push(cityPairs[i].OriginLocation);
                console.log(originList[i]);
            }
        }
    }).error(function(err) {
        $scope.error = err;
    });
    
    $scope.suggestions = [];
    $scope.selectedIndex = -1;
    
    $scope.search = function() {
        $scope.suggestions = [];
        var maxListLength = 5;
        for(var i = 0; i < originList.length; i++) {
            var cityName = angular.lowercase(originList[i].CityName);
            var airportCode = angular.lowercase(originList[i].AirportCode);
            var searchText = angular.lowercase($scope.searchText);
            if (cityName.indexOf(searchText) === 0 || airportCode.indexOf(searchText) === 0) {
                $scope.suggestions.push(originList[i].CityName + ' (' + originList[i].AirportCode +')');
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