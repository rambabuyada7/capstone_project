import {React,useState} from 'react'
import {Nav} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import AboutPage from '../aboutPages/aboutPages';
import './style.css'
//import './style.css'
const Dashboard = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
    
  return (
    <>
    
    <AboutPage title="Admin Dashboard"></AboutPage>
   
    <div className='container-fluid'>
        <div className="row">
          <div className='col-1' style={{height:"100vh"}}>
          <Nav className="d-none bg-info d-md-block  sidebar" >
                <div className="sidebar-sticky"></div>
            <Nav.Item className=" my-3" variant='dark'>
                <Nav.Link href='/orders' className='text-dark' style={{fontWeight:"bold"}} >Go To Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" variant='dark'>
                <Nav.Link href='/createproduct' className='text-dark' style={{fontWeight:"bold"}} >Create New Product</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/bulkupload' className='text-dark' style={{fontWeight:"bold"}} >Bulk Upload</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/manageproducts' className='text-dark' style={{fontWeight:"bold"}} >Manage Products</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/manageusers' className='text-dark' style={{fontWeight:"bold"}} >Manage Users</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/productstatus' className='text-dark' style={{fontWeight:"bold"}} >Product Status</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/salereport' className='text-dark' style={{fontWeight:"bold"}} >Sales Report</Nav.Link>
            </Nav.Item>
            <Nav.Item className=" my-3" >
                <Nav.Link href='/discount' className='text-dark' style={{fontWeight:"bold"}} >Discount</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item className=" my-3" >
                <Nav.Link href='/' className='text-white' >Shop</Nav.Link>
            </Nav.Item> */}
            </Nav>
          </div>
          <div className='col-11'>
          <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="First slide"
          width="700px"
          height= "600px"
        />
        <Carousel.Caption>
          <h3>GL Store</h3>
          <p>Perfect Shop for Shopping.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Second slide"
          width="700px"
          height= "600px"
        />

        <Carousel.Caption>
          <h3>GL Store</h3>
          <p>Perfect Shop for Shopping.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Third slide"
          width="700px"
          height= "600px"
        />
        <Carousel.Caption>
          <h3>GL Store</h3>
          <p>
            Perfect Shop for Shopping.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        {/* </Container> */}
          </div>
        </div>
      </div>
    
    </>

  );
}

export default Dashboard;