import React, { useState } from 'react';
import Stage from './Stage';
import FileComponent from './FileComponent';

const App: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  return (
    <div className='viewer-container'>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <Stage width="400px" height="400px">
          <FileComponent file={file} />
        </Stage>
      )}
    </div>
  );
};

export default App;