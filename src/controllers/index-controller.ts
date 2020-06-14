import { Request, Response } from "express";
import request from "request-promise";
import FileInterface from "../interfaces/file-interface";
import getRowData from "../routines/getRowData";
import ResponseInterface from "../interfaces/response-interface";
import FolderInterface from "../interfaces/folder-interface";

const indexController = async (req: Request, res: Response): Promise<Response> => {

    // This variable will be populated with all files in the project
    const files: FileInterface[] = [];

    const REPOURL: string = req.body.url;

    const repoResponse: string = await request(REPOURL);

    let response: ResponseInterface = {success: false, message: "", files: [], folders: []};

    try {
        // First thing is create an array of <tr> tag that represents the file/folders the repo delivers when the page starts
        const rowData: any[] = await getRowData(repoResponse);
        
        response = {...response, success: true}

        rowData.map(data => data.url ? response.folders?.push(data) : response.files?.push(data))
    }

    catch (erro) {
        response = {...response, message: erro}
    }

    
    
    return res.json(response);
}

export default indexController;