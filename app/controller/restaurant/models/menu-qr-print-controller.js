angular.module("TechBistro").controller("menuQrPrintCtrl", ["$scope", "RestaurantService", "AuthService", "$timeout", function ($scope, RestaurantService, AuthService, $timeout) {

    $scope.menuQr = {
        qrUrl: null,
        currentDisplay: "selection",
        categoryList: [],
        dto: {showDd: false, selectedIds: [], btnLoader: false, qrCodeSizeModel: 100 + ""},
        init: function () {
            this.categoryList = utility.ObjectUtility.clone($scope.dashboard.categoryList.filter((cat) => {
                return cat.recipes_count > 0;
            }));
            if (this.dto.selectedIds.length === 0) {
                this.dto['retLoader'] = true;
                RestaurantService.dashboard.getQrCategories(AuthService.details.restaurantId, (error, data) => {
                    if (error) {
                        return
                    }
                    if (data.split("@").length > 0) {
                        for (let id of data.split("@")) {
                            this.dto.selectedIds.push(parseInt(id));
                        }
                        this.dto['retLoader'] = false;
                    }
                })
            }
        },
        alterCategory: function (cat) {
            this.dto.selectedIds = utility.ArrayUtility.toggleElement(this.dto.selectedIds, cat.id);
        },
        selectAll: function () {
            if (this.dto.selectedIds.length === this.categoryList.length) {
                this.dto.selectedIds = [];
            } else {
                this.dto.selectedIds = [];
                for (let cat of this.categoryList) {
                    this.dto.selectedIds.push(cat.id);
                }
            }
        },
        print: function () {
            utility.dom.printDivision("qrCodeBlock");
        },
        getQr: function () {
            if (this.dto.btnLoader) {
                return;
            }
            this.dto.btnLoader = true;
            this.updateCategories();
        },
        updateQrCategories: function () {
            if (this.dto.updateQrCategoriesBtnLoader) {
                return;
            }
            this.dto.updateQrCategoriesBtnLoader = true;
            this.updateCategories();
        },
        updateCategories: function () {
            RestaurantService.dashboard.updateCategories(AuthService.details.restaurantId, this.dto.selectedIds.join("@"), (error, data) => {
                if (error) {
                    return
                }
                if (this.dto.updateQrCategoriesBtnLoader) {
                    this.dto.updateQrCategoriesBtnLoader = false;
                    $scope.toast.show("Updated QR code categories!", "success");
                } else {
                    this.currentDisplay = "qr-code";
                    this.qrUrl = `${window.location.origin}/order.html#!/${AuthService.userDetails.menu_key}`;
                    this.dto.btnLoader = false;
                }
            })
        },
        draggedElm: {},
        onDragElement: function (element) {
            this.draggedElm = element;
        },
        onDropCallback: function (index, item, external, type) {
            $timeout(() => {
                let currentIndex = $scope.menuQr.categoryList.indexOf(this.draggedElm);
                $scope.menuQr.categoryList.splice(currentIndex, 1);
                if (currentIndex < index) {
                    $scope.menuQr.categoryList.splice(index - 1, 0, this.draggedElm);
                } else {
                    $scope.menuQr.categoryList.splice(index, 0, this.draggedElm);
                }
                RestaurantService.dashboard.updateOrderForCategories($scope.dashboard.restaurantId, $scope.menuQr.categoryList, (error, data) => {
                    if (error) {
                        return;
                    }
                    $scope.toast.show("Updated Order for Categories!", "success");
                })
                $scope.$apply();
            }, 50)
        }
    }

    $scope.menuQr.init();
}])
