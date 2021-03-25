import React from 'react';
import CardProduct from '../../../CardProduct/CardProduct';
import cardGalleryClass from './ShopGallery.css';


const ShopGallery = (props) => {
    const { cards, click } = props

    return <div className = {cardGalleryClass.CardGallery}>
            { cards.map( aCard => 
                    <CardProduct 
                        key = {aCard.id}
                        src = {aCard.card_images[0].image_url}
                        cardName = {aCard.name}
                        cardPrice = {aCard.card_prices[0].amazon_price}
                        click = {click}
                        add = {true}
                    />  
                )
            }
            </div>
}

export default ShopGallery;