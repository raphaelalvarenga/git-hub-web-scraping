"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("../routes/index-routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(port) {
        this.port = port;
        this.server = express_1.default();
        this.settings();
        this.routes();
    }
    settings() {
        this.server.use(body_parser_1.default.urlencoded({ extended: false }));
        this.server.use(body_parser_1.default.json());
        this.server.use(cors_1.default());
        this.server.set("port", process.env.PORT || this.port || 3000);
    }
    routes() {
        this.server.use(index_routes_1.default);
    }
    listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}
exports.default = App;
