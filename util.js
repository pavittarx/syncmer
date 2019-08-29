/* Global Utility Functions used throughout different files*/

// Parameters of current URL Encoding
function getParams() {
    var params = {};
    let uri = window.location.href;

    console.log(uri.indexOf("?"), uri);
    uri = uri.substr(uri.indexOf("?"));

    uri.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
    });
    params.stamp = parseInt(params.stamp);
    return params;
}

// Gets Local Time of the current user...
async function getLocalTime() {
    return new Promise((resolve, reject) => {
        fetch('https://worldtimeapi.org/api/ip').then(function (response) {
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
        fetch('https://worldtimeapi.org/api/timezone/' + timezone).then(function (response) {
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