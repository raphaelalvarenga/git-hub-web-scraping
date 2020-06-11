import express, { Application, Request, Response } from "express";

export default class App {
    private server: Application;

    constructor() {
        this.server = express();
        this.routes();
    }

    public routes() {
        this.server.get("/", (req: Request, res: Response) => {
            console.log("ok");
            res.send({ok: "true"});
        })
    }

    public listen() {
        this.server.listen(3000, () => console.log("Port 3000 listening..."));
    }
}