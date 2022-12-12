import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AboutPage from '../aboutPage/aboutPage'
import NavBar from '../../navbar/navbar'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

//bulk upload componenet
function BulkUpload() {
  const sessionToken=localStorage.getItem('token')
  const [selectFile,setSelectFile]=useState(null)
  const addnoti = (msg)=>{
    Store.addNotification({
        message: `${msg}`,
        type: "info",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss:{
            duration:2000
        }
      });
}
    const submitFile=(e)=>{
    const formData = new FormData();
    formData.append(
      "file",
      selectFile,
      selectFile.name
    );
    fetch('http://localhost:8020/bulkUpload', {
      method: 'POST',
      headers:{
        'Authorization':localStorage.getItem('token')
      },
      body: formData,
    })
      .then((response) => {return response.json();})
      .then(data=>addnoti("File Uploaded Successfully"))
      .catch((err) => {console.log(err)});
  }
  
  return (
    <>
    <ReactNotifications />
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Bulk Upload"></AboutPage>
    <center>
    <div className='mt-5'>
    <Form.Group controlId="formFile" className="mb-3" style={{width:'50vw'}}>
        <Form.Label>Upload CSV file </Form.Label>
        <Form.Control type="file" size='lg'
        onChange={(e)=>{
          setSelectFile(e.target.files[0])
        }}
        
        />
    </Form.Group>
    <Button variant="primary" onClick={submitFile}>Submit</Button>
    </div>
    </center>
    
    </>
  )
}

export default BulkUpload