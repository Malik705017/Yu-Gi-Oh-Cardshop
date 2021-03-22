import React from 'react';
import Card from '../../../Card/Card';
import deckClass from './Deck.css'

const Deck = (props) => {

    let attachedClass = [deckClass.Deck, deckClass.fixedDeck]
    let heightFixed = true
    if(props.decklist.length > 20){
       heightFixed = false
    }

    return(
        <div className = {deckClass.Wrapper}> 
            <h2>您的牌組</h2>
            <div style = {{display:'flex', justifyContent:'center'}}>
                <p style = {{marginRight:'5px'}}>牌組張數：{props.decklist.length}</p>
                <button onClick = {props.btnClick}>一鍵清空</button>
            </div>
            <div className = {heightFixed ? attachedClass.join(" ") : deckClass.Deck }>
            {props.decklist.map( (aCard , index) => {
                return ( <Card 
                        key = {index}
                        src = {aCard.card_images[0].image_url}
                        click = {()=> props.click(index)}/>  
                        )
                    }
                )
            }
            </div>
        </div>
    )
}

export default Deck;