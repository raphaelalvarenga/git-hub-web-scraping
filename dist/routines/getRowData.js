"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const getFileRemaningData_1 = __importDefault(require("../routines/getFileRemaningData"));
const getRowData = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const $ = cheerio_1.default.load(html);
    const promises = $('.files .js-navigation-item').map((i, item) => __awaiter(void 0, void 0, void 0, function* () {
        let tempItem;
        const svgClasses = $(item).find(".icon > svg").attr("class");
        const isFile = (svgClasses === null || svgClasses === void 0 ? void 0 : svgClasses.split(" ")[1]) === "octicon-file";
        const content = $(item).find("td.content a");
        const relativeLink = content.attr("href");
        // If it is a file...
        if (isFile) {
            const tempFile = { name: "", extension: "", size: "", totalLines: "" };
            // Get the file name
            tempFile.name = content.text();
            // Get the extension. In case the name is such as ".gitignore", the whole name will be considered
            const [filename, extension] = tempFile.name.split(".");
            tempFile.extension = filename === "" ? tempFile.name : extension;
            // Get the total lines and the size. A new request to the file screen will be needed
            const FILEURL = `https://github.com${relativeLink}`;
            const fileRemainingData = yield getFileRemaningData_1.default(FILEURL);
            tempFile.totalLines = fileRemainingData.totalLines;
            tempFile.size = fileRemainingData.size;
            tempItem = tempFile;
        }
        else {
            // Then it is a folder
            tempItem = { name: content.text(), url: `https://github.com${relativeLink}` };
            // Got stuck here!
        }
        return tempItem;
    })).get();
    const files = yield Promise.all(promises);
    return files;
});
exports.default = getRowData;
