import { Request, Response } from "express";
import request from "request-promise";
import FileInterface from "../interfaces/file-interface";
import getRowData from "../routines/getRowData";

const indexController = async (req: Request, res: Response): Promise<Response> => {

    // This variable will be populated with all files in the project
    const files: FileInterface[] = [];

    const REPOURL: string = req.body.url;

    const repoResponse: string = await request(REPOURL);

    // First thing is create an array of <tr> tag that represents the file/folders the repo delivers when the page starts
    const rowData: FileInterface[] = await getRowData(repoResponse);
    console.log("This is the files data:");
    console.log(rowData);
    
    return res.json(rowData);
}

export default indexController;