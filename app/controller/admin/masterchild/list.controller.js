angular.module("TechBistro").controller("MasterchildCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.masterchild = {
        list: [],
        selected: { dto: {} },
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        init: function () {
            AdminService.masterChild.getMasterChild((error, data) => {
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
            AdminService.masterChild.addMasterChild($scope.popOver.data.id,$scope.popOver.data.name, $scope.popOver.data.status_id, (error, data) => {
                if (error) {
                    return;
                }
                this.btnLoader = false;
                this.init();
                $scope.popOver.hide();
            })
        },
        removeMasterChild: function(id) {
            this.btnLoader = true;
            AdminService.masterChild.removeMaterChild(id, (error, data) => {
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
        $scope.masterchild.init();
    })
}])
