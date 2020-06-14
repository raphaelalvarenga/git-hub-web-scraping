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

    let repoResponse: string = "";
    let response: ResponseInterface = {success: false, message: "", files: [], folders: []};

    try {
        repoResponse = await request(REPOURL);
    }

    catch (error) {
        response = {...response, message: "Please, check the link you're searching..."}
    }


    try {
        // First thing is create an array of <tr> tag that represents the file/folders the repo delivers when the page starts
        const rowData: any[] = await getRowData(repoResponse);
        
        // Setting success in the request
        response = {...response, success: true}

        // Building folders and files parameters in the response
        rowData.map(data => {

            // Does the data have URL?
            if (data.url) {

                // Then, it's a folder! But unfortunately, git creates some hidden and nameless folders. So...
                if (data.name !== "") {
                    // ...we need to consider only those that have name
                    response.folders?.push(data)
                }

            } else {

                // Otherwise, it's a file!
                response.files?.push(data)
            }
        })
    }

    catch (error) {
        response = {...response, message: "Something went wrong. Please, contact the IT team."}
    }

    
    
    return res.json(response);
}

export default indexController;