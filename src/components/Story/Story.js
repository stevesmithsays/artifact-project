import React from 'react';

const Story = () => {  
return(<div className = 'story-container'>

    <section className = 'story-text'>
    <h1>Our Story</h1>   
    <p>Artifact Fine Goods began as all good businesses do: with a spark of inspiration and a dream.</p>
    <p>We were wandering through a small Chinese village known as Huzhou, looking for vacation souvenirs to bring back home for friends. The locals quickly informed about the history of the town. Small batch silk goods have been produced in Huzhou by expert artisans for as long as people can remember. Marco Polo notably recorded the depth and variety of colors and styles of silk garments for purchase as early as the year 1292.</p>
    <p>We were in awe of the quality of the silk available still today, and disappointed that goods of this quality weren't more widespread in America. That's when we decided to search the world and bring unique, artisan crafted goods to the masses. </p>
    <p>Finding the right pieces for sale is a time consuming and difficult process. To uphold our raison d'etre,we often only sell one of each carefully chosen item. As a result, inventory changes frequently, so check back often!</p>
    </section> 
     <img src = {require('../../assets/products/china.jpg')} alt = 'China' className = 'story-pic'/>    
    </div>)
}

export default Story;