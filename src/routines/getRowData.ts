import request from "request-promise";
import cheerio from "cheerio";
import FileInterface from "../interfaces/file-interface";
import getFileRemainingData from "../routines/getFileRemaningData";

const getRowData = async (html: string): Promise<FileInterface[]> => {

    const $ = cheerio.load(html);
    let files: FileInterface[] = [];
    
    $("tr.js-navigation-item").map(async (i: number) => {
        let tempFile: FileInterface = {name: "", extension: "", size: "", totalLines: ""};
        const svgClasses = $("tr.js-navigation-item").eq(i).find("svg").attr("class");

        // If the second class is "octicon-file", then it is a file. Otherwise it is a folder
        const isFile = svgClasses?.split(" ")[1] === "octicon-file";

        if (isFile) {
            // Get the file name
            tempFile.name = $("tr.js-navigation-item").eq(i).find("td.content").find("a").text();

            // Get the extension. In case the name is such as ".gitignore", the whole name will be considered
            tempFile.extension = tempFile.name.split(".")[0] === "" ? tempFile.name : tempFile.extension = tempFile.name.split(".")[1];

            // Get the total lines and the size. A new request to the file screen will be needed
            const FILEURL = `https://github.com${$("tr.js-navigation-item").eq(i).find("td.content").find("a").attr("href")}`;

            const fileRemainingData: {totalLines: string, size: string} = await getFileRemainingData(FILEURL, tempFile);

            tempFile.totalLines = fileRemainingData.totalLines;
            tempFile.size = fileRemainingData.size;

        } else {

        }

        files.push(tempFile);
    });

    return files;
}

export default getRowData;