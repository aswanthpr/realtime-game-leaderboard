"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const index_1 = require("./socket/index");
const httpServer = (0, http_1.createServer)(app_1.default);
(0, index_1.initSocket)(httpServer);
httpServer.listen(process.env.PORT, () => {
    console.log(`server is running on http:localhost:${process.env.PORT}`);
});
