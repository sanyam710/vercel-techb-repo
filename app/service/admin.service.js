angular.module("TechBistro").service("AdminService", ["$http", "AuthService", function ($http, AuthService) {
    let obj = {};


    obj.masters = {
        retrieveMasters: function (callback) {
            obj.postHttp("/admin/get_master", {}, callback)
        }
    }

    obj.dashboard = {
        retrieveUsers: function (callback) {
            obj.postHttp("/admin/get_all_users", {}, callback)
        },
        saveUser: function (user, callback) {
            obj.postHttp("/admin/create_user", user, callback)
        },
        getUserProfile: function (id, callback) {
            obj.postHttp("/admin/get_user_profile", {user_id: id}, callback)
        },
        updateUser: function (user, callback) {
            obj.postHttp("/admin/update_user_profile", user, callback)
        },
        saveUserEntity: function (userId, entityId, callback) {
            obj.postHttp("/entity/create_user_entity", {user_id: userId, entity_id: entityId}, callback)
        },
        deleteUserEntity: function (userEntityId, callback) {
            obj.postHttp("/entity/remove_user_entity", {user_entity_id: userEntityId}, callback)
        },
        saveUserLanguage: function (userId, languageId, callback) {
            obj.postHttp("/language/create_user_language", {user_id: userId, language_id: languageId}, callback)
        },
        deleteUserLanguage: function (userLanguageId, callback) {
            obj.postHttp("/language/remove_user_language", {user_language_id: userLanguageId}, callback)
        },
    }

    obj.entities = {
        retrieveEntities: function (callback) {
            obj.postHttp("/entity/get_all_masters_entities", {}, callback)
        },
        alterEntity: function (entityId, name, statusId, callback) {
            obj.postHttp("/entity/add_or_update_entity", {id: entityId, name: name, status_id: statusId}, callback)
        },
    }

    obj.languages = {
        retrieveLanguages: function (callback) {
            obj.postHttp("/language/get_all_masters_languages", {}, callback)
        },
        alterLanguage: function (languageId, name, statusId, callback) {
            obj.postHttp("/language/add_or_update_language", {
                id: languageId,
                name: name,
                status_id: statusId
            }, callback)
        },
    }

    obj.leads = {
        retrieve: function (callback) {
            obj.postHttp("/leads/list_all_leads", {}, callback)
        }
    }

    obj.enquiries = {
        retrieveEnquiries: function (callback) {
            obj.postHttp("/restaurant/get_all_enquiries", {}, callback)
        },
    }

    obj.profile = {
        updatePassword: function (oldPassword, newPassword, retypedPassword, callback) {
            obj.postHttp("/user/update_password", {
                new_password: newPassword,
                old_password: oldPassword,
                retype_new_password: retypedPassword
            }, callback);
        }
    }

    obj.interns = {
        retrieve: function (callback) {
            obj.postHttp("/intern/get_all_interns", {}, callback)
        },
        save: function (interInfo, callback) {
            obj.postHttp("/intern/create_intern", interInfo, callback)
        },
        getProfile: function (id, callback) {
            obj.postHttp("/intern/get_intern_profile", {id: id}, callback)
        },
        update: function (interInfo, callback) {
            obj.postHttp("/intern/update_intern", interInfo, callback)
        },
        retrieveLeadsByIntern: function (internId, internApiKey, callback) {
            obj.postHttp("/leads/list_specific_intern_leads", {intern_id: internId, api_key: internApiKey}, callback)
        },
    }

    obj.masterChild = {
        getMasterChild:function(callback) {
            obj.postHttp("/restaurant/get_all_masters_child", {},callback)
        },
        addMasterChild: function(id,name,statusId,callback) {
            obj.postHttp("/restaurant/add_or_update_master_child", {id: id,name: name,status_id: statusId},callback)
        },
        removeMaterChild:function(id,callback) {
            obj.postHttp("/restaurant/remove_master_child", {id: id},callback)

        }
    }

    obj.postHttp = function (url, params, callback) {
        if (AuthService.details) {
            params['api_key'] = AuthService.details.apiKey;
        }
        $http.post(BASE_URL + url, params, {}).then(function (result) {
            if (result.data.status == "error") {
                callback(result.data.message, null);
            } else if (result.data.status == "success") {
                callback(null, result.data.contents);
            } else {
                callback("Unknown error occurred!");
            }
        }, function () {
            callback("Unknown error occurred!");
        });
    };

    return obj;
}])
