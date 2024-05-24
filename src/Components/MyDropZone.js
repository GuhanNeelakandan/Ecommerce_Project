import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './MyDropZone.css'; // Create and import your own styles

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the accepted files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {
        isDragActive ? 
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default MyDropzone;