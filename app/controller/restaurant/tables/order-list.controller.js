angular.module("TechBistro").controller("OrdersListCtrl", ["$scope", "RestaurantService", "AuthService", function ($scope, RestaurantService, AuthService) {
    $scope.tables = {
        list: [],
        search: "",
        dto: {},
        init: function () {
            this.loader = true;
            this.list = $scope.pageView.userDetails.user_tables;
        },
        tableOrders: function (table) {
            $scope.goTo(`/table-history/${table.id}`)
        }
    }

    $scope.pageView.init(() => {
        $scope.tables.init();
    })
}])