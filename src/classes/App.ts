import express, { Application } from "express";
import IndexRoutes from "../routes/index-routes";
import bodyParser from "body-parser";
import cors from "cors";

export default class App {
    private server: Application;

    constructor(private port?: number | string) {
        this.server = express();
        this.settings();
        this.routes();
    }

    public settings() {
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(cors());
        this.server.set("port", process.env.PORT || this.port || 3000);
    }

    public routes() {
        this.server.use(IndexRoutes);
    }

    public listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}