angular.module("TechBistro").controller("AdminDashboardCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.users = {
        userText: "",
        list: [],
        pageLoader: true,
        init: function () {
            AdminService.dashboard.retrieveUsers((error, data) => {
                if (error) {
                    return;
                }
                this.list = data;
                this.pageLoader = false;
            })
        },
        editUser: function (user) {
            utility.dataStorage.set("toBeEditedUser", user);
            $scope.goTo(`/admin/user-alter/${user.id}`)
        },
        addNewUser: function () {
            $scope.goTo("/admin/user-alter");
        }
    }

    $scope.users.init();
}])
