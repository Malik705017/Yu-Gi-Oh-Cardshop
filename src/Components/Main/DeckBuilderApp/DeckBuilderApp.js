import React from 'react'
import Deck from './Deck/Deck'
import CardDB from './CardDB/CardDB'

import DeckStyle from './DeckBuilderApp.css'

const DeckBuilder = (props) => {

    console.log('DeckBuilder')
    
    const searchCardList = props.database.filter( (aCard) => {
        return aCard.name.toLowerCase().includes(props.searchCardName.toLowerCase());
    })

    // /*當牌組張數超過20張後就不再有固定長度 */
    // if(props.deckList.length > 20){
    //     delete DeckStyle.Deck.height;
    // }

    return (
        <div>
            <div className = "Header">
                <h1 id="title">遊戲王卡組編輯器</h1>
            </div>
            <div className = "DeckBuilder">
                <Deck decklist = {props.deckList} 
                        click = {props.removeClick} 
                        style = {DeckStyle.Deck} 
                        btnClick = {props.clearClick}/>
                <CardDB db = {searchCardList} 
                        click = {props.addClick} 
                        changed = {props.searchChange}/>
            </div>
        </div>
    )
}

export default DeckBuilder
