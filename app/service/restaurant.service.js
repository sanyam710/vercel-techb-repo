angular.module("TechBistro").service("RestaurantService", ["$http", "AuthService", function ($http, AuthService) {
    let obj = {};

    obj.masters = {
        retrieveMasters: function (restaurantId, callback) {
            obj.postHttp("/user/get_master", {restaurant_id: restaurantId}, callback)
        }
    }

    obj.dashboard = {
        getAllCategories: function (restaurantId, callback) {
            obj.postHttp("/restaurant/get_all_categories", {restaurant_id: restaurantId}, callback)
        },
        getRecipesByCategory: function (id, restaurantId, callback) {
            obj.postHttp("/restaurant/get_recipes_by_category", {
                restaurant_id: restaurantId,
                id: id,
                ignoreLoadingBar: true
            }, callback)
        },
        updateOrderForRecipe: function (restaurantId, list, callback) {
            obj.postHttp("/restaurant/set_recipe_category", {restaurant_id: restaurantId, list: list}, callback)
        },
        deleteCategory: function (restaurantId, id, callback) {
            obj.postHttp("/restaurant/remove_category", {restaurant_id: restaurantId, id: id}, callback)
        },
        createFoodItem: function (categoryId, name, restaurantId, callback) {
            obj.postHttp("/restaurant/create_food_item", {
                restaurant_id: restaurantId,
                category_id: categoryId,
                name: name
            }, callback)
        },
        createFoodItemInBulk: function (categoryId, recipeNames, restaurantId, callback) {
            obj.postHttp("/restaurant/create_food_item_in_bulk", {
                restaurant_id: restaurantId,
                category_id: categoryId,
                recipe_names: recipeNames
            }, callback)
        },
        removeFoodItem: function (restaurantId, id, callback) {
            obj.postHttp("/restaurant/remove_food_item", {restaurant_id: restaurantId, id: id}, callback)
        },
        copyRecipe: function (restaurantId, id, callback) {
            obj.postHttp("/restaurant/copy_recipe", {restaurant_id: restaurantId, id: id}, callback)
        },
        alterCategory: function (restaurantId, id, name, callback) {
            obj.postHttp("/restaurant/add_or_update_category", {
                restaurant_id: restaurantId,
                id: id,
                name: name
            }, callback)
        },
        getQrCategories: function (restaurantId, callback) {
            obj.postHttp("/restaurant/get_qr_code_category", {restaurant_id: restaurantId}, callback)
        },
        updateCategories: function (restaurantId, categories, callback) {
            obj.postHttp("/restaurant/update_qr_code_category", {
                restaurant_id: restaurantId,
                qr_code_category: categories
            }, callback)
        },
        getMenu: function (restaurantId, categoryIds, languageId, menuKey, callback) {
            obj.postHttp("/restaurant_menu/get_menu_details", {
                restaurant_id: restaurantId,
                category_ids: categoryIds,
                language: languageId,
                menu_key: menuKey
            }, callback)
        },
        updateOrderForCategories: function (restaurantId, list, callback) {
            obj.postHttp("/restaurant/set_category_order", {restaurant_id: restaurantId, list: list}, callback)
        }
    }

    obj.recipe = {
        getRecipeById: function (id, restaurantId, callback) {
            obj.postHttp("/restaurant/get_food_item_details_by_id", {id: id, restaurant_id: restaurantId}, callback)
        },
        saveAliasInfo: function (restaurantId, id, foodItemAliases, callback) {
            obj.postHttp("/restaurant/update_food_item_aliases", {
                restaurant_id: restaurantId,
                food_item_id: id,
                food_item_aliases: foodItemAliases
            }, callback)
        },
        updateFoodItem: function (foodInfo, callback) {
            obj.postHttp("/restaurant/update_food_item", foodInfo, callback);
        },
        searchIngredient: function (query, callback) {
            obj.postHttp("/restaurant/search_ingredient", {query: query}, callback)
        },
        getIngredientsMetaInformation: function (ingredientId, servingUnit, quantity, callback) {
            obj.postHttp("/restaurant/get_ingredient_meta_information", {
                ingredient_id: ingredientId,
                serving_unit: servingUnit,
                quantity: quantity
            }, callback)
        },
        saveIngredientToRecipe: function (recipeId, ingredientId, ingredientName, servingUnit, quantity, callback) {
            obj.postHttp("/restaurant/add_ingredient_to_recipe", {
                recipe_id: recipeId,
                ingredient_id: ingredientId,
                ingredient_name: ingredientName,
                serving_unit: servingUnit,
                quantity: quantity
            }, callback)
        },
        editIngredientToRecipe: function (id, recipeId, ingredientId, ingredientName, servingUnit, quantity, callback) {
            obj.postHttp("/restaurant/edit_ingredient_in_recipe", {
                id: id,
                recipe_id: recipeId,
                ingredient_id: ingredientId,
                ingredient_name: ingredientName,
                serving_unit: servingUnit,
                quantity: quantity
            }, callback)
        },
        deleteIngredientToRecipe: function (id, callback) {
            obj.postHttp("/restaurant/remove_ingredient_from_recipe", {id: id}, callback)
        },
        getTableStatus: function (callback) {
            obj.postHttp("/restaurant/get_tables_status",{},callback)
        }
    }

    obj.images = {
        uploadImage: function (entityType, entityTypeId, url, callback) {
            obj.postHttp("/restaurant/store_image", {
                entity_type: entityType,
                entity_type_id: entityTypeId,
                url: url
            }, callback)
        },
        removeImage: function (imageId, callback) {
            obj.postHttp("/restaurant/remove_image", {id: imageId}, callback)
        },
    }

    obj.restaurantChild = {
        getRestaurantChild:function(restaurant_id,callback) {
            obj.postHttp("/restaurant/get_all_restaurant_children", {restaurant_id:restaurant_id},callback)
        },
        addRestaurantChild: function(id,name,statusId,restaurant_id,callback) {
            obj.postHttp("/restaurant/add_or_update_restaurant_child", {id: id,name: name,status_id: statusId,restaurant_id:restaurant_id},callback)
        },
        removeMaterChild:function(id,callback) {
            obj.postHttp("/restaurant/remove_master_child", {id: id},callback)

        }
    }

    obj.orders = {
        getOrders: function (restaurantId, callback) {
            obj.postHttp("/order/get_restaurant_orders", {restaurant_id: restaurantId}, callback)
        },
        addOrder:function(table_id,sub_order_id,instruction,table_order_id,order_details,customer_name,customer_email,customer_address,customer_mobile_no,callback) {
            obj.postHttp("/order/add_order", {
                table_id: table_id,
                sub_order_id:sub_order_id,
                instruction:instruction,
                table_order_id:table_order_id,
                order_details:order_details,
                customer_name:customer_name,
                customer_email:customer_email,
                customer_address:customer_address,
                customer_mobile_no:customer_mobile_no
            }, callback)
        },
        getOrderDetails: function (restaurantId, orderId, callback) {
            obj.postHttp("/order/get_order_details", {restaurant_id: restaurantId, id: orderId}, callback)
        },
        updateOrder: function (restaurantId, orderId, statusId, callback) {
            obj.postHttp("/order/update_order", {
                restaurant_id: restaurantId,
                id: orderId,
                status_id: statusId
            }, callback)
        },
        getTableCompletedOrder: function(tableId,callback){
            obj.postHttp("/order/get_table_orders", {table_id: tableId}, callback)
        },
        getTableOrder: function (tableId, callback) {
            obj.postHttp("/order/get_table_orders", {table_id: tableId}, callback);
        },
        getTableOngoingOrder: function (tableId, callback) {
            obj.postHttp("/order/get_table_ongoing_order", {table_id: tableId}, callback);
        },
        getOrderDetails: function (orderId, callback) {
            obj.postHttp("/order/get_order_details", {order_id: orderId}, callback);
        },
        updateSubOrder: function (subOrderId, statusId, callback) {
            obj.postHttp("/order/update_sub_order", {sub_order_id: subOrderId, status_id: statusId}, callback);
        },
        updateOrder: function (orderId, statusId, callback) {
            obj.postHttp("/order/update_order", {order_id: orderId, status_id: statusId}, callback);
        },
        deleteSubOrder:function(sub_order_id,callback) {
            obj.postHttp('/order/delete_sub_order',{sub_order_id:sub_order_id},callback);
        },
        getCollectiveDetails: function(id,callback){
            obj.postHttp('/order/get_order_collective_details',{order_id:id},callback);
        },
        
    }

    obj.profile = {
        getRestaurantLogo: function (restaurantId, callback) {
            obj.postHttp("/restaurant/get_restaurant_logo", {restaurant_id: restaurantId}, callback)
        },
        update: function (params, callback) {
            obj.postHttp("/user/update_user_profile", params, callback)
        },
        updatePassword: function (oldPassword, newPassword, retypedPassword, callback) {
            obj.postHttp("/user/update_password", {
                new_password: newPassword,
                old_password: oldPassword,
                retype_new_password: retypedPassword
            }, callback);
        },
        updateBrowserKey: function (restaurantId, browserKey, callback) {
            obj.postHttp("/restaurant/update_browser_key", {restaurant_id: restaurantId, browser_key: browserKey}, callback)
        }
    }

    obj.foodItem = {
        saveFoodItemChild:function( price, restaurant_child_id, food_item_id, callback) {
            obj.postHttp('/restaurant/add_or_update_master_food_item_child_v2',{ price:price, restaurant_child_id:restaurant_child_id, food_item_id:food_item_id }, callback)
        },
        removeFoodItemChild:function(id,callback){
            obj.postHttp('/restaurant/remove_master_food_item_child',{id:id}, callback)

        },
        updateFoodItemChild:function(price,restaurant_child_id,food_item_id,foodItem_id, callback) {
            obj.postHttp('/restaurant/add_or_update_master_food_item_child_v2',{price:price,restaurant_child_id:restaurant_child_id,food_item_id:food_item_id,id:foodItem_id}, callback)
        },
    }

    obj.postHttp = function (url, params, callback) {
        if (AuthService.details) {
            params['api_key'] = AuthService.details.apiKey;
        }
        $http.post(BASE_URL + url, params, {}).then(function (result) {
            if (result.data.status == "error") {
                callback(result.data.message, null);
            } else if (result.data.status == "success") {
                callback(null, result.data.contents);
            } else {
                callback("Unknown error occurred!");
            }
        }, function () {
            callback("Unknown error occurred!");
        });
    };

    return obj;
}])
