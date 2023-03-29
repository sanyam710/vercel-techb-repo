angular.module("TechBistro").controller("InternProfileCtrl", ["$scope", "AdminService", "$routeParams", function ($scope, AdminService, $routeParams) {

    $scope.intern = {
        id: $routeParams.id,
        info: {},
        dto: {pageLoader: true},
        init: function () {
            if (this.id) {
                this.dto["pageLoader"] = true;
                AdminService.interns.getProfile(this.id, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.info = data;
                    this.dto["pageLoader"] = false;
                })
            } else {
                this.dto["pageLoader"] = false;
            }
        },
        save: function () {
            if (this.dto['btnLoader']) {
                return;
            }
            if (this.dto['internForm'].$valid) {
                delete this.info.dto;
                this.dto['btnLoader'] = true;
                AdminService.interns.save(this.info, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.dto['btnLoader'] = false;
                    $scope.toast.show("Saved new Intern", "success");
                })
            }
        },
        update: function () {
            if (this.dto['btnLoader']) {
                return;
            }
            if (this.dto['internForm'].$valid) {
                delete this.info.dto;
                this.dto['btnLoader'] = true;
                AdminService.interns.update(this.info, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.dto['btnLoader'] = false;
                    $scope.toast.show("Updated Intern Information", "success");
                })
            }
        },
    }

    $scope.pageView.init(() => {
        $scope.intern.init();
    })
}])
