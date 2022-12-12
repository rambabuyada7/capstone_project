import React,{useEffect,useState} from 'react'
import { Button, } from 'react-bootstrap'
import AboutPage from '../aboutPages/aboutPages'
import NavBar from '../../navbar/navbar'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

function ManageProducts() {
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
  
  const sessionToken=localStorage.getItem('token')
  const navigate=useNavigate()
  const [data,setdata]=useState([{}])
  const getData=()=>{
    fetch('http://localhost:8020/appData/api/admin/product/getItems',{
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    }).then(res=>res.json())
    .then(data=>{
      if(data.message){
        setdata([])
      }
      else{
        setdata(data)
      }
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const deleteProduct=(ele)=>{
    fetch('http://localhost:8010/api/admin/product/delete/'+ele,{
      method:'DELETE',
      headers:{
        
        'Authorization':localStorage.getItem('token')
      }
    }).then(res=>res.json())
    .then(data=>{
      addnoti("Product Deleted Successfully!!")
      console.log(data)
    }).catch(err=>console.log(err))
    getData()
  }

  return (
    <>
    <ReactNotifications />
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Manage Products"></AboutPage>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="a dense table">
        <TableHead>
          <TableRow style={{backgroundColor:'lightblue'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Category</TableCell>           
          <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Stock</TableCell>           
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Update</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productName}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              
              <TableCell align="right">
                <Button variant='outline-info' onClick={()=>{navigate('/updateproduct/'+row._id)}}>Update</Button>
              </TableCell>
              <TableCell align="right">
              <Button variant='outline-danger' onClick={()=>{deleteProduct(row._id)}}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default ManageProducts