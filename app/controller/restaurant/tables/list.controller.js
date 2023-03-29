angular.module("TechBistro").controller("TableListCtrl", ["$scope", "AuthService", "RestaurantService","$interval", function ($scope, AuthService, RestaurantService,$interval) {

    $scope.tables = {
        list: [],
        search: "",
        dto: {},
        refresh:false,
        status:[],
        loadedBackOnTime:null,
        init: function () {
            this.loader = true;
            this.list = $scope.pageView.userDetails.user_tables;
            this.getStatus();
            this.loadedBack = 'Just now';
            $interval(function () {
                if(this.loadedBackOnTime){
                    this.loadedBack = this.loadedBackOnTime.fromNow();
                }
            }.bind(this),60);
           
        },
        tableOrders: function (table) {
            
            if ($scope.nav.selected == 'order-history')
            {
                $scope.goTo(`table-history/${table.id}`)
            }
            else {
                $scope.goTo(`/table-orders/${table.id}`)
            }
        },
        getStatus: function(){
            this.refresh = true;
            RestaurantService.recipe.getTableStatus( (error, data) => {
                if (error) {
                    return;
                }
                this.status = data;
                this.loadedBackOnTime = moment();
                this.loadedBack = 'Just now';
                for (let i=0; i<this.list.length; i++) {
                    if (this.list[i].id == this.status[i].id)
                    {   
                        this.list[i].status = this.status[i];
                    }
                }
                this.refresh = false;
            })
        }
    }
    $interval(function(){
        $scope.tables.getStatus();
    },30000)
    // 30 Secound to refresh apis of status in ms

    $scope.pageView.init(() => {
        $scope.tables.init();
    })
}])
