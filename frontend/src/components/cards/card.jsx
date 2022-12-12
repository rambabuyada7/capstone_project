import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import './card.css'
import { useState} from "react";
import { memo } from 'react';
import { Container } from 'react-bootstrap';
import '../style.css'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';


function CardBody({data}) {
  const [infoData,setInfo]=useState({})
  

 const addnoti = (msg)=>{
  Store.addNotification({
      message: `${msg}`,
      type: "success",
      insert: "top-full",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss:{
          duration:2000
      }
    });
}
  const infoAdjust=()=>{ 
    var names=[]
    var sales={}
    for(let i=0;i<data.length;i++){
        if(names.indexOf(data[i].category)===-1){
          names=[...names,data[i].category]
          sales[data[i].category]=[]
          }
    }
    names.forEach((value)=>{
      for(let i=0;i<data.length;i++){
          if(data[i].category===value){
            sales[value]=[...sales[value],data[i]]
          }
        }})
      console.log("sales=",sales)
      setInfo(sales)
      return sales
  }

  useEffect(()=>{
    (
      async ()=>{ 
      setInfo(infoAdjust())
        
      } 
    )()
  },[])

  const addToWishList=(val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    fetch('http://localhost:8020/appData/api/user/product/addToWishList/'+user._id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      },
      body:JSON.stringify(val)
    }).then(res=>res.json()).then(data=> addnoti("added to wishlist!")).catch(err=>console.log(err))  
  }

  const addToCart=(val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    fetch('http://localhost:8020/appData/api/user/product/addToCart/'+user._id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      },
      body:JSON.stringify(val)
    }).then(res=>res.json()).then(data=>addnoti("Added to cart!"))
    
  }
   
  return (
    <>
    <div style={{right:'0px'}}>
      <center>
      <Container>
      <Row xs={1} md={2} sm={1} lg={3}>
      {data.map((element, index) => (
        <Col key={index} className='my-5 '> 
          <Card style={{ width: '19rem',border:'2px solid black'}} className="h-100 inp ok rounded" >
            <Card.Img variant="top" src={element.image} style={{width:"100%",  height:"100%" , objectFit: "cover" }} />
            <Card.Body style={{textAlign:'left'}}>
              <Card.Title>{element.productName}</Card.Title>
              <Card.Text>
                <strong>Price :${element.cost}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Stock :{
                  (element.stock>0)? element.stock:"Out Of Stock"
                  }</strong>
              </Card.Text>
              {
                ((localStorage.getItem('type'))==='user') && (
                  <Stack direction="horizontal" gap={3}>
              <Button variant="light" style={{fontSize:'2vh',color:'red',fontStyle:'bold'}}  onClick={()=>{
                addToWishList(element);
                
              }}>
                
                Add to Wishlist
              </Button>
              
              <div className="vr" />
              <Button variant="light" style={{fontSize:'2vh',color:'blue',fontStyle:'bold'}} onClick={()=>{
                addToCart(element);

              }}>
              
              Add to Cart
              </Button>
              
              </Stack>
                )
              }
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
      </center>
    
    </div>
    </>
  )
}

export default memo(CardBody);