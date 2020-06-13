import request from "request-promise";
import cheerio from "cheerio";
import FileInterface from "../interfaces/file-interface";
import getFileRemainingData from "../routines/getFileRemaningData";

const getRowData = async (html: string): Promise<FileInterface[]> => {

    const $ = cheerio.load(html);    

    const promises: any[] = $('.files .js-navigation-item').map(async (i: number, item: CheerioElement) => {
        const tempFile: FileInterface = {name: "", extension: "", size: "", totalLines: ""};
        const svgClasses = $(item).find(".icon > svg").attr("class");
        const isFile = svgClasses?.split(" ")[1] === "octicon-file";
        const content: Cheerio = $(item).find("td.content a");
        const relativeLink = content.attr("href")

        // If it is a file...
        if (isFile) {
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
        } else {
            // Then it is a folder

            // Got stuck here!
            const folderResponse: string = await request(`https://github.com${relativeLink}`);
            const subFiles: FileInterface[] = await getRowData(folderResponse);
        }

        return tempFile;
    }).get();

    const files: FileInterface[] = await Promise.all(promises);

    return files;
}

export default getRowData;