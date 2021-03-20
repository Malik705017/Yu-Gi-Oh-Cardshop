import React from 'react';
import Card from '../Card/Card';
import cardProductClass from './CardProduct.css';

const CardProduct = (props) => {

    let text = "加入購物車";
    let clickFuncInput = props.name ;

    if (props.add === false){
        text = "移除此商品";
        clickFuncInput = props.index ;
    }

    return(
        <div className = {cardProductClass.CardProduct}>
            <Card src = {props.src} click = {()=>console.log('click')}/>
            <div className = {cardProductClass.CardInfo}>
                <div className = {cardProductClass.BasicInfo}>
                    <p className = {cardProductClass.name}>{props.name}</p>
                    <p className = {cardProductClass.price}>USD： {props.price}</p>
                </div>
                <button onClick = { () => {props.click(clickFuncInput)}}>{text}<img className = {cardProductClass.cartIcon} alt="購物車" src = "https://i.imgur.com/NAwHDGt.png"/></button>
            </div>
        </div>
    )
}


export default CardProduct;