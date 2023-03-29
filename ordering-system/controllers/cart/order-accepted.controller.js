angular.module("OrderingSystemApp").controller("OrderAcceptedCtrl", ["$scope", "AuthService", "OrdersService" , "$location", function ($scope, AuthService, OrdersService,$location) {

    $scope.backToHomeScreen = function () {
        $location.path(`${AuthService.details.menuKey}`);
    }
}])