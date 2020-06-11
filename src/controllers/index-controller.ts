import { Request, Response } from "express";

const indexController = (req: Request, res: Response): Response => {
    return res.json(req.body);
}

export default indexController;