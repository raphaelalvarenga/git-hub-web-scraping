import { Request, Response } from "express";

const indexController = (req: Request, res: Response): Response => {
    return res.json({controller: "funcionando"});
}

export default indexController;