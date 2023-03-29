angular.module("TechBistro").config(function ($routeProvider) {
    $routeProvider
        .when("/dashboard", {
            name: "dashboard-restaurant",
            templateUrl: "/templates/restaurant/dashboard.html",
            controller: "RestaurantDashboardCtrl"
        })
        .when("/recipe-edit/:recipeId", {
            name: "dashboard-recipe-edit",
            templateUrl: "/templates/restaurant/recipe/edit.html",
            controller: "RecipeEditCtrl"
        })
        .when("/profile", {
            name: "restaurant-profile",
            templateUrl: "/templates/restaurant/profile/edit.html",
            controller: "RestaurantProfileEditCtrl"
        })
        .when("/tables", {
            name: "restaurant-tables",
            templateUrl: "/templates/restaurant/tables/list.html",
            controller: "TableListCtrl"
        })
        .when("/table-orders/:tableId", {
            name: "restaurant-table-orders",
            templateUrl: "/templates/restaurant/tables/table-orders.html",
            controller: "TableOrdersCtrl"
        })
        .when("/order-history", {
            name: "order-history",
            templateUrl: "/templates/restaurant/tables/order-history-list.html",
            controller: "orderHistoryList"
        })
        .when("/table-history/:tableId", {
            name: "order-history",
            templateUrl: "/templates/restaurant/tables/history.html",
            controller: "OrderHistoryCtrl"
        })
    $routeProvider.otherwise("/dashboard");
})
