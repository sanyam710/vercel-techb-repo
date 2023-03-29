angular.module("TechBistro").controller("LanguagesCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.languages = {
        list: [],
        selected: {dto: {}},
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        init: function () {
            AdminService.languages.retrieveLanguages((error, data) => {
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
            AdminService.languages.alterLanguage($scope.popOver.data.id, $scope.popOver.data.name, $scope.popOver.data.status_id, (error, data) => {
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
        $scope.languages.init();
    })
}])
