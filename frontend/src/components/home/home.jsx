import React,{useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavBar from "../navbar/navbar";
import CardBody from "../cards/card";
import { useState } from "react";
import Filter from "../filter/filter";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

// import {BsSearch} from "react-icons/bs"
// import Form from 'react-bootstrap/Form';


function Home(props) {
  const sessionToken=localStorage.getItem('token') ? localStorage.getItem('token') : ''
  const [data,setData]=useState([])
  const [baseData,setBaseData]=useState([])
  const [search,setSearch]=useState('')
  const [category,setCategory]=useState([])

  //getting the data from backened
  const getData=async ()=>{
    await fetch('http://localhost:8020/appData/api/user/product/getItems').then(res=>res.json())
    .then(data=>{
      setData(data)

      setBaseData(data)   //basedata state is basically used for searching filter
      var names=[]
      for(let i=0;i<data.length;i++){
        if(names.indexOf(data[i].category)===-1){
          names=[...names,data[i].category]
          }
        }
        setCategory(names)
      
    })
  }

  //for updating data when loading
  useEffect(()=>{
    (
      async ()=>{
        await getData()
        console.log("here") 
      } 
    )()
  },[])

  // filtering elements on the basis of category
  const sortType=(type)=>{
    
    console.log(type)
    if(type){
      var newData=baseData
      const searched = newData.filter(item => item.category === 'furniture');
      setData(searched)
    }
    else{
      var newData = baseData
      const searched = newData.filter(item => item.category === 'electricals');
      setData(searched)
    }
  }

  // when clicking on search button this executes
  const handleSearch=async ()=>{
    var newData=baseData
    if(search===''){
      getData()
    }
    else{
      const searched = newData.filter(item => item.productName.toLowerCase().includes(search))
      console.log(searched)
      setData(searched)
    }
  }


  return (
      <>

      <div style={{position:'fixed',top:'0px',zIndex:'12',width:'100vw',background:'white'}}>
        <NavBar loginStatus={sessionToken.length>1}></NavBar>
      </div>
      <ReactNotifications />
      {/* body after navbar */}
        <div className="d-flex " style={{position:'relative',backgroundColor:'red',marginTop:'9vh'}}>
          <div> 
            <Filter className='mt-5' typeOfSort={(val)=>{
            sortType(val)
            }}></Filter>
            
          </div>
        
        <div style={{position:'absolute',right:'0',width:'80vw'}}>
          <div className="mt-5 "  >
            <div style={{margin:'0 5% 0 5%',width:'90%'}}>
              <InputGroup >
                <FormControl
                  placeholder="Search Here"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e)=>{setSearch(e.target.value);handleSearch(search);}}
                />
                <Button id="button-addon2" style={{borderLeft:'1px solid black'}}
                onClick={()=>{
                  handleSearch(search)
                }}>
                  {/* <BsSearch/> */}
                  Search
                </Button>
              </InputGroup>
            </div> 
            <div >
            <CardBody data={data} ></CardBody> 
            </div>
          </div>  
        </div>
      </div>
      </>
    
  );
}

export default Home;