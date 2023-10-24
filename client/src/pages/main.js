import { useEffect, useRef, useState } from 'react';
import { fileService } from '../_services/file.service';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { accountService } from '../_services/account.service';

const Main = () => {
  const [files, setFiles] = useState([]);
  const flag = useRef(false);
  const BASE_URL = 'http://localhost:5000/'; // TODO: METTRE DANS LE .ENV
  const [newFile, setNewFile] = useState('');

  useEffect(() => {
    if (flag.current === false) {
      fileService
        .getAllFiles()
        .then((res) => {
          console.log(res.data);
          setFiles(res.data);
        })
        .catch((err) => console.log(err));
      accountService
        .getStorage()
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }

    return () => (flag.current = true);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newFile);
    fileService
      .uploadFile(newFile)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const addStorage = async () => {
    await accountService
      .addStorage({ subscription: '1' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    await accountService
      .payment({ subscription: '1', userId: accountService.getUserId() }) // L'utilisateur passe au paiement
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewFile(e.target.files[0]);
    }
  };

  return (
    <div className="files">
      Liste des fichiers
      <div>
        <button onClick={addStorage}>Ajouter du stockage</button>
      </div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="group">
          <label htmlFor="file">Fichier</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <div className="group">
          <button>Upload le fichier</button>
        </div>
      </form>
      <div>
        {files.map((file) => (
          <div key={file._id}>
            <h3>{file.name}</h3>
            <p>Upload le {file.createdAt}</p>
            <img
              src={BASE_URL + 'file/stream/' + file.fileId}
              alt={file.name}
            />
            <Link to={`/details/${file._id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
