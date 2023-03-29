angular.module("TechBistro").controller("ProfilePasswordResetCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.profile = {
        info: {},
        btnLoader: false,
        updatePassword: function () {
            if (this.btnLoader) {
                return;
            }
            if ($scope.passwordResetForm.$valid) {
                this.btnLoader = true;

                AdminService.profile.updatePassword(this.info.oldPassword, this.info.newPassword, this.info.retypedPassword, (error, data) => {
                    if (error) {
                        return;
                    }

                    this.btnLoader = false;
                    $scope.toast.show("Password was updated", "success");
                })
            }
        }
    }

    $scope.pageView.init(() => {
        // controller init goes here
    })
}])
