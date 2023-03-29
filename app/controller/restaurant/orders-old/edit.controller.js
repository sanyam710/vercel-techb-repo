angular.module("TechBistro").controller("OldOrderEditCtrl", ["$scope", "$routeParams", "AuthService", "RestaurantService", function ($scope, $routeParams, AuthService, RestaurantService) {

    $scope.order = {
        id: $routeParams.id,
        info: {},
        dto: {statusDd: false},
        loader: true,
        btnLoader: false,
        init: function () {
            RestaurantService.orders.getOrderDetails(AuthService.details.restaurantId, this.id, (error, data) => {
                if (error) {
                    return;
                }

                this.info = data;
                this.loader = false;
                let price = 0;
                for (let food of this.info.recipes) {
                    if (isNaN(food.price)) {
                        price += food.price;
                    }
                }
                this.info['totalPrice'] = price;
            })
        },
        update: function () {
            if (this.btnLoader) {
                return;
            }
            this.btnLoader = true;

            RestaurantService.orders.updateOrder(AuthService.details.restaurantId, this.id, this.info.status, (error, data) => {
                if (error) {
                    return;
                }

                this.btnLoader = false;
                $scope.toast.show("Order was updated", "success");
            })

        }
    }

    $scope.pageView.init(() => {
        $scope.order.init();
    })
}])
