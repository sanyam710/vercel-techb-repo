app.controller("LeadsListAlterCtrl", function ($scope, LeadsService, $routeParams, $location) {

    $scope.lead = {
        id: $routeParams.id,
        info: {},
        dto: {pageLoader: true},
        init: function () {
            if (this.id) {
                this.dto["pageLoader"] = true;
                LeadsService.leads.getLeadById(this.id, (error, data) => {
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
        submitForm: function () {
            if (this.id) {
                this.update();
            } else {
                this.save();
            }
        },
        save: function () {
            if (this.dto['btnLoader']) {
                return;
            }
            if (this.dto['leadForm'].$valid) {
                delete this.info.dto;
                this.dto['btnLoader'] = true;
                LeadsService.leads.add(this.info, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.dto['btnLoader'] = false;
                    this.goBack();
                    // $scope.toast.show("Saved new Lead", "success");
                })
            }
        },
        update: function () {
            if (this.dto['btnLoader']) {
                return;
            }

            if (this.dto['leadForm'].$valid) {
                delete this.info.dto;
                this.dto['btnLoader'] = true;
                LeadsService.leads.update(this.info, (error, data) => {
                    if (error) {
                        return;
                    }
                    this.goBack();
                    this.dto['btnLoader'] = false;
                    // $scope.toast.show("Updated Lead Information", "success");
                })
            }
        },
        goBack: function () {
            $location.path("/leads")
        }
    }

    $scope.app.initiate(() => {
        $scope.lead.init()
    })
})
