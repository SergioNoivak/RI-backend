"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.bootstrap = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        this.aplication = express();
        process.setMaxListeners(0);
        this.aplication.use(cors());
        this.aplication.options('*', cors());
        var bodyParser = require('body-parser');
        this.aplication.use(bodyParser.json()); // to support JSON-encoded bodies
        this.aplication.use(bodyParser.urlencoded({
            extended: true
        }));
        return this.initRoutes(routers).then(function () { return _this; });
    };
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return new Promise(function (resolver, reject) {
            try {
                routers.forEach(function (route) { return route.applyRoutes(_this.aplication); });
                _this.aplication.listen(3001, function () {
                    console.log('Example app listening on port 3001!');
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return Server;
}());
exports.Server = Server;
