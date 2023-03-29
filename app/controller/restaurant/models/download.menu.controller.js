angular.module("TechBistro").controller("downloadMenuCtrl", ["$scope", "RestaurantService", "AuthService", function ($scope, RestaurantService, AuthService) {

    $scope.downloadMenu = {
        cdate : new Date(),
        dto: {selectedIds: [], btnLoader: false},
        currentDisplay: "selection",
        menuDetails: [],
        languageList: [],
        language: null,
        init: function () {
            this.languageList = utility.ObjectUtility.clone(AuthService.userDetails.user_languages);
            if (this.languageList.length === 1) {
                this.language = this.languageList[0];
            }
        },
        selectAll: function () {
            if (this.dto.selectedIds.length == $scope.dashboard.categoryList.length) {
                this.dto.selectedIds = [];
            } else {
                for (let cat of $scope.dashboard.categoryList) {
                    this.dto.selectedIds.push(cat.id);
                }
            }
        },
        alterCategory: function (cat) {
            this.dto.selectedIds = utility.ArrayUtility.toggleElement(this.dto.selectedIds, cat.id);
        },
        print: function () {
            utility.dom.printDivision("printableWindow");
        },
        getMenu: function () {
            if (this.dto.btnLoader) {
                return;
            }
            if (!this.language) {
                $scope.toast.show("Select language", "error");
                return;
            }
            if (this.dto.selectedIds.length === 0) {
                $scope.toast.show("Select at least one category", "error");
                return;
                return;
            }
            this.dto.btnLoader = true;
            RestaurantService.dashboard.getMenu(AuthService.details.restaurantId, this.dto.selectedIds, this.language.id, AuthService.userDetails.menu_key, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                this.dto.btnLoader = false;
                this.currentDisplay = "recipes";
                this.menuDetails = data.categories;
                for (let cat of this.menuDetails) {
                    for (let recipe of cat.recipes) {
                        let names = [];
                        if (recipe.ingredients) {
                            for (let ing of recipe.ingredients) {
                                names.push(ing.ingredient_name);
                            }
                            recipe['ingredientsStr'] = names.join(", ");
                        }
                    }
                }
                console.log(this.menuDetails)
            })
        }
    }

    $scope.downloadMenu.init();
}])
