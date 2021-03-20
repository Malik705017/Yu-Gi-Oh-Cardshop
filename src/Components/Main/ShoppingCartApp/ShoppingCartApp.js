import React from 'react'
import ShoppingCart from './ShoppingCart/ShoppingCart'

// 當購物車為空時就要讓購物車頁面顯示「您的購物車目前沒有商品」
// img用div包住是因為要讓整個水平面只有單一元素，否則會跟button並排
// button按下去後會返回到商場首頁

const ShoppingCartContainer = (props) => {

    let shopping = (
        <div>
            <h3>您的購物車目前沒有商品唷</h3>
            <div>
                <img style = {{maxWidth:"100px",marginBottom:"10px"}} 
                    alt = "購物車" src="https://i.imgur.com/NAwHDGt.png"/>
            </div>
            <button onClick = {props.switchHandler}>前往選購</button>
        </div> 
    );

    if(props.shopCart.length > 0){
        shopping = (
            <div>
                <ShoppingCart cards = {props.shopCart} click = {props.removeClick}/>
                <button onClick = {props.switchHandler}>繼續選購</button>
            </div>
        )
    }

    return (
        <div>
            <div className = "Header">
                <h1 id ="title">您的購物車</h1>
            </div>
            <div>
                {shopping}
            </div>
        </div>
    )
}

export default ShoppingCartContainer