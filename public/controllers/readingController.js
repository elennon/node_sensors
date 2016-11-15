var mApp = angular.module('mApp', []); 
mApp.controller('ctrller', ['$scope', '$http', function($scope, $http) { 
    $http.get('reading/getCount').success(function(response){
        $scope.people = response;
    });
    
}]); 