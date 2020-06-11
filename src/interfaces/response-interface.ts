import RepositoryInterface from "./repository-interface";

export default interface ResponseInterface {
    success: boolean;
    message: string;
    params: RepositoryInterface;
}