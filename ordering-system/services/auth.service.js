angular.module("OrderingSystemApp").service("AuthService", ["$http", function ($http) {
    let obj = {};

    obj.details = null;

    obj.loadUser = function () {
        obj.details = utility.localStorage.get(USER_INFO);
        if (obj.storageExpired()) {
            obj.details = null;
        }
    }

    obj.saveUserDetails = function (data) {
        const userInfo = {
            ...obj.details,
            ...data
        }
        if (userInfo["sessionTime"] === undefined) {
            userInfo["sessionTime"] = moment().format("x");
        }
        utility.localStorage.set(USER_INFO, userInfo);
        obj.details = utility.localStorage.get(USER_INFO);
    }

    obj.storageExpired = () => {
        if (obj.details) {
            let timeStored = moment(obj.details.sessionTime, "x");
            if (parseInt(moment().diff(timeStored, "hours")) > 2) {
                return true;
            }
        }

        return false;
    }

    obj.loadUser();
    return obj;
}])
