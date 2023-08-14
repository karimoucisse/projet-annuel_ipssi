import { useEffect, useRef, useState } from "react";
import { fileService } from '../_services/file.service';
import { useParams } from "react-router-dom";

const Details = () => {
    const [file, setFile] = useState([]);
    const flag = useRef(false);
    const { fileId } = useParams();
    const BASE_URL = 'http://localhost:3000/';

    useEffect(() => {
        if(flag.current === false){
            fileService.getFileById(fileId)
                .then(res => {
                    console.log(res.data);
                    setFile(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    return (
        <div className="detail">
            <small>Fichier uploadé le {file.createdAt}</small>
            <h3>{file.name}</h3>
            <p>Fichier du type: {file.fileExtension}</p>
            <img src={BASE_URL+'file/stream/'+file.fileId} alt={file.name} />

        </div>
    );
  };
  
  export default Details;