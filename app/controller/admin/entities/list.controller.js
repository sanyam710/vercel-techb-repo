angular.module("TechBistro").controller("EntitiesCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.entities = {
        list: [],
        selected: {dto: {}},
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        init: function () {
            AdminService.entities.retrieveEntities((error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
                this.pageLoader = false;
            })
        },
        save: function () {
            this.btnLoader = true;
            delete $scope.popOver.data.dto;
            AdminService.entities.alterEntity($scope.popOver.data.id, $scope.popOver.data.name, $scope.popOver.data.status_id, (error, data) => {
                if (error) {
                    return;
                }
                this.btnLoader = false;
                this.init();
                $scope.popOver.hide();
            })
        }
    }

    $scope.pageView.init(() => {
        $scope.entities.init();
    })
}])
