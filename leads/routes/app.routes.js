angular.module("leadsApp").config(function ($routeProvider) {
    $routeProvider
        .when("/leads", {
            name: "leads",
            templateUrl: "/leads/views/leads/list.html",
            controller: "LeadsListCtrl"
        })
        .when("/leads/alter/:id?", {
            name: "leads",
            templateUrl: "/leads/views/leads/alter.html",
            controller: "LeadsListAlterCtrl"
        })

    $routeProvider.otherwise("/leads");
})
