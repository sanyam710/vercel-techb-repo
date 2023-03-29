angular.module("TechBistro").controller("OldOrderListCtrl", ["$scope", "AuthService", "RestaurantService", function ($scope, AuthService, RestaurantService) {

    $scope.orders = {
        list: [],
        search: "",
        dto: {},
        loader: true,
        init: function () {
            this.loader = false;
            RestaurantService.orders.getOrders(AuthService.details.restaurantId, (error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
                this.loader = false;
            })
        },
        edit: function (order) {
            $scope.goTo(`/orders/${order.id}`)
        }
    }

    $scope.filter = {
        entity: {
            status: null,
        },
        shouldDisplay: function (order) {
            if(this.entity.status != null && order.status_id !== this.entity.status){
                return false;
            }
            return true;
        }
    }

    $scope.pageView.init(() => {
        $scope.orders.init();
    })
}])
