import React from 'react';
import Card from '../Card/Card';
import './CardProduct.css';

const CardProduct = (props) => {

    let text = "加入購物車";
    let clickFuncInput = props.name ;

    if (props.add === false){
        text = "移除此商品";
        clickFuncInput = props.index ;
    }

    return(
        <div className = "CardProduct">
            <Card src = {props.src} click = {console.log('click')}/>
            <div className = "CardInfo">
                <div className = "BasicInfo">
                    <p>{props.name}</p>
                    <p>USD： {props.price}</p>
                </div>
                <button onClick = { () => {props.click(clickFuncInput)}}>{text}<img class = "cartIcon" alt="購物車" src = "https://i.imgur.com/NAwHDGt.png"/></button>
            </div>
        </div>
    )
}


export default CardProduct;