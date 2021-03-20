import React from 'react';
import cardClass from './Card.css';


const Card = (props) => 
    <div className = {cardClass.loader}>
        <img className = {cardClass.card} 
             alt = "yu-gi-oh card" 
             src = {props.src} 
             onClick = {props.click}/>  
    </div>

export default Card ;