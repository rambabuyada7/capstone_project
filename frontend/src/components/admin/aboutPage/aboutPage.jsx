import React from 'react';
const AboutPage = ({
  title = 'Title',
  description = 'Description',
}) => (
 
    <div style={{height:'5vh',minWidth:'400px'}}>
      <h1 style={{fontWeight:'bolder'}}>{title}</h1>
    </div>
  
);

export default AboutPage;
