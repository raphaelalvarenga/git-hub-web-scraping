import FolderInterface from "./folder-interface";
import FileInterface from "./file-interface";

export default interface ResponseInterface {
    success: boolean;
    message: string;
    folders?: FolderInterface[];
    files?: FileInterface[];
}