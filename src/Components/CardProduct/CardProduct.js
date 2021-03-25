import React from 'react';
import { connect } from 'react-redux';
import { addCardToCart, rmCardFromCart } from '../../Redux/actions'
import Card from '../Card/Card';
import cardProductClass from './CardProduct.css';


const mapStateToProps = state => ({
    cards: state.cardShop.cards,
    shopCart: state.cart.shopCart
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
        addCardToCart: (cardName, shopCart, cards) => dispatch(addCardToCart(cardName, shopCart, cards)), 
        rmCardFromCart: (cardIndex, shopCart) => dispatch(rmCardFromCart(cardIndex, shopCart)) 
    }
} 

const CardProduct = (props) => {

    const {cardName, cardIndex, cardPrice, shopCart, cards, add,
            addCardToCart, rmCardFromCart} = props
    
    const text = add ? "加入購物車" : "移除此商品"
    const clickAction = 
        add ? () => addCardToCart(cardName, shopCart, cards) 
            : () => rmCardFromCart(cardIndex, shopCart)

    return(
        <div className = {cardProductClass.CardProduct}>
            <Card src = {props.src} click = {()=>console.log('click')}/>
            <div className = {cardProductClass.CardInfo}>
                <div className = {cardProductClass.BasicInfo}>
                    <p className = {cardProductClass.name}>{cardName}</p>
                    <p className = {cardProductClass.price}>USD： {cardPrice}</p>
                </div>
                <button onClick = {clickAction}>{text}<img className = {cardProductClass.cartIcon} alt="購物車" src = "https://i.imgur.com/NAwHDGt.png"/></button>
            </div>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);