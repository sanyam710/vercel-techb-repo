angular.module("TechBistro").controller("OrderHistoryCtrl", ["$scope", "$routeParams", "AuthService", "RestaurantService", function ($scope, $routeParams, AuthService, RestaurantService) {
    $scope.tableHistory = {
        id: $routeParams.tableId,
        list: [],
        dto: {},
        search:'',
        listOfRecipes:[],
        showQty:false,
        loader: true,
        order_details:[],
        orderList:[],
        order:[],
        showMenuActive:false,
        init: function () {
            this.loader = true;
            RestaurantService.orders.getTableCompletedOrder(this.id, (error, data) => {
                if (error) {
                    return;
                }
                this.list = data;
                    this.loader = false;
            })
        },
        getOrderDetails: function (order) {
            utility.ObjectUtility.setDto(order);
            if (order['dto']['isActive']) {
                order['dto']['isActive'] = false;
                return;
            }
            order['dto']['isActive'] = false;
            
            // if (order['subOrders']) {
            //     order['dto']['isActive'] = true;
            //     return;
            // }
            for(let i=0; i<=this.list.length; i++) {
                if (this.list[i]?.dto?.isActive)
                {
                    if (this.list[i].dto['isActive'] == true) {
                        this.list[i].dto['isActive'] = false;
                    }
                }
            
            }
            order['dto']['loader'] = true;
            RestaurantService.orders.getOrderDetails(order.id, (error, data) => {
                if (error) {
                    return
                }
                if (order['subOrders'] === undefined) {
                    order['subOrders'] = [];
                }
                order['dto']['isActive'] = true;
                order['subOrders'] = data;
                order['dto']['loader'] = false;
            })
        },
        getDetails: function(id){
            this.loader = true;

            RestaurantService.orders.getCollectiveDetails(id, (error, data) => {
                if (error) {
                    return;
                }
                this.loader = false;
                $scope.popOver.show('invoice', data);
            })
        },
    },

    $scope.pageView.init(() => {
        $scope.tableHistory.init();
    })
}])
