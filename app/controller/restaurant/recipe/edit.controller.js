angular.module("TechBistro").controller("RecipeEditCtrl", ["$scope", "$routeParams", "RestaurantService", "AuthService", function ($scope, $routeParams, RestaurantService, AuthService) {

    $scope.recipe = {
        id: $routeParams.recipeId,
        info: {
            ingredients: [],
            foodItemChild:[]
        },
        loader: true,
        listOfMasterChild:[],
        dto: {},
        init: function () {
            this.listOfMasterChild = $scope.pageView.userDetails.children;
            RestaurantService.recipe.getRecipeById(this.id, AuthService.details.restaurantId, (error, data) => {
                if (error) {
                    return
                }

                this.info = data;
                this.info.expiry_date = utility.DateUtility.toDate(this.info.expiry_date);
                this.info.allergy_ids_arr = this.info.allergy_ids ? this.info.allergy_ids.split("@") : [];
                this.info['dto'] = {catMap: {}};
                for (let cat of data.categories) {
                    this.info['dto']['catMap'][cat.id] = cat;
                }

                this.loader = false;
            })
        },
        toggleAllergy: function (allergy) {
            this.info.allergy_ids_arr = utility.ArrayUtility.toggleElement(this.info.allergy_ids_arr, allergy.id + '');
        },
        toggleMeal: function (meal) {
            this.info.meal_type_ids = utility.ArrayUtility.toggleElement(this.info.meal_type_ids, meal.id + '');
        },
        saveAlias: function () {
            this.dto["aliasBtnLoader"] = true;
            RestaurantService.recipe.saveAliasInfo(AuthService.details.restaurantId, this.id, this.info.food_item_aliases, (error, data) => {
                if (error) {
                    return
                }
                this.dto["aliasBtnLoader"] = false;
                $scope.toast.show("Saved alias information!", "success");
            })
        },
        saveFoodInformation: function () {
            if (this.info.recipe_type == null)
            {
                $scope.toast.show("Please Select Type of Food..","error");
                return;
            }
            if (this.dto.recipeInfoForm.$valid) {
                this.dto['foodInformationBtnLoader'] = true;
                this.info.allergy_ids = this.info.allergy_ids_arr.join("@");
                RestaurantService.recipe.updateFoodItem(this.info, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.dto['foodInformationBtnLoader'] = false;

                    $scope.toast.show("Updated food information!", "success");
                })
            }
        }
    }

    $scope.ingredients = {
        search: "",
        selected: {},
        list: [],
        dto: {},
        reset: function () {
            this.dto = {};
            this.selected = {};
            this.search = "";
        },
        onChange: function () {
            if (!this.search) {
                return;
            }

            RestaurantService.recipe.searchIngredient(this.search, (error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
            })
        },
        onSelect: function (ingredient) {
            this.list = [];
            this.search = ingredient.name;
            this.dto['viewMode'] = 'addNew';
            this.selected = ingredient;
        },
        setServing: function (serving) {
            this.selected.serving_unit = serving;
        },
        onRemove: function (index) {
            this.list.splice(index, 1);
        },
        saveIngredientToRecipe: function () {
            if (this.isValid()) {
                this.dto.btnLoader = true;
                RestaurantService.recipe.saveIngredientToRecipe(
                    $scope.recipe.id, this.selected.id,
                    this.selected.name, this.selected.serving_unit,
                    this.selected.quantity,
                    (error, data) => {
                        if (error) {
                            return;
                        }

                        $scope.recipe.info.ingredients.push(data);
                        $scope.toast.show("Added New Ingredient", "success");
                        this.reset();
                    }
                )
            }
        },
        onEdit: function (toBeEdited, index) {
            const _toBeEdited = utility.ObjectUtility.clone(toBeEdited);
            RestaurantService.recipe.getIngredientsMetaInformation(_toBeEdited.ingredient_id, _toBeEdited.serving_unit, _toBeEdited.quantity, (error, data) => {
                if (error) {
                    return;
                }

                this.selected = _toBeEdited;
                this.selected["possibleUnits"] = data.possibleUnits;
            })
            this.search = _toBeEdited.ingredient_name;
            this.dto['viewMode'] = 'edit';
            this.dto['toBeEditIndex'] = index;
        },
        updateIngredientToRecipe: function () {
            if (this.isValid()) {
                this.dto.btnLoader = true;
                RestaurantService.recipe.editIngredientToRecipe(
                    this.selected.id,
                    $scope.recipe.id, this.selected.ingredient_id,
                    this.selected.ingredient_name, this.selected.serving_unit,
                    this.selected.quantity,
                    (error, data) => {
                        if (error) {
                            return;
                        }

                        $scope.recipe.info.ingredients[this.dto['toBeEditIndex']] = data;
                        $scope.toast.show("Updated ingredient entry! ", "success");
                        this.reset();
                    }
                )
            }
        },
        delete: function () {
            this.dto.btnLoader = true;
            RestaurantService.recipe.deleteIngredientToRecipe($scope.popOver.data.id, (error, data) => {
                if (error) {
                    return;
                }
                $scope.toast.show("Deleted ingredient entry! ", "success");
                let index = $scope.recipe.info.ingredients.findIndex(x => x.id === $scope.popOver.data.id);
                if (index != -1) {
                    $scope.recipe.info.ingredients.splice(index, 1);
                }
                this.dto.btnLoader = false;
                $scope.popOver.hide();
            })
        },
        isValid: function () {
            if (!this.selected) {
                $scope.toast.show("Ingredient Missing", "error");
                return false;
            }
            if (!this.selected.quantity) {
                $scope.toast.show("Quantity Missing", "error");
                return false;
            }
            if (!this.selected.serving_unit) {
                $scope.toast.show("Serving Missing", "error");
                return false;
            }
            return true;
        }
    }

    $scope.foodItemChild = {
        search: "",
        selected: {
            foodItem_id:''
        },
        showMenuActive:false,
        list: [],
        dto: {},
        reset: function () {
            this.dto = {};
            this.selected = {};
            this.search = "";
            this.selected.price = null;
        },
        showMenu:function(){
            this.showMenuActive = true;
        },
        onChange: function () {
            if (!this.search) {
                return;
            }

            RestaurantService.recipe.searchIngredient(this.search, (error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
            })
        },
        onSelect: function (masterchild) {
            this.list = [];
            this.search = masterchild.name;
            this.dto['viewMode'] = 'addNew';
            this.showMenuActive = false;
            this.selected = masterchild;
        },
        setServing: function (serving) {
            this.selected.serving_unit = serving;
        },
        onRemove: function (index) {
            this.list.splice(index, 1);
        },
        saveFoodItemChild: function () {
            if (this.isValid()) {
                this.dto.btnLoader = true;
                RestaurantService.foodItem.saveFoodItemChild(this.selected.price,this.selected.id,$scope.recipe.id, (error, data) => {
                        if (error) {
                            return;
                        }
                        this.dto.btnLoader = false;
                        $scope.recipe.info.children.push(data);
                        $scope.toast.show("Added New Food Item Child", "success");
                        this.reset();
                    }
                )
            }
        },
        onEdit: function (toBeEdited, index) {
            const _toBeEdited = utility.ObjectUtility.clone(toBeEdited);
            this.search = _toBeEdited.child_name;
            this.selected.foodItem_id = _toBeEdited.id;
            this.selected.price = _toBeEdited.child_price;
            this.selected.id = _toBeEdited.child_id;
            this.dto['viewMode'] = 'edit';
            this.showMenuActive = false;
            this.dto['toBeEditIndex'] = index;
        },
        updateFoodItem: function () {
            if (this.isValid()) {
                this.dto.btnLoader = true;
                RestaurantService.foodItem.updateFoodItemChild(this.selected.price,this.selected.id,$scope.recipe.id,this.selected.foodItem_id, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.dto.btnLoader = false;
                    // $scope.recipe.info.children.push(data);
                    $scope.recipe.info.children[this.dto['toBeEditIndex']] = data;
                    $scope.toast.show("Updated Food Item Child...! ", "success");

                    this.reset();
                }
                )
            }
        },
        delete: function () {
            this.dto.btnLoader = true;
            RestaurantService.foodItem.removeFoodItemChild($scope.popOver.data.id, (error, data) => {
                if (error) {
                    return;
                }
                $scope.toast.show("Deleted ingredient entry! ", "success");
                let index = $scope.recipe.info.children.findIndex(x => x.id === $scope.popOver.data.id);
                if (index != -1) {
                    $scope.recipe.info.children.splice(index, 1);
                }
                this.dto.btnLoader = false;
                $scope.popOver.hide();
            })
        },
        isValid: function () {
            if (!this.selected) {
                $scope.toast.show("Ingredient Missing", "error");
                return false;
            }
            if (!this.selected.price) {
                $scope.toast.show("Price Missing", "error");
                return false;
            }
            return true;
        }
    }


    $scope.images = {
        dto: {},
        model: null,
        reset: function () {
            this.dto = {};
            this.model = null;
        },
        openImagePicker: function () {
            document.getElementById("recipeImage").click();
            document.getElementById("recipeImage").addEventListener("change", (file) => {
                $scope.images.model = file.target.files[0];
                $scope.$digest();
            });
        },
        upload: function () {
            this.dto['btnLoader'] = true;
            FirebaseModule.uploadImage(this.model, (error, data) => {
                if (error) {
                    return;
                }
                RestaurantService.images.uploadImage(ENTITY_IMAGE_RECIPE, $scope.recipe.id, data, (error, data) => {
                    if (error) {
                        return;
                    }
                    if ($scope.recipe.info.recipe_images === undefined) {
                        $scope.recipe.info.recipe_images = [];
                    }
                    $scope.recipe.info.recipe_images.push(data);
                    $scope.toast.show("Image added!", "success");
                    this.reset();
                })
            })
        },
        open: function (image) {
            window.open(image.url, "_blank");
        },
        delete: function () {
            this.dto["imageDeleteLoader"] = true;
            RestaurantService.images.removeImage($scope.popOver.data.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Image removed!", "success");
                utility.ArrayUtility.splice($scope.recipe.info.recipe_images, $scope.popOver.data);
                this.reset();
                $scope.popOver.hide();
            })
        }
    }

    $scope.pageView.init(() => {
        $scope.recipe.init();
    })
}])
