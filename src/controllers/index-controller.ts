import { Request, Response } from "express";
import request from "request-promise";
import cheerio from "cheerio";

const indexController = async (req: Request, res: Response): Promise<Response> => {
    const URL: string = req.body.url;

    const response = await request(URL);
    const $ = cheerio.load(response);
    
    // This is the HTML of the block of files/folders
    let html: any = $("table.files tbody").html();

    // Turning the string into an array using as delimiter the <tr> tag
    const trs: string[] = html.replace(/<\/tr>/g, "<\/tr>|").split("|");

    // A remaning index keeps empty in the last position of the array. It needs to be eliminated
    trs.pop();

    // Loop through <tr> tags
    trs.map((tr: string, index: number) => {
        console.log(index);
        // The first <tr> tag is never important. Therefore, the loop needs to be considered from the second tag on
        if (index > 0) {
            // The code keeps here
        }
    })
    
    return res.json(req.body);
}

export default indexController;