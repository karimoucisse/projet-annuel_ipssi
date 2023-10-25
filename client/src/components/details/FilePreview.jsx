const FilePreview = ({ file, fileUrl }) => {
    if (file.fileExtension?.split('/')[0] === 'image') {
        return <img src={fileUrl} alt={file.name} />;
    }
    else if (file.fileExtension?.split('/')[1] === 'pdf') {
        return <iframe src={fileUrl} width="100%" height="500px"> </iframe>
    }
    else if (file.fileExtension?.split('/')[0] === 'video') {
        return (
            <video controls>
                <source src={fileUrl} type={file.fileExtension} />
            </video>
        );
    } else if (file.fileExtension?.split('/')[0] === 'audio') {
        return (
            <audio controls>
                <source src={fileUrl} type={file.fileExtension} />
            </audio>
        );
    } else {
        return (
            <div>
                <p>Ce type de fichier n'est pas pris en charge pour la prévisualisation.</p>
                <p>Mettre lien pour le télécharger</p>
            </div>
        );
    }
}

export default FilePreview;