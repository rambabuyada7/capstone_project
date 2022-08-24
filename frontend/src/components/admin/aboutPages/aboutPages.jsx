import React from 'react';
const AboutPage = ({
  title = 'Title',
  description = 'Description',
}) => (
 
    <div className='jumbotron ' style={{height:'15vh',paddingTop:'5vh',minWidth:'400px'}}>
      <h1 style={{color:'black',fontWeight:'bolder'}}>{title}</h1>
    </div>
  
);

export default AboutPage;