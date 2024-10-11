import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [fileName, setFileName] = useState('');
  const [dirName, setDirName] = useState('');

  // Fetch all files and directories on component mount
  useEffect(() => {
    // Get all files
    axios.get('http://localhost:8000/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error(error));

    // Get all directories
    axios.get('http://localhost:8000/directories')
      .then(response => setDirectories(response.data))
      .catch(error => console.error(error));
  }, []);

  // Create a new file
  const createFile = () => {
    axios.post('http://localhost:8000/files/create', { name: fileName })
      .then(response => {
        alert(response.data.success);
        setFiles([...files, fileName]); // Update file list
      })
      .catch(error => console.error(error));
  };

  // Delete a file
  const deleteFile = (file) => {
    axios.delete(`http://localhost:8000/files/delete/${file}`)
      .then(response => {
        alert(response.data.success);
        setFiles(files.filter(f => f !== file)); // Remove from the file list
      })
      .catch(error => console.error(error));
  };

  // Create a new directory
  const createDirectory = () => {
    axios.post('http://localhost:8000/directories/create', { name: dirName })
      .then(response => {
        alert(response.data.success);
        setDirectories([...directories, dirName]); // Update directory list
      })
      .catch(error => console.error(error));
  };

  // Delete a directory
  const deleteDirectory = (dir) => {
    axios.delete(`http://localhost:8000/directories/delete/${dir}`)
      .then(response => {
        alert(response.data.success);
        setDirectories(directories.filter(d => d !== dir)); // Remove from the directory list
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>File Management System</h1>

      {/* Create File */}
      <div>
        <h2>Create File</h2>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
        <button onClick={createFile}>Create File</button>
      </div>

      {/* List Files */}
      <div>
        <h2>Files</h2>
        <ul>
          {files.map(file => (
            <li key={file}>
              {file} 
              <button onClick={() => deleteFile(file)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Directory */}
      <div>
        <h2>Create Directory</h2>
        <input
          type="text"
          value={dirName}
          onChange={(e) => setDirName(e.target.value)}
          placeholder="Enter directory name"
        />
        <button onClick={createDirectory}>Create Directory</button>
      </div>

      {/* List Directories */}
      <div>
        <h2>Directories</h2>
        <ul>
          {directories.map(directory => (
            <li key={directory}>
              {directory} 
              <button onClick={() => deleteDirectory(directory)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
