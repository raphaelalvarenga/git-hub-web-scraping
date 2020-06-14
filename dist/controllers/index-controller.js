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
    let repoResponse = "";
    let response = { success: false, message: "", files: [], folders: [] };
    try {
        repoResponse = yield request_promise_1.default(REPOURL);
        // First thing is create an array of <tr> tag that represents the file/folders the repo delivers when the page starts
        const rowData = yield getRowData_1.default(repoResponse);
        // Setting success in the request
        response = Object.assign(Object.assign({}, response), { success: true });
        // Building folders and files parameters in the response
        rowData.map(data => {
            var _a, _b;
            // Does the data have URL?
            if (data.url) {
                // Then, it's a folder! But unfortunately, git creates some hidden and nameless folders. So...
                if (data.name !== "") {
                    // ...we need to consider only those that have name
                    (_a = response.folders) === null || _a === void 0 ? void 0 : _a.push(data);
                }
            }
            else {
                // Otherwise, it's a file!
                (_b = response.files) === null || _b === void 0 ? void 0 : _b.push(data);
            }
        });
    }
    catch (error) {
        response = Object.assign(Object.assign({}, response), { message: "Something went wrong. Please, check the link you're searching or contact the IT team..." });
    }
    return res.json(response);
});
exports.default = indexController;
