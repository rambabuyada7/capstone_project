import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



export default function Filter(props) {
  return (
    <div style={{width:'20vw',height:'100%' ,backgroundColor:'lightblue',position:'fixed',left:'0'}}>
      <Typography className='mt-5'>Filters</Typography>
      <hr />
      <Row  xs={1} md={4} >
            <Col className='mx-auto' style={{ width:'100%'}}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><strong>Category</strong></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="furniture" control={<Radio />} 
                    label="Furniture" 
                    onClick={()=>{
                      props.typeOfSort(true)
                    }}/>
                    <FormControlLabel value="electricals" control={<Radio />} 
                    label="Electronics"
                    onClick={()=>{
                        props.typeOfSort(false)
                      }} />
                    
                </RadioGroup>
                </FormControl>
            </Col>
            
          </Row>
    
    </div>
  );
}
