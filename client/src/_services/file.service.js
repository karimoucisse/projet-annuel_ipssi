import Axios from "./caller.service";

let getAllFiles = () => {
    return Axios.get('/file/files');
}

let uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return Axios.post('/file/upload', formData);
}

let displayFile = (fileId) => {
    return Axios.get('/file/stream/'+fileId);
}

let getFileById = (fileId) => {
    return Axios.get('/file/files/'+fileId);
}

let deleteFile = (fileId) => {
    return Axios.delete('/file/'+fileId);
}

export const fileService = {
    getAllFiles,
    uploadFile,
    displayFile,
    getFileById,
    deleteFile
}