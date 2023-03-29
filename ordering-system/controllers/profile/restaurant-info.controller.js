angular.module("OrderingSystemApp").controller("RestaurantInfoCtrl", ["$scope", "AuthService", "OrdersService", function ($scope, AuthService, OrdersService) {

    $scope.restaurantInfo = {
        info: {},
        init: function () {
            this.info = AuthService.details;
            let categoriesList = [];
            let index = 0;
            for (let cat of this.info.categoriesList) {
                if (index === THEME_COLOR_LIST.length) {
                    index = 0;
                }
                categoriesList.push({
                    name: cat,
                    colourCode: THEME_COLOR_LIST[index]
                })
                index++;
            }
            this.info.categoriesList = categoriesList;
        },
        getLightColor: function (colorCode) {
            return utility.lib.getLightColor(colorCode);
        },
        goBackToHome: function () {
            $scope.goTo(`${AuthService.details.menuKey}`)
        }
    }

    $scope.pageInit.init(() => {
        $scope.restaurantInfo.init();
    })
}])