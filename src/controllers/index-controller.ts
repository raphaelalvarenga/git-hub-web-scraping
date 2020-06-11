import { Request, Response } from "express";
import request from "request-promise";
import cheerio from "cheerio";

const indexController = async (req: Request, res: Response): Promise<Response> => {
    const URL: string = req.body.url;

    const response = await request(URL);
    const $ = cheerio.load(response);
    
    // This is the HTML of the block of files/folders
    $("tr.js-navigation-item").map((i, elem) => {
        // if (i === 0) {

            // It's possible to find out whether the actual cycle in the loop is a folder or not through the icon
            const svgClasses = $("tr.js-navigation-item").eq(i).find("svg").attr("class");

            // If the second class is "octicon-file", then it is a file. Otherwise it is a folder
            const isFile = svgClasses?.split(" ")[1] === "octicon-file";
            
            isFile ? console.log("Yes, it is a file") : console.log("No, it is not a file");
        // }
    });
    
    return res.json(req.body);
}

export default indexController;