import React from 'react'
import Deck from './Deck/Deck'
import CardDB from './CardDB/CardDB'
import appClass from '../../../Containers/App.css'
import deckBuilderClass from './DeckBuilderApp.css'

const DeckBuilder = () => {
    console.log('DeckBuilder')
    return (
        <div>
            <div className = {appClass.Header}>
                <h1 id = {appClass.title}>遊戲王卡組編輯器</h1>
            </div>
            <div className = {deckBuilderClass.DeckBuilder}>
                <Deck/>
                <CardDB/>
            </div>
        </div>
    )
}

export default DeckBuilder
