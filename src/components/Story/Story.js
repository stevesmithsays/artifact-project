import React from 'react';

const Story = () => {  
return(<div className = 'story-container'>
 <img src = {require('../../assets/products/poland.jpg')} alt = 'Poland' className = 'story-pic'/>    
    <section className = 'story-text'>
    <h1>Our Story</h1>   
    <p>Artifact Antiques Ltd is a company that began as all good companies generally start: over a couple cocktails and a dream. In our case it happened to be caipirinhas on Copa Cabana Beach, Brazil.</p> 
    </section> 
    </div>)
}

export default Story;