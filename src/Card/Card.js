import React from 'react';
import './Card.css';




const Card = (props) => {

    const style = {
        cursor: 'pointer',
    };
    return(
        <div class = "loader">
            <img alt = "yu-gi-oh card" src = {props.src} onClick = {props.click} style={style}/>  
        </div>
    )
}

export default Card ;