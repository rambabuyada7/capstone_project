import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutPage from '../aboutPage/aboutPage';
import { useEffect } from 'react';
import NavBar from '../../navbar/navbar'
import { useNavigate } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

function CreateProduct(){
  const navigate=useNavigate()
  const sessionToken=localStorage.getItem('token')
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    image: '',
    features:'',
    formData:''
    
  });
  const {
    name,
    description,
    price,
    category,
    features,
    quantity,
    image,
    formData
  } = values;
  useEffect(() => {
    
    setValues({ ...values, ['formData']:new FormData() });
    return () => {
      
    }
  }, [])


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
  
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    console.log(image)
      fetch('http://localhost:8020/appData/api/admin/product/addItem',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization':localStorage.getItem('token')
        },
        body: formData
      }).then(res=>res.json()).then(data=>
        addnoti("item added succesfully")).catch(err=>console.log(err))
      
      
      
  }
  
  
  const handleChange=(e)=>{
    const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: value });
      // console.log(e.target.name)
      // if(e.target.name==='image'){
      //   setValues({ ...values, ['imageName']: vls.name });
      //   console.log(value.name)
      // }
    
  }

  
 
  
return (



  <>
  <ReactNotifications />
  <NavBar loginStatus={sessionToken.length>1}></NavBar>
  <AboutPage title="Create Product"></AboutPage>

  <center>
  <Form className='form2' style={{width:'70%', margin:'10vh 0 10vh 0',minWidth:'350px' }}>
      <Form.Group   >
      <Form.Label >Post Image</Form.Label>
      
      <Form.Control className="file" type="file"  name="image" onChange={handleChange}/>
    </Form.Group>
    <br/>


  <Form.Group className="mb-6" controlId="name">
      <Form.Label >Name</Form.Label>
      <Form.Control type="text" placeholder='Enter Product Name' name='name' onChange={handleChange}/>
      
    </Form.Group>
    <Form.Group  className="mb-6" controlId="description">
      <Form.Label >Description</Form.Label>
      <Form.Control type="text" placeholder='Enter Description' name='description' onChange={handleChange}/>
      
    </Form.Group>
    <Form.Group  className="mb-6" controlId="features">
      <Form.Label >Features</Form.Label>
      <Form.Control type="text" placeholder='Enter features' name='features' onChange={handleChange}/>
      
    </Form.Group>
    <Form.Group className="mb-6" controlId="price">
      <Form.Label >Price</Form.Label>
      <Form.Control type="text" placeholder='Enter Your price' name='price' onChange={handleChange}/>
      
    </Form.Group>
    <Form.Group className="mb-6" controlId="brand">
      <Form.Label >Brand</Form.Label>
      <Form.Control type="text" placeholder='Enter Your brand' name='brand' onChange={handleChange}/>
      
    </Form.Group>
   

  
 
    <Form.Group className="mb-6" >
    <Form.Label >Category</Form.Label>
    <Form.Control type="text" placeholder='Enter category' name='category' onChange={handleChange}/>


    </Form.Group>



    <Form.Group className="mb-6" controlId="Quantity">
      <Form.Label >Quantity</Form.Label>
      <Form.Control type="text" placeholder='Enter Quantity' name='quantity' onChange={handleChange}/>
      </Form.Group>

  <br/>

      <Form.Group className="mb-6" >
      
      <Button variant='outline-primary'onClick={handleOnSubmit}>Create Product</Button>

      </Form.Group>


    </Form>
  </center>
  
  </>
  
  

    );
  
    }
    



export default CreateProduct;