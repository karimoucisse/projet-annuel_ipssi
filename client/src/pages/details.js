import { useEffect, useRef, useState } from "react";
import { fileService } from '../_services/file.service';
import { useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import FilePreview from "../components/details/FilePreview";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const Details = () => {
    const [file, setFile] = useState([]);
    const flag = useRef(false);
    const { fileId } = useParams();
    const BASE_URL = 'http://localhost:3000/';

    const fetchData = async () => {
      await fileService.getFileById(fileId)
        .then(res => {
          console.log(res.data);
          setFile(res.data);
        })
        .catch(err => console.log(err));
    }

    const downloadFile = async (file) => {
      await fileService.downloadFile(file.fileId)
        .then((res) => {
            const url = `data:${file.fileExtension};base64,${res.data}`;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name); // TODO: revoir nom
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (flag.current === false) {
          fetchData();
        }

        return () => flag.current = true;
    }, []);

    return (
        <div className="detail">
            <small>Fichier uploadé le {file.createdAt}</small>
            <h3>{file.name}</h3>
            <p>Fichier du type: {file.fileExtension}</p>
            <FilePreview file={file} fileUrl={BASE_URL + 'file/stream/' + file.fileId} />
            <button onClick={() => downloadFile(file)}>Télécharger</button>
        </div>
    );
};

export default Details;