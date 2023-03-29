angular.module("TechBistro").controller("RestaurantDashboardCtrl", ["$scope", "RestaurantService", "AuthService", "$timeout", function ($scope, RestaurantService, AuthService, $timeout) {

    $scope.dashboard = {
        restaurantId: AuthService.details ? AuthService.details.restaurantId : null,
        categoryList: [],
        pageLoader: true,
        init: function () {
            RestaurantService.dashboard.getAllCategories(this.restaurantId, (error, data) => {
                if (error) {
                    return
                }
                this.categoryList = data;
                let index = 0;
                for (let cat of this.categoryList) {
                    cat['dto'] = {};
                    cat['colourCode'] = THEME_COLOR_LIST[index];
                    index++;
                    if (index === THEME_COLOR_LIST.length) {
                        index = 0;
                    }
                }
                this.pageLoader = false;
            })
        },
        getLightColor: function (colorCode) {
            return utility.lib.getLightColor(colorCode);
        }
    }

    $scope.category = {
        recipeMap: {},
        openedMenu: null,
        dto: {},
        handlePopOver: function (name, data) {
            $scope.popOver.show(name, data);
        },
        openMenuFor: function (category) {
            if (!this.openedMenu || (this.openedMenu && this.openedMenu !== category.id)) {
                this.openedMenu = category.id;
                this.current = category;
            } else {
                this.openedMenu = null;
                this.reset(category);
            }
        },
        add: function (cat, viewMode) {
            cat.dto.addingFor = viewMode;
            this.getRecipesByCategory(cat);
        },
        edit: function (cat) {
            cat.dto.isOpened = !cat.dto.isOpened;
            if (cat.dto.isOpened) {
                this.getRecipesByCategory(cat);
            }
        },
        reset: function (cat) {
            cat.dto = {};
            this.openedMenu = null;
            this.dto = {};
        },
        getRecipesByCategory: function (cat) {
            if (cat.dto.recipes == undefined) {
                cat.dto['retLoader'] = true;
                RestaurantService.dashboard.getRecipesByCategory(cat.id, $scope.dashboard.restaurantId, (error, data) => {
                    if (error) {
                        return
                    }

                    cat.dto.recipes = data;
                    cat.dto['retLoader'] = false;
                })
            }
        },
        updateName: function () {
            this.dto['catUpdateLoader'] = true;
            RestaurantService.dashboard.alterCategory($scope.dashboard.restaurantId, $scope.popOver.data.id, $scope.popOver.data.name, (error, data) => {
                if (error) {
                    return
                }

                $scope.popOver.hide();
                $scope.toast.show("Category Name updated successfully", "success");
                this.dto['catUpdateLoader'] = false;
                this.reset({});
                $scope.dashboard.init();
            })
        },
        saveNewCategory: function () {
            if (!this.dto.newCategoryName) {
                $scope.toast.show("Add category name", "error");
                return;
            }
            RestaurantService.dashboard.alterCategory($scope.dashboard.restaurantId, null, this.dto.newCategoryName, (error, data) => {
                if (error) {
                    return
                }

                this.dto = {};
                $scope.toast.show("Added new Category", "success");
                $scope.dashboard.init();
            })
        },
        saveNewRecipes: function (cat) {
            if (cat.dto['addLoader']) {
                return;
            }

            if (cat.dto.addingFor === 'single') {
                if (!cat.dto['name']) {
                    $scope.toast.show("Enter name", "error");
                    return;
                }
                cat.dto['addLoader'] = true;
                RestaurantService.dashboard.createFoodItem(cat.id, cat.dto['name'], $scope.dashboard.restaurantId, (error, data) => {
                    if (error) {
                        return
                    }
                    this.reset(cat);
                    cat.dto['addLoader'] = false;
                    $scope.toast.show("Added new  recipe", "success");
                })
            } else if (cat.dto.addingFor === 'bulk') {
                if (!cat.dto['bulk']) {
                    $scope.toast.show("Enter comma separated name", "error");
                    return;
                }
                cat.dto['addLoader'] = true;
                RestaurantService.dashboard.createFoodItemInBulk(cat.id, cat.dto['bulk'].split("\n"), $scope.dashboard.restaurantId, (error, data) => {
                    if (error) {
                        return
                    }
                    this.reset(cat);
                    $scope.toast.show("Added new  recipe", "success");
                    cat.dto['addLoader'] = false;
                })
            }
        },
        delete: function () {
            if (this.dto['deleteLoader']) {
                return
            }
            this.dto['deleteLoader'] = true;
            RestaurantService.dashboard.deleteCategory($scope.dashboard.restaurantId, $scope.popOver.data.categoryId, (error, data) => {
                if (error) {
                    return
                }
                this.reset($scope.popOver.data.cat);
                $scope.toast.show("Category has been deleted!", "success");
                $scope.popOver.hide();
                $scope.dashboard.init();
            })
        },
        draggedElm: {},
        onDragElement: function (element) {
            this.draggedElm = element;
        },
        onDropCallback: function (index, item, external, type, list) {
            $timeout(() => {
                var currentIndex = list.indexOf(this.draggedElm);
                list.splice(currentIndex, 1);
                if (currentIndex < index) {
                    list.splice(index - 1, 0, this.draggedElm);
                } else {
                    list.splice(index, 0, this.draggedElm);
                }
                RestaurantService.dashboard.updateOrderForRecipe($scope.dashboard.restaurantId, list, (error, data) => {
                    if (error) {
                        return;
                    }
                    $scope.toast.show("Updated Order for recipes!", "success");
                })
                $scope.$digest();
            }, 50)
        }
    }

    $scope.recipe = {
        dto: {},
        reset: function () {
            this.dto = {};
        },
        edit: function (recipe) {
            $scope.goTo(`/recipe-edit/${recipe.id}`);
        },
        copy: function (rec, cat) {
            if (confirm("Do you want to copy the recipe?")) {
                RestaurantService.dashboard.copyRecipe($scope.dashboard.restaurantId, rec.id, (error, data) => {
                    if (error) {
                        return
                    }
                    $scope.toast.show("Recipe has been copied!", "success");
                    $scope.category.reset(cat);
                    this.reset();
                })
            }
        },
        delete: function () {
            if (this.dto['deleteLoader']) {
                return
            }
            this.dto['deleteLoader'] = true;
            RestaurantService.dashboard.removeFoodItem($scope.dashboard.restaurantId, $scope.popOver.data.recipeId, (error, data) => {
                if (error) {
                    return
                }
                $scope.toast.show("Recipe has been deleted!", "success");
                $scope.category.reset($scope.popOver.data.cat);
                $scope.popOver.hide();
                this.reset();
            })
        },
        getVegNonVeg: function (recipe) {
            if (recipe.recipe_type === 1) {
                return "veg";
            } else if (recipe.recipe_type === 2) {
                return "non-veg";
            }
            return "default";
        }
    }

    $scope.exportRecipes = {
        dto: {},
        language: null,
        languageList: {},
        init: function () {
            this.languageList = utility.ObjectUtility.clone(AuthService.userDetails.user_languages);


            if (this.languageList.length === 1) {
                this.language = this.languageList[0];
            }

        },
        export: function () {
            let url = `${BASE_URL}/restaurant/export_recipes.csv?api_key=${AuthService.details.apiKey}&restaurant_id=${AuthService.details.restaurantId}`;

            if (this.language) {
                url = url + `&language_id=${this.language.id}`;
            }
            window.open(url, '_blank');
        }
    }

    $scope.pageView.init(() => {
        $scope.dashboard.init();
    })
}])
