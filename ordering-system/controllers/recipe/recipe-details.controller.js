angular.module("OrderingSystemApp").controller("RecipeDetailsCtrl", ["$scope", "AuthService", "OrdersService", function ($scope, AuthService, OrdersService) {

    $scope.recipeDetails = {
        details: {},
        dto: {},
        cartItemsMap: [],
        currency: AuthService.details ? AuthService.details.currency : "",
        init: function () {
            this.details = utility.localStorage.get(RECIPE_INFO);
            let names = [];
            if (this.details.ingredients) {
                for (let ing of this.details.ingredients) {
                    names.push(ing.ingredient_name);
                }
                this.details.ingredientsStr = names.join(", ");
            }

            if (this.details.nutrition_info) {
                let index = 0;
                for (let nut of this.details.nutrition_info) {
                    if (nut.amount > 0) {
                        nut['colourCode'] = THEME_COLOR_LIST[index];
                        index++;
                        if (index === THEME_COLOR_LIST.length) {
                            index = 0;
                        }
                    }
                }
            }
            this.cartItemsMap = cart.recipeMap;
        },
        alterCart: function (action) {
            cart.update(this.details, action);
            this.cartItemsMap = cart.recipeMap;
        },
        getVegNonVeg: function () {
            if (this.details.recipe_type === 1) {
                return "veg";
            } else if (this.details.recipe_type === 2) {
                return "nonVeg";
            }
            return "";
        },
        goBackToHome: function () {
            $scope.goTo(`${AuthService.details.menuKey}`)
        },
    }

    $scope.pageInit.init(() => {
        $scope.recipeDetails.init();
    })
}])