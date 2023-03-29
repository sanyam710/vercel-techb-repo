angular.module("TechBistro").service("AuthService", ["$http", function ($http) {
    let obj = {};

    obj.details = null;
    obj.userDetails = null;

    obj.loadUser = function () {
        this.details = JSON.parse(window.localStorage.getItem("userInfo"));
    }

    obj.saveUserDetails = function (data) {
        this.userDetails = data;
    }

    obj.loadUser();
    return obj;
}])
