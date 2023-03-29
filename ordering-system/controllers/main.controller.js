angular.module("OrderingSystemApp").controller("MainCtrl", ["$scope", "AuthService", "OrdersService", "$routeParams", "$location", function ($scope, AuthService, OrdersService, $routeParams, $location) {

    $scope.domObj = {
        AuthService: AuthService
    }

    $scope.pageInit = {
        initialized: false,
        init: function (callback) {
            if (!this.initialized) {
                if ($routeParams.menuKey ) {
                    const data = {
                        menuKey: $routeParams.menuKey,
                        entity: $routeParams.entity
                    }
                    AuthService.saveUserDetails(data);
                }
                this.initialized = true;
            }
            callback();
        }
    }

    $scope.goTo = function (url, params = null) {
        $location.path(url);
    }
}])