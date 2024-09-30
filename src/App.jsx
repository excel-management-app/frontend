import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3001/uploadFile", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      // return result.filePath;
      console.log(result)
    }
    // reader.onload = (e) => {
    //   const text = e.target.result;
    //   const rows = text.split('\n').map(row => row.split(','));
    //   setData(rows);
    // };
    // reader.readAsText(file);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input type="file" onChange={handleFileUpload} />
      <table border="1" style={{ margin: '20px auto', width: '80%' }}>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  );
}

export default App;
