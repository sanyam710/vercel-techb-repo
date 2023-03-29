angular.module("TechBistro").controller("LeadsListCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.leads = {
        list: [],
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        internsObj: {},
        init: function () {
            AdminService.leads.retrieve((error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
                for (let lead of this.list) {
                    this.internsObj[lead.intern.name] = lead.intern;
                }
                this.pageLoader = false;
            })
        },
    }


    $scope.filters = {
        params: {internName: null},
        isVisible: function (lead) {
            if (this.params.internName && this.params.internName !== lead.intern.name) {
                return false;
            }

            return true;
        }
    }

    $scope.pageView.init(() => {
        $scope.leads.init();
    })
}])
