import React from 'react';

const Contact = () => {
    return(<div className = 'contact-container'>
        <section className = 'contact-text'>
        <span className = 'tag'>EMAIL: </span><span>INFO@ARTIFACT.COM</span><br/>
        <span className = 'tag'>PHONE: </span><span>484.123.4567</span><br/>
        <span className = 'tag'>ADDRESS:</span>
        <p>ARTIFACT ANTIQUES LTD<br/>
           101 S. ORANGEBLOSSOM BLVD<br/>
           TENERIFE, PENNSYLVANIA<br/>
           18103-6053 
        </p>        
        </section>
        <img src = {require('../../assets/products/wave2.jpg')} className = 'contact-pic' alt = 'wave'/>
        </div>)
}

export default Contact; 