angular.module("TechBistro").controller("RestaurantProfileEditCtrl", ["$scope", "$routeParams", "RestaurantService", "AuthService", "$timeout", function ($scope, $routeParams, RestaurantService, AuthService, $timeout) {

    $scope.profile = {
        info: null,
        dto: {},
        form: {},
        list: [],
        selected: { dto: {} },
        pageLoader: true,
        searchText: "",
        btnLoader: false,
        init: function () {
            RestaurantService.restaurantChild.getRestaurantChild(AuthService.details.restaurantId,(error, data) => {
                if (error) {
                    return;
                }

                this.list = data;
                this.pageLoader = false;
            })
            this.info = utility.ObjectUtility.clone(AuthService.userDetails);
            $scope.images.init();
        },
        saveRestaurantChild: function () {
            this.btnLoader = true;
            delete $scope.popOver.data.dto;
            RestaurantService.restaurantChild.addRestaurantChild($scope.popOver.data.id,$scope.popOver.data.name, $scope.popOver.data.status_id,AuthService.details.restaurantId, (error, data) => {
                if (error) {
                    return;
                }
                this.btnLoader = false;
                this.init();
                $scope.popOver.hide();
            })
        },
        update: function () {
            if (this.dto['profileBtnLoader']) {
                return
            }
            this.dto['profileBtnLoader'] = true;
            let params = {
                restaurant_id: AuthService.details.restaurantId,
                name: this.info.name,
                currency: this.info.currency,
                email: this.info.email,
                website: this.info.website,
                no_of_tables: this.info.no_of_tables,
                fssai: this.info.fssai,
                gst_number:this.info.gst_number,
                google_reviews:this.info.google_reviews
            }
            RestaurantService.profile.update(params, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }

                $scope.toast.show("Profile was updated!", "success");
                this.dto['profileBtnLoader'] = false;
                AuthService.saveUserDetails(this.info);
            })
        },
        updatePassword: function () {
            if (this.dto['resetPasswordBtnLoader']) {
                return;
            }
            if (this.dto.passwordResetForm.$valid) {
                this.dto['resetPasswordBtnLoader'] = true;

                RestaurantService.profile.updatePassword(this.info.oldPassword, this.info.newPassword, this.info.retypedPassword, (error, data) => {
                    if (error) {
                        $scope.toast.show(error, "error");
                        return;
                    }

                    this.dto['resetPasswordBtnLoader'] = false;
                    $scope.toast.show("Password was updated!", "success");
                })
            }
        }
    }

    $scope.images = {
        model: {},
        dto: {},
        info: {},
        init: function () {
            RestaurantService.profile.getRestaurantLogo(AuthService.details.restaurantId, (error, data) => {
                if (error) {
                    return
                }
                this.info = data;
                this.info['dto'] = {};
                this.showCarouselImages();
            })
        },
        reset: function () {
            this.dto = {};
            this.model = {};
        },
        openImagePicker: function (id, entity) {
            document.getElementById(id).click();
            document.getElementById(id).addEventListener("change", (file) => {
                $scope.images.model[entity] = file.target.files[0];
                $scope.$digest();
            });
        },
        upload: function (entity) {
            if (this.model[entity] == null) {
                $scope.toast.show("Select Image!", "error");
                return;
            }
            this.dto[entity] = true;
            FirebaseModule.uploadImage(this.model[entity], (error, data) => {
                if (error) {
                    return;
                }
                RestaurantService.images.uploadImage(entity, $scope.profile.info.id, data, (error, data) => {
                    if (error) {
                        return;
                    }
                    $scope.toast.show("Image added!", "success");
                    $scope.images.init();
                    this.reset();
                })
            })
        },
        open: function (image) {
            window.open(image.url, "_blank");
        },
        delete: function () {
            this.dto["imageDeleteLoader"] = true;
            RestaurantService.images.removeImage($scope.popOver.data.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Image removed!", "success");
                this.reset();
                $scope.images.init();
                $scope.popOver.hide();
            })
        },
        showCarouselImages: function () {
            $timeout(() => {
                $('.banner-carousel').owlCarousel({
                    animateOut: 'slideOutDown',
                    animateIn: 'flipInX',
                    items: 1,
                    margin: 10,
                    smartSpeed: 450
                })
            }, 10)
        }
    }

    $scope.pageView.init(() => {
        $scope.profile.init();
    })
}])
