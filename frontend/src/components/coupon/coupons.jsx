import React,{useEffect,useState} from 'react'
import { Button} from 'react-bootstrap'
import AboutPage from '../admin/aboutPage/aboutPage'
import NavBar from '../navbar/navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function Coupon() {
  
  const sessionToken=localStorage.getItem('token')
  const [data,setData]=useState([])
  const getData=async ()=>{
  const user=JSON.parse(localStorage.getItem('data'))
  await fetch('http://localhost:8020/appData/api/user/getUser/'+user._id,
  {
    headers:{
      'Content-Type':'application/json'
      ,'Authorization':localStorage.getItem('token')
    }
  })
  .then(res=>res.json()).then(data=>{
    setData(data.userData.coupons)
  })
  return (data)  
}  


useEffect(()=>{
  (
    async ()=>{
      await getData()
    } 
  )()
},[])

const provideDiscount=(row)=>{
      fetch('http://localhost:8020/discountData/updateUserCoupon/'+row._id,{
        method:'PUT',
      }).then(res=>res.json()).then(data=>alert('Code Copied!!'))
  }

 
  if(data.length==0){
    return(
      <>
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
      <AboutPage title="Coupons"></AboutPage>
      <h2 className='mt-5'><strong>There are no coupons available</strong></h2>
      </>
    )
  }

else{

  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Coupons"></AboutPage>
    
     <center>
     <Table  aria-label="a dense table" className="mt-5" style={{minWidth:'400px',width:'40vw'}}>
        <TableHead>
          <TableRow style={{backgroundColor:'lightblue'}}>
            <TableCell style={{fontWeight:'bolder',color:'black'}}>Coupon</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'black'}} align="right">Percentage</TableCell>           
            <TableCell style={{fontWeight:'bolder',color:'black'}} align="right">Copy</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.coupon}
              </TableCell>
              <TableCell align="right">{row.discount}</TableCell>
              
              <TableCell align="right">
                <Button variant='outline-info' onClick={() => {navigator.clipboard.writeText(row.coupon);alert('Code Copied!!')}}>Copy</Button>
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
export default Coupon
