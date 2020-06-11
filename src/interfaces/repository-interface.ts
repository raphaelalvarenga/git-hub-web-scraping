import FileInterface from "./file-interface";
import FolderInterface from "./folder-interface";

export default interface RepositoryInterface {
    files?: FileInterface[];
    folders?: FolderInterface[];
}