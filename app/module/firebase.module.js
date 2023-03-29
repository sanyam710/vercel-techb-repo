let FirebaseModule = {
    initForMessaging: function (vapidKey) {
        return new Promise((resolve, reject) => {
            Notification.requestPermission().then(data => {
                if (data === 'granted') {
                    const fcm = firebase.messaging();
                    fcm.getToken({
                        vapidKey: vapidKey
                    }).then(token => {
                        resolve(token)
                    })
                }
            })
        })
    },
    uploadImage: function (file, callback) {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(file.name).put(file);

        uploadTask.on('state_changed', function (snapshot) {

        }, (error) => {
            callback(error, null);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                callback(null, downloadURL);
            });
        });
    }
}

