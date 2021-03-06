import request from "request-promise";
import cheerio from "cheerio";

const getFileRemainingData = async (url: string): Promise<{totalLines: string, size: string}> => {

    // Let's get the file data
    const fileRemainingData: string = await request(url);
    const $ = cheerio.load(fileRemainingData);

    // The logic below formats the data required. This is an example of the result: "34 lines (34 sloc) 931 Bytes"
    const formattedData: string = $(".Box-header .text-mono").text().trim().replace(/\s\s+/g, " ");

    const totalLines: string = formattedData.split(" (")[0];
    const size: string = formattedData.split(") ")[formattedData.split(") ").length - 1];

    return {totalLines, size};
}

export default getFileRemainingData;