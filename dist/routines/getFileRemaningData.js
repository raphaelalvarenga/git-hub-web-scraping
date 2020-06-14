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
const request_promise_1 = __importDefault(require("request-promise"));
const cheerio_1 = __importDefault(require("cheerio"));
const getFileRemainingData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const fileRemainingData = yield request_promise_1.default(url);
    const $ = cheerio_1.default.load(fileRemainingData);
    // The logic below formats the data required. This is an example of the result: "34 lines (34 sloc) 931 Bytes"
    const formattedData = $(".Box-header .text-mono").text().trim().replace(/\s\s+/g, " ");
    const totalLines = formattedData.split(" (")[0];
    const size = formattedData.split(") ")[formattedData.split(") ").length - 1];
    return { totalLines, size };
});
exports.default = getFileRemainingData;
