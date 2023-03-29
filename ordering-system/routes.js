angular.module("OrderingSystemApp").config(function ($routeProvider) {
    $routeProvider
        .when("/:menuKey", {
            name: "home",
            templateUrl: "/ordering-system/views/home.html",
            controller: "HomeCtrl"
        })
        .when("/recipe/details/:id", {
            name: "recipe",
            templateUrl: "/ordering-system/views/recipe/details.html",
            controller: "RecipeDetailsCtrl"
        })
        .when("/login", {
            name: "login",
            templateUrl: "/ordering-system/views/auth/login.html",
            controller: "LoginCtrl"
        })
        .when("/signup", {
            name: "signup",
            templateUrl: "/ordering-system/views/auth/signup.html",
            controller: "SignUpCtrl"
        })
        .when("/order/cart", {
            name: "cart",
            templateUrl: "/ordering-system/views/cart/cart-details.html",
            controller: "CartDetailsCtrl"
        })
        .when("/order/order-accepted", {
            name: "order-accepted",
            templateUrl: "/ordering-system/views/cart/order-accepted.html",
            controller: "OrderAcceptedCtrl"
        })
        .when("/profile", {
            name: "profile",
            templateUrl: "/ordering-system/views/profile/user-profile.html",
            controller: "UserProfileCtrl"
        })
        .when("/restaurant-info", {
            name: "restaurant-info",
            templateUrl: "/ordering-system/views/profile/restaurant-info.html",
            controller: "RestaurantInfoCtrl"
        })
        .when("/orders", {
            name: "orders",
            templateUrl: "/ordering-system/views/profile/order-history.html",
            controller: "OrderHistoryCtrl"
        })
        .when("/location", {
            name: "location",
            templateUrl: "/ordering-system/views/profile/address/list.html",
            controller: "AddressListCtrl"
        })
        .when("/location-alter/:id?", {
            name: "location-alter",
            templateUrl: "/ordering-system/views/profile/address/alter.html",
            controller: "AddressAlterCtrl"
        })

    $routeProvider.otherwise("/:menuKey");
})
