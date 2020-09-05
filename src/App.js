import React, {useState} from 'react';
import PdfViewer from './components/PdfViewer'
import {Button} from 'antd';
import pdf from './assets/test.pdf'
import './App.css';

function App() {

  const [showPdf, setShowPdf] = useState(false)

  return (
    <div className="App">
      <PdfViewer pdf={pdf}
                 onCancel={()=>setShowPdf(false)}
                 visible={showPdf}
      />
      <Button onClick={()=>setShowPdf(!showPdf)}>Show PdfViewer</Button>
    </div>
  );
}

export default App;