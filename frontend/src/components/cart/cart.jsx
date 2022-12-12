import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {BsCartDash} from 'react-icons/bs'
import {FiPlusSquare,FiMinusSquare} from 'react-icons/fi'
import './card.css'
import { useState} from "react";
import NavBar from '../navbar/navbar'
import AboutPage from '../admin/aboutPage/aboutPage';
import { Button, Container} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Thankyou from '../thankyou/thankyou';
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';




function Cart() {
  const sessionToken=localStorage.getItem('token')
  const [data, setData] = useState([])
  const [itemInfo, setItemInfo] = useState([])
  const [totalData, setTotalData] = useState([])
  const [alert, setAlert] = useState('')
  const [count, setCount] = useState(0)
  const [price,setPrice]=useState(0)
  const [quantity,setQuantity]=useState(1)
  const [address,setAddress]=useState('')
  const [alertState,setAlertState]=useState(false)
  const [discount,setDiscount]=useState(0)
  const [coupon,setCoupon]=useState([])
  const [couponName,setCouponName]=useState('')
  const navigate=useNavigate()
  
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
  //getting all cart items
  const getData=async ()=>{
    setPrice(0)
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/getUser/'+user._id,
    {
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    })
    .then(res=>res.json()).then(data=>{
      setCoupon(data.userData.coupons)
      setData(data.userData.cartList)
      setItemInfo(data.itemData)
      console.log(data.itemData)
      setCount(data.userData.cartList.length)
      var idArray=[]
      for(let i=0;i<data.userData.cartList.length;i++){
        data.userData.cartList[i].quantity=0
      }
      
      // setTotalData(data.itemData)
    })
    return (data)  
  }  
  
  
  useEffect(()=>{
    (
      async ()=>{
        await getData()
        setTotalData(JSON.parse(localStorage.getItem('data')))
      } 
    )()
  },[])
  
//removing from cart
  const removeFromCart=async (val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/product/removeFromCart/'+val._id+'/'+user._id,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(data=>console.log(data))
    await getData()
  }

// performing purchase
  const performPurchase=async()=>{
    
    if(!address.length){
      // setAlertState(true)
      // setAlert('Address shoudn\'t be empty!')
      
      addnoti('Please provide address')
    }
    else{
      for(let i=0;i<data.length;i++){
        if(data[i].quantity<1){
          // setAlertState(true)
          // setAlert('The number of items shouldn\'t be less than 1')
          addnoti('The number of items should not be less than 1')
          return
        }
      }

      for(let i=0;i<data.length;i++){
        const user=JSON.parse(localStorage.getItem('data'))
        const info={
          productId:data[i]._id,
          productName:data[i].productName,
          cost:data[i].cost,
          quantity:data[i].quantity,
          userName:user.userName,
          userId:user.userId,
          address:address
        }
        
        //placing order
        await fetch('http://localhost:8020/appData/api/user/order/placeOrder',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
            ,'Authorization':localStorage.getItem('token')
          },
          body:JSON.stringify(info)
        }).then(res=>res.json()).then(data=>data).catch(err=>console.log(err))
        
      }

      //updating stock after order being placed
      for(let i=0;i<itemInfo.length;i++){
        await fetch('http://localhost:8020/appData/api/admin/product/updatestock/'+itemInfo[i]._id,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
            ,'Authorization':localStorage.getItem('token')
          },
          body:JSON.stringify({stock:itemInfo[i].stock})
        }).then(res=>res.json()).then(data=>data).catch(err=>console.log(err))
      }
      navigate('/thankyou')
    }
  }

  //coupon being applied
  const changePrice=(val)=>{
    const validDiscount=coupon.filter((ele)=>ele.coupon===couponName)[0]
    if(!validDiscount){
      addnoti('invalid Coupon!!')
    }
    else{
    if(price>0){
      fetch('http://localhost:8020/discountData/useUserCoupon/'+totalData._id,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(validDiscount)
      }).then(res=>res.json()).then(data=>{
        addnoti('discount provided')
        setPrice(price-Math.round(price*validDiscount.discount/100))
        setDiscount(1)
      })
    }}

  }
   
