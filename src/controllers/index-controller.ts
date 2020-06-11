import { Request, Response } from "express";
import request from "request-promise";

const indexController = async (req: Request, res: Response): Promise<Response> => {
    const URL: string = req.body.url;

    const response = await request(URL);
    console.log(response);
    
    return res.json(req.body);
}

export default indexController;