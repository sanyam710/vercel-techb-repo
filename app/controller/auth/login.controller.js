let app = angular.module("app", []);

app.controller("loginCtrl", function ($scope, $http, $timeout) {
        $scope.restaurant = {
            email: "",
            password: "",
            error: "",
            btnLoader: false,
            checkForCurrentSession: function () {

            },
            getLogin: function () {
                if ($scope.loginForm.$valid) {
                    this.btnLoader = true;
                    $scope.http.post("/user/request_account_access", {
                        email: this.email,
                        password: this.password
                    }, (error, data) => {
                        this.btnLoader = false;
                        if (error) {
                            this.error = error;
                            $timeout(() => {
                                this.error = null;
                            }, 3000)
                            return
                        }

                        let obj = {
                            restaurantId: data.restaurant_id,
                            apiKey: data.api_key,
                            email: data.email,
                        }

                        utility.localStorage.set("userInfo", obj);
                        utility.localStorage.set("loggedInUserType", RESTAURANT);
                        window.location.href = "/landing.html#!/dashboard"
                    })
                }
            }
        }

        $scope.owner = {
            email: "",
            error: "",
            password: "",
            btnLoader: false,
            checkForCurrentSession: function () {

            },
            getLogin: function () {
                this.btnLoader = true;
                if ($scope.loginForm.$valid) {
                    $scope.http.post("/admin/request_account_access", {
                        email: this.email,
                        password: this.password
                    }, (error, data) => {
                        this.btnLoader = false;
                        if (error) {
                            this.error = error;
                            $timeout(() => {
                                this.error = null;
                            }, 3000)
                            return
                        }

                        let obj = {
                            adminId: data.admin_id,
                            apiKey: data.api_key,
                            email: data.email,
                        }

                        utility.localStorage.set("userInfo", obj);
                        utility.localStorage.set("loggedInUserType", ADMINISTRATIVE);

                        window.location.href = "/landing.html#!/dashboard/admin";
                    })
                }
            }
        }

        $scope.http = {
            post: function (url, params, callback) {
                $http.post(BASE_URL + url, params, {}).then(function (result) {
                    if (result.data.status === "error") {
                        callback(result.data.message, null);
                    } else if (result.data.status === "success") {
                        callback(null, result.data.contents);
                    } else {
                        callback("Unknown error occurred!");
                    }
                }, function () {
                    callback("Unknown error occurred!");
                });
            }
        }
    }
);
