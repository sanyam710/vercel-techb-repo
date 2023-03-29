angular.module("TechBistro").controller("MainCtrl", ["$scope", "$rootScope", "$route", "$location", "RestaurantService", "AuthService", "AdminService", "$timeout", function ($scope, $rootScope, $route, $location, RestaurantService, AuthService, AdminService, $timeout) {

    $scope.constants = {
        CONTENT_STATUS: CONTENT_STATUS,
        CONTENT_STATUS_MAP: CONTENT_STATUS_MAP,
        RECIPE_TYPES: RECIPE_TYPES,
        RECIPE_TYPES_MAP: RECIPE_TYPES_MAP,
        ORDER_STATUS_MAP: ORDER_STATUS_MAP,
        ORDER_STATUS: ORDER_STATUS,
        ADMINISTRATIVE: ADMINISTRATIVE,
        RESTAURANT: RESTAURANT,
        ACCOUNT_STATE: ACCOUNT_STATE,
        ACCOUNT_STATE_MAP: ACCOUNT_STATE_MAP,
        utility: utility,
        COUNTRIES: COUNTRIES,
        CURRENCY: CURRENCY,
        ALLERGIES: ALLERGIES,
        MEAL_TYPES: MEAL_TYPES,
        ENTITY_IMAGE_RESTAURANT_LOGO: ENTITY_IMAGE_RESTAURANT_LOGO,
        ENTITY_IMAGE_RESTAURANT_HORIZONTAL_LOGO: ENTITY_IMAGE_RESTAURANT_HORIZONTAL_LOGO,
        ENTITY_IMAGE_RESTAURANT_SLIDER_IMAGE: ENTITY_IMAGE_RESTAURANT_SLIDER_IMAGE,
        ENTITY_IMAGE_RESTAURANT_GALLERY_IMAGE: ENTITY_IMAGE_RESTAURANT_GALLERY_IMAGE
    }

    $scope.pageView = {
        current: utility.localStorage.get("loggedInUserType"),
        masterLoaded: false,
        userDetails: null,
        init: function (callback = null) {
            if (AuthService.details) {
                if ($scope.pageView.masterLoaded) {
                    if (callback) {
                        callback();
                    }
                } else {
                    if (this.current === RESTAURANT) {
                        RestaurantService.masters.retrieveMasters(AuthService.details.restaurantId, (error, data) => {
                            if (error) {
                                $scope.toast.show(error, "error");
                                return
                            }
                            AuthService.saveUserDetails(data);
                            this.userDetails = data;
                            $scope.pageView.masterLoaded = true;
                            FirebaseModule.initForMessaging(this.userDetails.vapid_key).then(browserKey => {
                                RestaurantService.profile.updateBrowserKey(this.userDetails.id, browserKey, (error, data) => {
                                    if (error) {
                                        return
                                    }

                                    // console.log("Token is Saved")
                                })
                            })
                            if (callback) {
                                callback();
                            }
                        })
                    } else {
                        AdminService.masters.retrieveMasters((error, data) => {
                            if (error) {
                                $scope.toast.show(error, "error");
                                return
                            }

                            $scope.constants.utility.dataStorage.set("masters", data);
                            $scope.pageView.masterLoaded = true;

                            if (callback) {
                                callback();
                            }
                        })
                    }
                }
            } else {
                $scope.toast.show("Please login to Continue", "error");
                window.location.href = "/";
            }
        }
    }

    $scope.nav = {
        selected: 'dashboard',
        set: function () {
            let currentRoute = $route.current.$$route.name;
            if (ACTIVATE_ROUTE[currentRoute]) {
                this.selected = ACTIVATE_ROUTE[currentRoute];
            }
        }
    }

    $rootScope.$on("$routeChangeSuccess", (event, next, current) => {
        $scope.nav.set();
    })

    $scope.popOver = {
        current: "",
        data: null,
        show: function (name, data) {
            this.current = name;
            this.data = data;
        },
        hide: function () {
            this.current = null;
            this.data = null;
        }
    }

    $scope.toast = {
        type: "",
        show: function (message, type) {
            this.message = message;
            this.type = type;
            $timeout(() => {
                this.message = null;
                this.type = null;
            }, 2000)
        }
    }

    document.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            $scope.popOver.hide();
            $scope.$digest();
        }
    })

    $scope.goTo = function (url, params = null) {
        $location.path(url);
    }

    $scope.logout = function () {
        $scope.constants.utility.localStorage.clear();
        window.location.href = "/";
    }
}])
