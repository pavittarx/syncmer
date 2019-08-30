module.exports = {
    "ui": {
        "port": 3001
    },
    "files": ["./js/*.js","./css/*.css","index.html","util.js"],
    "watchEvents": [
        "change"
    ],
    "serveStatic": ["*.*", "./css/*.css", "./js/*.js"],
    https: true
};