app.controller("LeadsListCtrl", function ($scope, LeadsService, $location) {

    $scope.leads = {
        list: [],
        selected: {dto: {}},
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        init: function () {
            LeadsService.leads.retrieve((error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
                this.pageLoader = false;
            })
        },
        editLead: function (lead) {
            $location.path(`/leads/alter/${lead.id}`)
        },
        addLead: function () {
            $location.path("/leads/alter");
        },
        logout: function () {
            localStorage.clear();
            window.location.href = "/leads";
        }
    }

    $scope.app.initiate(() => {
        $scope.leads.init();
    })
})
