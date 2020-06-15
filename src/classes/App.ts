import express, { Application } from "express";
import IndexRoutes from "../routes/index-routes";
import bodyParser from "body-parser";
import cors from "cors";

// An instance of this class represents the server
export default class App {

    // This variable will do Express' job
    private server: Application;

    // When the server starts, it needs to set the port, cors, routes, etc...
    constructor(private port?: number | string) {
        this.server = express();
        this.settings();
        this.routes();
    }

    // This settings is called to set things the server will need to work
    public settings() {
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(cors());
        this.server.set("port", process.env.PORT || this.port || 3000);
    }

    // Configuring routes
    public routes() {
        this.server.use(IndexRoutes);
    }

    // Starting server when called
    public listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}