//if cart is empty
  if(count<1){
    return(
      <>
       <ReactNotifications />
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
      <AboutPage title="Empty Cart"></AboutPage>
      </>  
    )
  }
    
  return (
    <>
     
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <ReactNotifications />
    <AboutPage title="Cart"></AboutPage>
    
    <div className='mt-5 mb-5 h-100'>
      
      <Container className='mt-5 h-50'>
      <Row style={{boxSizing:'border-box'}} md={1} lg={2} sm={1} xs={1} >
        <Col > 

      {data.map((element, index) => (
        <Row key={index} xs={1} md={1} className="g-3" style={{height:'40vh'}}>
        <Col key={index} style={{width:'100%',height:'100%'}}>
          <Card style={{ width: '80%',height:'80%' ,backgroundColor:'lightblue',border:'2px solid black'}} className="mb-5 rounded inp">
            <Row className=" h-100 mb-5">
              <Col>
            <Card.Img variant="top" src={element.image} style={{width:"90%",  height:"90%" , objectFit: "cover",padding:'2vh',boxSizing:'border-box' }} />
            </Col>
            <Col>
            <Card.Body style={{textAlign:'left'}}>
              <Card.Title>{element.productName}</Card.Title>
              <Card.Text>
                <strong>Price :${element.cost}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Stock :{
                  (element.stock>0)? element.stock :"Out Of Stock"
                  }</strong>
              </Card.Text>
              <Stack direction="horizontal" gap={3}>
                <Button variant='light' onClick={()=>{
                removeFromCart(element)
              }}>
                  
                <BsCartDash style={{fontSize:'4vh',color:'red'}}></BsCartDash>
                </Button>
                
              <>
              <Button variant='light' onClick={()=>{
                console.log(element.quantity,itemInfo.find(x=>x._id===element._id).stock+1)
                  if(element.quantity>1) {
                    element.quantity=element.quantity-1
                    console.log("====",element.quantity)
                    setPrice(price+element.cost);
                    itemInfo.find(x=>x._id===element._id).stock=itemInfo.find(x=>x._id===element._id).stock+1
                  }
                  console.log(element.quantity)}}>
                  <FiMinusSquare></FiMinusSquare>
                </Button>
                <p ><strong>{element.quantity}</strong></p>
              <Button variant='light' onClick={()=>{
                console.log(quantity,itemInfo.find(x=>x._id===element._id).stock-1)
                if(element.quantity<element.stock-2) {
                  element.quantity=element.quantity+1
                  setPrice(price+element.cost);
                  itemInfo.find(x=>x._id===element._id).stock=itemInfo.find(x=>x._id===element._id).stock-1
                }
                console.log(element.quantity) 
              }}>
                <FiPlusSquare ></FiPlusSquare>
              </Button>
              </>
                
              </Stack>
            </Card.Body>
            </Col>
            </Row>
          </Card>
        </Col>
        </Row>
      ))}
    
    </Col>
    <Col style={{border:'2px'}}>
    {

      (discount===0) && (
        <>
        <center>
        <Form.Control placeholder='Paste Coupon Here... ' style={{width:'100%'}} type="text" onChange={(e)=>{setCouponName(e.target.value)}}></Form.Control>
        <Button className='mb-3 mt-2' variant='outline-info' 
        onClick={()=>{changePrice()}}>Apply</Button>
        </center>
       </>
        )

    }

    
    <hr className='w-70'/>
      <h3 className='mt-5'>Total Price :${price}</h3>
    <FloatingLabel controlId="floatingTextarea2" label="Address" className='mt-5'>
        <Form.Control
          as="textarea"
          placeholder="Address"
          style={{ height: '50px' }}
          onChange={(e)=>{
            setAddress(e.target.value)
          }}
        />
      </FloatingLabel>
    <Button className='mt-5' onClick={()=>{
      performPurchase()
    }}>Buy Now</Button>
    </Col>
      </Row> 
      </Container>
    </div>
    </>
  )
}

export default Cart