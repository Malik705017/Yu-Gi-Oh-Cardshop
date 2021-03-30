import React from 'react';
import CardProduct from '../../../CardProduct/CardProduct';
import galleryClass from '../../CardShopApp/ShopGallery/ShopGallery.css';
import shopCartClass from './CartGallery.css';


const CartGallery = (props) => {

    const { cards } = props

    /*計算總價*/
    let totalPrice = 0;
    let cardGalleryClass = [galleryClass.CardGallery, shopCartClass.wLeft]

    for(let i = 0 ; i < cards.length ; i++){
        totalPrice += parseFloat(cards[i].card_prices[0].amazon_price);
    }

    /*小數四捨五入（直接copy別人的函式XD）*/
    const roundDecimal = function (val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }

    totalPrice = roundDecimal(totalPrice,2);

    const pStyle = {
        fontSize:'20px'
    }


    return(
        <div className = {shopCartClass.ShoppingCart}>
            <div className = {cardGalleryClass.join(" ")}>
                { cards.map( (aCard,index) => {
                    return ( <CardProduct 
                                key = {aCard.id}
                                cardIndex = {index}
                                src = {aCard.card_images[0].image_url}
                                cardName = {aCard.name}
                                cardPrice = {aCard.card_prices[0].amazon_price}
                                click = {props.click}
                                add = {false}
                                />  
                                )
                            }
                        )
                }
            </div>
            <div className = {shopCartClass.CartList}>
                <p style = {pStyle}>總計：${totalPrice}</p>
                <div>
                {  cards.map( (aCard,index) =>
                        (<div className = {shopCartClass.ListItem} key = {aCard.id}>
                            <p>{index+1}.</p>
                            <p>{aCard.name} {aCard.card_prices[0].amazon_price}</p>
                        </div>) 
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default CartGallery;