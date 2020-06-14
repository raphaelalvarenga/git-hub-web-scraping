import FolderInterface from "./folder-interface";
import FileInterface from "./file-interface";
import FileExtensionInterface from "./file-extension-interface";

export default interface ResponseInterface {
    success: boolean;
    message: string;
    folders: FolderInterface[];
    files: FileExtensionInterface[]
}