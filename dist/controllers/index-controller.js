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
const getRowData_1 = __importDefault(require("../routines/getRowData"));
const indexController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This variable will be populated with all files in the project
    const files = [];
    const REPOURL = req.body.url;
    const repoResponse = yield request_promise_1.default(REPOURL);
    // First thing is create an array of <tr> tag that represents the file/folders the repo delivers when the page starts
    const rowData = yield getRowData_1.default(repoResponse);
    console.log("This is the files data:");
    console.log(rowData);
    return res.json(rowData);
});
exports.default = indexController;
