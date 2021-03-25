import React from 'react'
import CartGallery from './CartGallery/CartGallery'
import { Link } from 'react-router-dom'
import shoppingCartAppClass from './ShoppingCartApp.css'
import classes from '../../../Containers/App.css'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    shopCart: state.cart.shopCart
})

const ShoppingCartContainer = (props) => {

    const { shopCart } = props
    console.log('shopCart',shopCart)
    const content = shopCart.length === 0 
        ?
        <div className = {shoppingCartAppClass.center}>
            <h3>您的購物車目前沒有商品唷</h3>
            <div>
                <img style = {{maxWidth:"100px",marginBottom:"10px"}} 
                    alt = "購物車" src="https://i.imgur.com/NAwHDGt.png"/>
            </div>
            <button><Link to = '/'>前往選購</Link></button>
        </div> 
        :
        <div>
            <CartGallery cards = {shopCart}/>
            <div className = {shoppingCartAppClass.center}>
                <button><Link to = '/'>繼續選購</Link></button>
            </div>
        </div>
    
    return (
        <div>
            <div className = {classes.Header}>
                <h1 id = {classes.title}>您的購物車</h1>
            </div>
            {content}
        </div>
    )
}

export default connect(mapStateToProps)(ShoppingCartContainer)