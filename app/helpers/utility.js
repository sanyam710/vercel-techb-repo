const utility = {
    ObjectUtility: {
        clone: function (obj) {
            if (obj instanceof Object) {
                return JSON.parse(JSON.stringify(obj))
            }
            return null;
        },
        isEmpty: function (object) {
            if (object instanceof Object) {
                return Object.keys(object).length === 0;
            }
            return null
        },
        setDto: function (object) {
            if (object['dto'] === undefined) {
                object['dto'] = {};
            }
        }
    },
    DateUtility: {
        formattedDate: function (date, format) {

        },
        toDate: function (date) {
            return moment(date).toDate();
        }
    },
    ArrayUtility: {
        toggleElement: function (array, element) {
            if (array === undefined || array === null) {
                array = [];
            }
            let index = array.indexOf(element);

            if (index === -1) {
                array.push(element);
            } else {
                array.splice(index, 1);
            }
            return array;
        },
        splice: function (array, element) {
            if (array.length === 0) {
                return;
            }
            let index = array.indexOf(element);

            if (index !== -1) {
                array.splice(index, 1);
            }
        }
    },
    dom: {
        printDivision: function (documentElementId) {
            let printWindow = window.open('', 'PRINT', 'height=600,width=800');
            printWindow.document.write('<html><head><title>' + document.title + '</title>');
            printWindow.document.write('<link rel="stylesheet" href="/css/base.css">');
            printWindow.document.write('<link rel="stylesheet" href="/css/print.css">');
            printWindow.document.write('<script src="/lib/angular/angular.js"></script>');
            printWindow.document.write('<script src="/lib/angular/QrCode/qrcode.js"></script>');
            printWindow.document.write('<script src="/lib/angular/QrCode/angular-qrcode.js"></script>');
            printWindow.document.write('<script src="/app/app.main.js"></script>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(document.getElementById(documentElementId).innerHTML);
            printWindow.document.write('</body></html>');

            printWindow.document.close(); // necessary for IE >= 10
            printWindow.focus(); // necessary for IE >= 10*/

            /*setTimeout(() => {
                printWindow.print();
            }, 500)*/
        }
    },
    localStorage: {
        set: function (key, value) {
            let localStorageValue = JSON.stringify(value);
            window.localStorage.setItem(key, localStorageValue);
        },
        get: function (key) {
            if (window.localStorage.getItem(key)) {
                return JSON.parse(window.localStorage.getItem(key));
            }
            return null;
        },
        removeItem: function (key) {
            window.localStorage.removeItem(key);
        },
        clear: function () {
            window.localStorage.clear();
        }
    },
    dataStorage: {
        data: {},
        set: function (key, value) {
            this.data[key] = value;
        },
        get: function (key) {
            if (this.data[key]) {
                return this.data[key];
            }
            return null;
        },
        clear: function () {
            this.data = {};
        }
    },
    lib: {
        getLightColor: function (colorCode) {
            return tinycolor(colorCode).lighten(30).toString();
        }
    }
}
