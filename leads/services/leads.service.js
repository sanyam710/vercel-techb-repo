app.service("LeadsService", function ($http) {
    let obj = {};


    obj.leads = {
        retrieve: function (callback) {
            obj.postHttp("/leads/list_specific_intern_leads", {}, callback)
        },
        getLeadById: function (id, callback) {
            obj.postHttp("/leads/get_lead_by_id", {id: id}, callback)
        },
        add: function (lead, callback) {
            obj.postHttp("/leads/generate_lead", lead, callback)
        },
        update: function (lead, callback) {
            obj.postHttp("/leads/update_lead", lead, callback)
        }
    }

    obj.postHttp = function (url, params, callback) {
        if (window.localStorage.getItem("userInfo")) {
            let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
            params['intern_id'] = userInfo.id;
            params['api_key'] = userInfo.apiKey;
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
})
