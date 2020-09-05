import React, {useState} from "react";
import "antd/dist/antd.css";
import '../App.css';
import {Modal, Button} from "antd";
import {ZoomInOutlined, ZoomOutOutlined} from '@ant-design/icons';
import PDF from "react-pdf-js";
const PdfViewer = ({pdf, onCancel, visible})=> {

    const [myPdf, setMyPdf] = useState(null);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(null);
    const [scale, setScale] = useState(1);
  
    const onDocumentComplete = (numPages) =>{
      setPages(numPages)
    }
  
    const onDocumentError = (err) => {
      console.error('pdf viewer error:', err);
    }

    const onSetScale = (type) =>{

        var newScale = type ? scale + 0.1 : scale - 0.1;

        if (newScale > 2){
            newScale = 2
        } else if (newScale < 0.1){
            newScale = 0.1
        }

        setScale(newScale)
        
    }
  
    const onPage = (type) =>{
  
      var newPage = type ? page + 1 : page - 1
  
      if (newPage > pages){
        newPage = 1
      } else if (newPage < 1){
        newPage = pages
      }
  
      setPage(newPage)
    }

    const zoomStyle = {
        marginLeft: 10,
        cursor: 'pointer'
    }

    const footer = <div className="footer">
       <Button onClick={()=>onPage(0)}>Previous</Button>
       <div>
       <span style={{textAlign: 'center'}}>Page {page} of {pages}</span>
           <ZoomOutOutlined style={{...zoomStyle, opacity: scale === 0.1 ? 0.5 : 1}} onClick={()=>onSetScale(0)}/>
           <ZoomInOutlined style={{...zoomStyle, opacity: scale === 2 ? 0.5 : 1}} onClick={()=>onSetScale(1)}/>
           <span>{Math.round(scale * 100)}%</span>
        </div>
       <Button onClick={()=>onPage(1)}>Next</Button>
    </div>

    return (<Modal maskClosable={false}
                   onCancel={onCancel}
                   visible={visible}
                   width={"50%"}
                   bodyStyle={{height: 600, overflowY: 'auto'}}
                   style={{ top: 20 }}
                   footer={footer}
                
    >
    <div className="pdfWrapper">
        <PDF
            file={pdf}
            onDocumentComplete={onDocumentComplete}
            onDocumentError={onDocumentError}
            page={page}
            scale={scale}
        />
    </div>
    </Modal>)
  
};
export default PdfViewer;