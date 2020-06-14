import request from "request-promise";
import cheerio from "cheerio";
import FileInterface from "../interfaces/file-interface";
import getFileRemainingData from "../routines/getFileRemaningData";
import FolderInterface from "../interfaces/folder-interface";

const getRowData = async (html: string): Promise<any[]> => {

    const $ = cheerio.load(html);    

    const promises: any[] = $('.files .js-navigation-item').map(async (i: number, item: CheerioElement) => {
        let tempItem: any;
        const svgClasses = $(item).find(".icon > svg").attr("class");
        const isFile = svgClasses?.split(" ")[1] === "octicon-file";
        const content: Cheerio = $(item).find("td.content a");
        const relativeLink = content.attr("href")

        // If it is a file...
        if (isFile) {
            const tempFile: FileInterface = {name: "", extension: "", size: "", totalLines: ""};
            // Get the file name
            tempFile.name = content.text();

            // Get the extension. In case the name is such as ".gitignore", the whole name will be considered
            const [filename, extension] = tempFile.name.split(".");
            tempFile.extension = filename === "" ? tempFile.name : extension;

            // Get the total lines and the size. A new request to the file screen will be needed
            const FILEURL = `https://github.com${relativeLink}`;

            const fileRemainingData: {totalLines: string, size: string} = await getFileRemainingData(FILEURL);

            tempFile.totalLines = fileRemainingData.totalLines;
            tempFile.size = fileRemainingData.size;

            tempItem = tempFile;
        } else {
            // Then it is a folder
            tempItem = {name: content.text(), url: `https://github.com${relativeLink}`}

            // Got stuck here!
            
        }

        return tempItem;
    }).get();

    const files: any[] = await Promise.all(promises);

    return files;
}

export default getRowData;