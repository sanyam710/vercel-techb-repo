angular.module("OrderingSystemApp").service("OrdersService", ["$http", "AuthService", function ($http, AuthService) {
    let obj = {};

    obj.retrieveLanguages = function (callback) {
        obj.postHttp("/restaurant_menu/get_restaurant_details", {}, callback);
    }

    obj.retrieveMenuTemplate = function ( ignoreLoadingBar, lang, callback) {
        obj.postHttp("/restaurant_menu/get_menu_details", {
            ignoreLoadingBar: ignoreLoadingBar,
            language: lang
        }, callback)
    }

    obj.retrieveRecipesFromCategory = function (categoryId, entity, lang, callback) {
        obj.postHttp("/restaurant/get_recipe_details_from_category", {
            category_id: categoryId,
            entity: entity,
            lang: lang
        }, callback)
    }

    obj.retrieveTableOrderDetails = function (tableId, callback) {
        obj.postHttp("/order/get_table_ongoing_order_details", {table_id: tableId}, callback)
    }

    obj.addNewTableOrder = function (params, callback) {
        obj.postHttp("/order/add_order", params, callback)
    }

    obj.sendNotification = function (notificationObject, callback) {
        notificationObject = {
            notification: notificationObject,
            to:  AuthService.details.browser_key
        }
        const header = {
            "Content-Type": "application/json",
            "Authorization": `key=${AuthService.details.serverKey}`
        }
        obj.postDirectHttp("https://fcm.googleapis.com/fcm/send", notificationObject, header, callback)
    }

    obj.postHttp = function (url, params, callback) {
        if (!utility.ObjectUtility.isEmpty(AuthService.details)) {
            params['menu_key'] = AuthService.details.menuKey;
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

    obj.postDirectHttp = function (url, params, header, callback) {
        $http.defaults.headers.common.Authorization = header.Authorization;
        $http.defaults.headers.common['Content-Type'] = header["Content-Type"]
        $http.post(url, params, header).then(function (result) {
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
