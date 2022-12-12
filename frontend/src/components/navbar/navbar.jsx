import React from 'react'
import {Navbar,Dropdown,Nav,} from "react-bootstrap";
import "./navbar.css"
import {AiFillShop} from 'react-icons/ai'
import { FaHeart,FaSignInAlt ,FaShoppingCart} from "react-icons/fa";
import { GoSignOut} from "react-icons/go";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { TbShoppingCartDiscount } from "react-icons/tb";
import {Link, useNavigate} from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Button from "react-bootstrap/Button"; 
import Media from 'react-media';
import DropdownButton from 'react-bootstrap/DropdownButton';


const NavBar = (props) => {
    
    const navigate=useNavigate()
    
    
  return (

    <Navbar  style={{borderBottom:'2px solid black',minWidth:'400px',backgroundColor:'white'}}>
        
            <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://previews.123rf.com/images/ikalvi/ikalvi1712/ikalvi171200242/92412982-smiling-shopping-cart-vector-logo-design-shopping-mart-or-app-vector-logo-.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <strong>𝓕𝓮𝓮𝓵 𝓽𝓱𝓮 𝓥𝓮𝓵𝓸𝓬𝓲𝓽𝔂</strong>
          </Navbar.Brand>
            
            <Nav className={'ms-auto'} style={{marginRight:'5vw'}}>
            <Media query="(min-width: 650px)" render={() =>
          (
            <Stack  direction='horizontal' className="stack">
                <Link to='/' style={{ textDecoration: 'none',color:'gray' }}>
                <div className='divs'>
                <AiFillShop  style={{fontSize:'4vh'}}>

                </AiFillShop><span style={{paddingLeft:'0.5vw' , fontSize:'60%', fontWeight: "bolder"}}>Shop</span>
                </div>
                </Link>
                
            {
                (props.loginStatus && (localStorage.getItem('type'))==='user') && (
                    <>
                    {/* <Link to='/cart' style={{ textDecoration: 'none',color:'orange' }}>
                    <div className='divs'> #FF8C00
                         <FaShoppingCart >
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
                     </div>
                    </Link> */}
                     <Link to='/wishlist' style={{ textDecoration: 'none',color:'gray' }}>
                     <div className='divs'>
                         <FaHeart style={{fontSize:'4vh'}}>
                         </FaHeart>
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder"}}>Wishlist</span>
                     </div>
                     </Link>
                     <Link to='/cart' style={{ textDecoration: 'none',color:'gray' }}> 
                    <div className='divs'>
                         <FaShoppingCart style={{fontSize:'4vh'}}>
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%', fontWeight: "bolder"}}>cart</span>
                     </div>
                    </Link>
                     <Link to='/coupons' style={{ textDecoration: 'none',color:'gray' }}>
                    <div className='divs'>
                         <TbShoppingCartDiscount style={{fontSize:'4vh'}}>
                         </TbShoppingCartDiscount> <span style={{paddingLeft:'0.5vw', fontSize:'60%', fontWeight: "bolder", color:"gray"}}>coupons</span>
                     </div>
                    </Link>
                    </>
                )
            }
            {
                (!props.loginStatus) && (
                    <>
                    <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <FaSignInAlt style={{fontSize:'4vh'}}>
                        </FaSignInAlt >
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color:"gray"}}>Signin</span>
                    </div>
                    </Link>
                    <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <BsPersonPlusFill style={{fontSize:'4vh'}}>
                        </BsPersonPlusFill>
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Register</span>
                    </div>
                    </Link>
                    </>
                )
            }
           {
            (props.loginStatus && (localStorage.getItem('type'))==='admin') && (
                <Link to='/dashboard' style={{color: "gray", textDecoration: "none"}}>
                <div className='divs'>
                <MdDashboard style={{fontSize:'4vh'}}></MdDashboard>
                <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Dashboard</span>
            </div>
                </Link>
            )}
            {
            (props.loginStatus ) && (
                <Button variant='link'style={{color:'red', textDecoration: "none" }}>
                <div className='divs'>
                <GoSignOut style={{color:'gray',fontSize:'4vh'}}></GoSignOut>
                <span style={{paddingTop: "10.5vw", paddingLeft:'0.5vw',fontSize:'80%', fontWeight: "bolder", color: "gray"}}
                onClick={()=>{
                    localStorage.setItem('token','')
                    localStorage.setItem('data','')
                    localStorage.setItem('type','')
                    navigate('/signin')
                }}
                >Signout</span>
                </div>
                </Button>
            
            )
           }
           
            </Stack>
          )}/>
                
            <Media query="(max-width: 649px)" render={() =>
          (
            
            <DropdownButton variant='light' style={{fontSize:'4vh',marginRight:'15vw'}} id="dropdown-basic-button" title="&#9776;" >
              <Dropdown.ItemText>
              <Link to='/' style={{ textDecoration: 'none',color:'green' }}>
                <div className='divs'>
                <AiFillShop  style={{fontSize:'4vh'}}>

                </AiFillShop><span style={{paddingLeft:'0.5vw' , fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Shop</span>
                </div>
                </Link>
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (props.loginStatus && (localStorage.getItem('type'))==='user') && (
                    
                     <Link to='/wishlist' style={{ textDecoration: 'none',color:'#FF1493', fontWeight: "bolder" }}>
                     <div className='divs'>
                         <FaHeart style={{fontSize:'4vh'}}>
                         </FaHeart>
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%', color: "gray"}}>Wishlist</span>
                     </div>
                     </Link>
                     
                  
                )
            }
              </Dropdown.ItemText>
              
              <Dropdown.ItemText>
              {
                (props.loginStatus && (localStorage.getItem('type'))==='user') && (
                    
                     <Link to='/cart' style={{ textDecoration: 'none',color:'	#FF8C00' }}>
                    <div className='divs'>
                         <FaShoppingCart style={{fontSize:'4vh'}}>
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%', fontWeight: "bolder", color: "gray"}}>cart</span>
                     </div>
                    </Link>
                    
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (props.loginStatus && (localStorage.getItem('type'))==='user') && (
                    
                  <Link to='/coupons' style={{ textDecoration: 'none',color:'	purple' }}>
                  <div className='divs'>
                       <TbShoppingCartDiscount style={{fontSize:'4vh'}}>
                       </TbShoppingCartDiscount> <span style={{paddingLeft:'0.5vw', fontSize:'60%', fontWeight: "bolder", color: "gray"}}>coupons</span>
                   </div>
                  </Link>
                     
                  
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (!props.loginStatus) && (
                    
                    <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <FaSignInAlt style={{fontSize:'4vh'}}>
                        </FaSignInAlt >
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Signin</span>
                    </div>
                    </Link>
                    
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (!props.loginStatus) && (
                    <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <BsPersonPlusFill style={{fontSize:'4vh'}}>
                        </BsPersonPlusFill>
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Register</span>
                    </div>
                    </Link>
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
            (props.loginStatus && (localStorage.getItem('type'))==='admin') && (
                <Link to='/dashboard' style={{color: "green"}}>
                <div className='divs'>
                <MdDashboard style={{fontSize:'4vh'}}></MdDashboard>
                <span style={{paddingLeft:'0.5vw',fontSize:'60%', fontWeight: "bolder", color: "gray"}}>Dashboard</span>
            </div>
                </Link>
            )}
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
            (props.loginStatus ) && (
                <Button variant='link'style={{color:'red', textDecoration: "none"}}>
                <div className='divs'>
                <GoSignOut style={{color:'red',fontSize:'4vh'}}></GoSignOut>
                <span style={{paddingLeft:'0.5vw',fontSize:'90%', fontWeight: "bolder", color: "gray"}}
                onClick={()=>{
                    localStorage.setItem('token','')
                    localStorage.setItem('data','')
                    localStorage.setItem('type','')
                    navigate('/signin')
                }}
                >Signout</span>
                </div>
                </Button>
            
            )
           }
              </Dropdown.ItemText>

            </DropdownButton>
            
          )}
        />
                
                {/* <Link path="/signin"  >Signin
                
                </Link> */} 
            </Nav>

        
    </Navbar>
  )
}



export default NavBar;