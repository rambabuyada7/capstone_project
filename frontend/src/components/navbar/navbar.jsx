import React from 'react'
import {Navbar,Nav,} from "react-bootstrap";
import "./navbar.css"
import { FaSignInAlt } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import {NavLink,Link, useNavigate} from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Button from "react-bootstrap/Button"; 


const NavBar = (props) => {
    
  const navigate=useNavigate()
   
  //for giving style to navlink button
  const navLinkStyle = ({isActive}) => {
    return{
      fontWeight: isActive ? 'bold' :'normal',
      backgroundColor: isActive ? 'blue' : 'none',
      color: isActive ? 'white' : 'none',
      textDecoration: isActive ? 'none' : 'none'
    }
  }
    
  return (
    <Navbar  style={{borderBottom:'2px solid black',minWidth:'400px',backgroundColor:'lightblue'}}>
        
            <Navbar style={{marginLeft:'5vw'}}>
                 <strong style={{fontFamily:' “Playfair Display”, “Didot”, "Times New Roman", Times, sans-serif',color:'blue'}}>GL Store</strong>
            </Navbar>
            
            <Nav className={'ms-auto'} style={{marginRight:'5vw'}}>
            <Stack  direction='horizontal' className="stack">
                <NavLink to='/' style={navLinkStyle} >
                {/* <div className='divs'> */}
                {/* <AiFillShop  style={{fontSize:'4vh'}}>

                </AiFillShop> */}
                <span style={{paddingLeft:'0.5vw',marginRight:'2vh',fontSize:'60%'}}>Shop</span>
                {/* </div> */}
                </NavLink>
                
            {
              // if user is login then navbar will show below links
                (props.loginStatus && (localStorage.getItem('type'))==='user') && (
                    <>
                     <NavLink to='/wishlist' style={navLinkStyle}>
                     {/* <div className='divs'> */}
                        
                         {/* <FaHeart style={{fontSize:'4vh'}}>
                         </FaHeart> */}
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%',marginRight:'2vh',textDecoration:'none'}}>Wishlist</span>
                     {/* </div> */}
                     </NavLink>
                     <NavLink to='/cart' style={navLinkStyle} >
                    {/* <div className='divs'> */}
                         {/* <FaShoppingCart style={{fontSize:'4vh'}}>
                         </FaShoppingCart>  */}
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%',marginRight:'2vh'}}>Cart</span>
                     {/* </div> */}
                    </NavLink>
                     <NavLink to='/coupons' style={navLinkStyle} >
                    {/* <div className='divs'> */}
                         {/* <TbShoppingCartDiscount style={{fontSize:'4vh'}}>
                         </TbShoppingCartDiscount>  */}
                         <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>Discount Coupons</span>
                     {/* </div> */}
                    </NavLink>
                    </>
                )
            }

            {
              //when there is no user and admin logged in the navbar will include these two option
                (!props.loginStatus) && (
                    <>
                    <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                       
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Login</span>
                    </div>
                    </Link>
                    <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                       
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Register</span>
                    </div>
                    </Link>
                    </>
                )
            }
            
           {
            // if user is admin then navbar will show below links
            (props.loginStatus && (localStorage.getItem('type'))==='admin') && (
                <NavLink to='/dashboard' style={navLinkStyle} >
                {/* <div className='divs'> */}
                {/* <MdDashboard style={{fontSize:'4vh'}}></MdDashboard> */}
                <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Dashboard</span>
            {/* </div> */}
                </NavLink>
            )}

            {
              //when user logsout
            (props.loginStatus ) && (
                <Button variant='link'style={{color:'red' }}>
                <div className='divs'>
                <span style={{paddingLeft:'0.5vw',fontSize:'70%',color:'red'}}
                onClick={()=>{
                    localStorage.setItem('token','')
                    localStorage.setItem('data','')
                    localStorage.setItem('type','')
                    navigate('/signin')
                }}
                >Logout</span>
                </div>
                </Button>
            )
          }
          </Stack> 
          </Nav>    
    </Navbar>
  )
}



export default NavBar;