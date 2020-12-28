const http = require("http");

var httpService = function (app, port) {
    var httpService = http.createServer(app).listen(port);
    httpService.on('listening', onListening);
    function onListening() {
        var addr = httpService.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'addr ' + addr.port
        console.log('Listening on ' + bind)
    }
}

module.exports = httpService;