var mApp = angular.module('mApp', []); 
mApp.controller('ctrller', ['$scope', '$http', function($scope, $http) { 
    $http.get('reading/count').success(function(response){
        $scope.count = response;
    });
}]); 