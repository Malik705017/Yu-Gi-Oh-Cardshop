import React from 'react';
import CardProduct from '../CardProduct/CardProduct';
import SearchBox from '../Common/SearchBox/SearchBox';
import './CardGallery.css';


const divStyle = {
    display:"flex", 
    justifyContent: "center",
    margin:"15px 0",
    color:'rgb(40,103,178)'
}

const pStyle = {
    padding:'5px',
    margin:'0 10px',
    color:'rgb(40,103,178)'
}


const CardGallery = (props) => {

    
    let switchPageButton = (
        <div style = {divStyle}>
            <button onClick = {()=>props.nextPage(false)}>上一頁</button>
            <p style = {pStyle}>您目前在第 {props.curPage} 頁</p>
            <button onClick = {()=>props.nextPage(true)}>下一頁</button>
        </div>
    )

    let searchBox = (
        <div style = {divStyle}>
            <p style = {pStyle}>找商品</p>
            <SearchBox changed = {props.changed}/>
        </div>
    )

    if(props.showButton === false){
        switchPageButton = (
            <div></div>
        )
        searchBox = (
            <div></div>
        )
    }

    return(
        <div>
            {searchBox}
            <div className = "CardGallery">
                { props.cards.map( (aCard , index) => {
                    return ( <CardProduct 
                            key = {aCard.id}
                            src = {aCard.card_images[0].image_url}
                            name = {aCard.name}
                            price = {aCard.card_prices[0].amazon_price}
                            click = {props.click}
                            add = {true}
                            />  
                            )
                        }
                    )
                }
            </div>
            {switchPageButton}
        </div>
    )
}

export default CardGallery;