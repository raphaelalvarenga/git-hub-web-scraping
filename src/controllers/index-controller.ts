import { Request, Response } from "express";
import request from "request-promise";
import FileInterface from "../interfaces/file-interface";
import getRowData from "../routines/getRowData";
import ResponseInterface from "../interfaces/response-interface";
import FileExtensionInterface from "../interfaces/file-extension-interface";

const indexController = async (req: Request, res: Response): Promise<Response> => {

    // This is URL you sent to me
    const REPOURL: string = req.body.url;

    // This variable will get the HTML page
    let repoResponse: string = "";

    // This will be the result and delivered to front end
    let response: ResponseInterface = {success: false, message: "", files: [], folders: []};

    try {
        // Let's get the repo you sent to me
        repoResponse = await request(REPOURL);

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

                // It's necessary to check if response object already has that extension set and get its index
                const extensionIndex = response.files.findIndex(file => file.extension === data.extension);

                // If the extension is already set in response object...
                if (extensionIndex > -1) {

                    // Then just add the file
                    response.files[extensionIndex].files.push(data);
                } else {

                    // Otherwise, it needs to be created in the response object and add the file
                    const newExtension: FileExtensionInterface = {extension: data.extension, files: [data]}
                    response.files.push(newExtension);
                }
            }
        })
    }

    catch (error) {
        response = {...response, message: "Something went wrong. Please, check the link you're searching or contact the IT team..."}
    }
    
    return res.json(response);
}

export default indexController;