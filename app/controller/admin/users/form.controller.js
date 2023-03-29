angular.module("TechBistro").controller("FormUserCtrl", ["$scope", "AdminService", "$routeParams", function ($scope, AdminService, $routeParams) {

    $scope.userForm = {
        id: $routeParams.id,
        info: utility.dataStorage.get("toBeEditedUser") ? utility.dataStorage.get("toBeEditedUser") : {},
        pageLoader: true,
        init: function () {
            if (this.id) {
                AdminService.dashboard.getUserProfile(this.id, (error, data) => {
                    if (error) {
                        $scope.toast.show(error, "error");
                        return;
                    }
                    this.info = data;
                    this.info.start_date = moment(this.info.start_date).toDate();
                    this.info.end_date = moment(this.info.end_date).toDate();
                    this.info["dao"] = {};
                    this.pageLoader = false;
                    $scope.languages.updateMap();
                })
            } else {
                this.info = {};
                this.info["dao"] = {};
                utility.dataStorage.set("toBeEditedUser", {})
                this.pageLoader = false;
            }
        },
        updateUser: function () {
            this.btnLoader = true;
            this.info["user_id"] = this.info.id;
            AdminService.dashboard.updateUser(this.info, (error, data) => {
                this.btnLoader = false;
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("User Profile was Updated", "success");
            })
        },
        saveUser: function () {
            this.btnLoader = true;
            AdminService.dashboard.saveUser(this.info, (error, data) => {
                this.btnLoader = false;
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("New User was added!", "success");
            })
        }
    }

    $scope.entities = {
        add: function (entity) {
            AdminService.dashboard.saveUserEntity($scope.userForm.id, entity.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Added New Entity", "success");
                $scope.userForm.info.user_entities.push(data);
            })
        },
        remove: function (entity) {
            AdminService.dashboard.deleteUserEntity(entity.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Entity Deleted", "success");
                utility.ArrayUtility.splice($scope.userForm.info.user_entities, entity)
            })
        }
    }

    $scope.languages = {
        map: {},
        add: function (language) {
            AdminService.dashboard.saveUserLanguage($scope.userForm.id, language.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Added New Language", "success");
                $scope.userForm.info.user_languages.push(data);
                this.updateMap();
            })
        },
        remove: function (language) {
            AdminService.dashboard.deleteUserLanguage(language.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Language Deleted", "success");
                utility.ArrayUtility.splice($scope.userForm.info.user_languages, language)
                this.updateMap();
            })
        },
        updateMap: function () {
            for (let lan of $scope.userForm.info.user_languages) {
                this.map[lan.language_id] = lan;
            }
        }
    }

    $scope.pageView.init(() => {
        $scope.userForm.init();
    })
}])
