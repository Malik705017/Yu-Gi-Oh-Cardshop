import React, { useState } from 'react';
import cardClass from './Card.css';


const Card = (props) => {

    const [loading,setLoading] = useState(cardClass.loader)
    const removeLoadingHandler = () => {
        setLoading(cardClass.hasLoad)
    }

    return (
        <div className = {loading}>
            <img className = {cardClass.card} 
                    alt = "yu-gi-oh card" 
                    src = {props.src} 
                    onClick = {props.click}
                    onLoad = {removeLoadingHandler}    
            />  
        </div>
    )
}

export default Card ;