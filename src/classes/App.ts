import express, { Application, Request, Response } from "express";

export default class App {
    private server: Application;
    private port: number | string;

    constructor(port?: number | string) {
        this.server = express();
        this.routes();
        
        this.port = port || 3000;
    }

    public routes() {
        this.server.get("/", (req: Request, res: Response) => {
            console.log("ok");
            res.send({ok: "true"});
        })
    }

    public listen() {
        this.server.listen(this.port, () => console.log(`Port ${this.port} running...`));
    }
}