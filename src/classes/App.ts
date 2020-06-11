import express, { Application } from "express";
import IndexRoutes from "../routes/index-routes";

export default class App {
    private server: Application;

    constructor(private port?: number | string) {
        this.server = express();
        this.settings();
        this.routes();
        
        this.port = port || 3000;
    }

    public settings() {
        this.server.set("port", this.port || process.env.PORT || 3000);
    }

    public routes() {
        this.server.use(IndexRoutes);
    }

    public listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}