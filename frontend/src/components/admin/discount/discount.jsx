import React,{useEffect,useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import AboutPage from '../aboutPage/aboutPage'
import NavBar from '../../navbar/navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';



function Discount() {
 
  const sessionToken=localStorage.getItem('token')
  const [data,setdata]=useState([])
  const [discount,setDiscount]=useState(0)
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  const getData=()=>{
    fetch('http://localhost:8020/appData/api/admin/getUsers',{
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
      
    }).catch(err=>console.log(err))
  }
  useEffect(()=>{
    (
      async ()=>{
        await getData()
        console.log("here",data) 
      } 
    )()
  },[])
  
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
  const provideDiscount=(row)=>{
      fetch('http://localhost:8020/discountData/updateUserCoupon/'+row._id,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({coupon:makeid(),discount:discount})
      }).then(res=>res.json()).then(data=>addnoti("Discount Coupon Applied"))
  }

 
  if(data.length===0){
    return(
      <>
      <ReactNotifications />
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
      <AboutPage title="No Discount Coupons"></AboutPage>
      
      </>
    )
  }

else{

  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Coupons"></AboutPage>
    
     <center>
     <Table  aria-label="a dense table" className="mt-5" style={{minWidth:'400px',width:'50vw'}}>
        <TableHead>
          <TableRow style={{backgroundColor:'lightblue'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>User Name</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">User Mail</TableCell>           
            
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Percentage</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Create Discount</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell align="right">{row.userMail}</TableCell>
              <TableCell component="th" scope="row">
                <center>
                <Form.Control 
                  type="number"
                  style={{width:'5vw'}}
                  onChange={(e)=>{setDiscount(e.target.value)}}></Form.Control>
                </center> 
                </TableCell>   
              <TableCell align="right">
                <Button variant='outline-info' onClick={()=>{provideDiscount(row)}}>Add Discount</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </center>
    </>
  )
}
}
export default Discount
