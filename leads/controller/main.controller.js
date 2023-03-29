app.controller("mainCtrl", function ($scope, $http, $timeout) {

    $scope.app = {
        initiate: function (callback) {
            if (utility.localStorage.get("userInfo") && utility.localStorage.get("loggedInUserType") === INTERNS) {
                callback();
            } else {
                utility.localStorage.clear();
                window.location.href = "/leads";
            }
        }
    }
})
