"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./server/Server");
var files_router_1 = require("./routes/files/files.router");
var teste_1 = require("./routes/teste/teste");
var server = new Server_1.Server();
server.bootstrap([
    teste_1.testeRouter,
    files_router_1.filesRouter,
]).then(function () {
}).catch(function () {
});
