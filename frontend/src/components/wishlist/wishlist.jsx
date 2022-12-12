import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {BsFillCartPlusFill} from 'react-icons/bs';
import {IoIosHeartDislike} from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './card.css'
import { useState} from "react";
import NavBar from '../navbar/navbar'
import AboutPage from '../admin/aboutPage/aboutPage';
import { Button, Container } from 'react-bootstrap';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';



function WishList() {
  const sessionToken=localStorage.getItem('token')
  const [data, setData] = useState([])
  const addnoti = (msg)=>{
    Store.addNotification({
        message: `${msg}`,
        type: "warning",
        insert: "top-full",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss:{
            duration:2000
        }
      });
}
  //fetching wishlist items
  const getData=async ()=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/getUser/'+user._id,{
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    })
    .then(res=>res.json()).then(data=>setData(data.userData.wishList))
    return (data) 
  } 

  useEffect(()=>{
    (
      async ()=>{
        await getData()  
      } 
    )()
  },[])

  //removing the item from wishlist
  const removeFromWishList=async (val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/product/removeFromWishList/'+val._id+'/'+user._id,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(data=>addnoti('removed from wishlist!!'))
    await getData()
  }

  // adding item from wishlist to cart 
  const addToCart=(val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    fetch('http://localhost:8020/appData/api/user/product/addToCart/'+user._id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      },
      body:JSON.stringify(val)
    }).then(res=>res.json()).then(data=>addnoti('Added To Cart!!'))
    
  }

  //if wishlist is empty 
  if(data.length<1){
    return(
      <>
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
      <AboutPage title="Empty Wishlist"></AboutPage>
      </>
      
    )
  }
    
  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Wishlist"></AboutPage>
    <center>
    <ReactNotifications />
    <Container className='mt-5' style={{minWidth:'400px'}}>
      <Row xs={1} md={2} sm={1} lg={4} className="g-3 ">
      {data.map((element, index) => (
        <Col key={index} className='mb-5'>

          <Card style={{ width: '18rem',border:'2px solid black'}} className="h-100 rounded inp">
            <Card.Img variant="top" src={element.image} style={{width:"100%",  height:"100%" , objectFit: "cover",padding:'2vh' }} />
            <Card.Body style={{textAlign:'left'}}>
              <Card.Title>{element.productName}</Card.Title>
              <Card.Text>
                <strong>Price :${element.cost}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Stock :{
                  (element.stock > 0)? element.stock :"Out Of Stock"
                  }</strong>
              </Card.Text>
              <Stack direction="horizontal" gap={3}>
              <Button variant='light' style={{fontSize:'2vh',fontStyle:'bold',color:'red'}} onClick={()=>{removeFromWishList(element)}}>
              {/* <IoIosHeartDislike style={{fontSize:'4vh',color:'black'}}></IoIosHeartDislike> */}
              remove
              </Button>
              <Button variant="light" style={{fontSize:'2vh',fontStyle:'bold',color:'blue'}} onClick={()=>{
                addToCart(element)
              }}>
              {/* <BsFillCartPlusFill style={{fontSize:'4vh',color:'gold'}}></BsFillCartPlusFill> */}
              Add To Cart
              </Button>
              </Stack>
            </Card.Body>
          </Card>
          
        </Col>
      ))}
    </Row>
    </Container>
    </center>
    </>
  )
}

export default WishList