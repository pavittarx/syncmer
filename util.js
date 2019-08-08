/* Global Utility Functions used throughout different files*/

// Parameters of current URL Encoding
function getParams() {
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
    });
    params.stamp = parseInt(params.stamp);
    return params;
}

// Gets Local Time of the current user...
async function getLocalTime() {
    return new Promise((resolve, reject) => {
        fetch('http://worldtimeapi.org/api/ip').then(function (response) {
            if (response.ok)
                return response.json();
            else
                reject(null);
        }).then(function (localTime) {
            resolve(localTime);
        });

    });
}

// Gets current Local Time of the provided timezone
async function getTime(timezone) {
    return new Promise((resolve, reject) => {
        fetch('http://worldtimeapi.org/api/timezone/' + timezone).then(function (response) {
            if (response.ok)
                return response.json();
            else
                reject(null);
        }).then(function (localTime) {
            resolve(localTime);
        });

    });
}

// Unix to Js TimeStamp
function convertU2Js(stamp) {
    return new Date(stamp * 1000);
}

// Js to Unix timestamp
function convertJs2U(dateObj) {
    return dateObj.getTime() / 1000;
}