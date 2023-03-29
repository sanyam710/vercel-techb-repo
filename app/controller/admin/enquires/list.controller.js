angular.module("TechBistro").controller("EnquiresCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.enquiries = {
        pageLoader: true,
        list: [],
        init: function () {
            AdminService.enquiries.retrieveEnquiries((error, data) => {
                if (error) {
                    return;
                }
                this.list = data;
                this.pageLoader = false;
            })
        }
    }

    $scope.pageView.init(() => {
        $scope.enquiries.init();
    })
}])
