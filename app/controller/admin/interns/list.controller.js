angular.module("TechBistro").controller("InternsListCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.interns = {
        list: [],
        dto: {pageLoader: true},
        init: function () {
            AdminService.interns.retrieve((error, data) => {
                if (error) {
                    return;
                }
                this.list = data;
                this.dto['pageLoader'] = false;
            })
        },
        new: function () {
            $scope.goTo("/interns/alter");
        },
        edit: function (intern) {
            $scope.goTo("/interns/alter/" + intern.id);
        },
        showLeads: function (intern) {
            $scope.popOver.show("internLeads", intern);
            this.dto['leadsPopupLoader'] = true;
            AdminService.interns.retrieveLeadsByIntern(intern.id, intern.api_key, (error, data) => {
                if (error) {
                    return;
                }
                this.dto['leadsPopupLoader'] = false;
                $scope.popOver.data['leads'] = data;
            })
        }
    }

    $scope.pageView.init(() => {
        $scope.interns.init();
    })
}])
