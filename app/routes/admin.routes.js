angular.module("TechBistro").config(function ($routeProvider) {
    $routeProvider
        .when("/dashboard/admin", {
            name: "dashboard-admin",
            templateUrl: "/templates/admin/dashboard.html",
            controller: "AdminDashboardCtrl"
        })
        .when("/admin/user-alter/:id?", {
            name: "admin-user-alter",
            templateUrl: "/templates/admin/users/form.html",
            controller: "FormUserCtrl"
        })
        .when("/admin/entities", {
            name: "admin-entities",
            templateUrl: "/templates/admin/entities/list.html",
            controller: "EntitiesCtrl"
        })
        .when("/admin/languages", {
            name: "admin-languages",
            templateUrl: "/templates/admin/languages/list.html",
            controller: "LanguagesCtrl"
        })
        .when("/admin/masterchild", {
            name: "admin-masterchild",
            templateUrl: "/templates/admin/masterchild/list.html",
            controller: "MasterchildCtrl"
        })
        .when("/admin/enquires", {
            name: "admin-enquires",
            templateUrl: "/templates/admin/enquires/list.html",
            controller: "EnquiresCtrl"
        })
        .when("/admin/password-reset", {
            name: "admin-password-reset",
            templateUrl: "/templates/admin/profile/password-reset.html",
            controller: "ProfilePasswordResetCtrl"
        })
        .when("/interns", {
            name: "interns",
            templateUrl: "/templates/admin/interns/list.html",
            controller: "InternsListCtrl"
        })
        .when("/leads", {
            name: "leads",
            templateUrl: "/templates/admin/leads/list.html",
            controller: "LeadsListCtrl"
        })
        .when("/interns/alter/:id?", {
            name: "interns",
            templateUrl: "/templates/admin/interns/profile.html",
            controller: "InternProfileCtrl"
        })
    $routeProvider.otherwise("/dashboard/admin");
})



