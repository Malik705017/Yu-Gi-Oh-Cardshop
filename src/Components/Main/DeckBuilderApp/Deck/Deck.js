import React from 'react';
import { connect } from 'react-redux';
import { rmCardFromDeck, clearDeck } from '../../../../Redux/actions'
import Card from '../../../Card/Card';
import deckClass from './Deck.css'

const mapStateToProps = state => ({ 
    deck: state.deckBuilder.deck
})
  
const mapDispatchToProps = dispatch => { 
    return {
        rmCardFromDeck: (cardIndex, deck) => dispatch(rmCardFromDeck(cardIndex, deck)),
        clearDeck: () => dispatch(clearDeck())
    }
}

const Deck = (props) => {

    const { deck, rmCardFromDeck, clearDeck } = props

    let attachedClass = [deckClass.Deck, deckClass.fixedDeck]
    let heightFixed = true
    if(deck.length > 20){
       heightFixed = false
    }

    return(
        <div className = {deckClass.Wrapper}> 
            <h2>您的牌組</h2>
            <div style = {{display:'flex', justifyContent:'center'}}>
                <p style = {{marginRight:'5px'}}>牌組張數：{deck.length}</p>
                <button onClick = {clearDeck}>一鍵清空</button>
            </div>
            <div className = {heightFixed ? attachedClass.join(" ") : deckClass.Deck }>
            {deck.map( (aCard , index) => {
                return ( <Card 
                        key = {index}
                        src = {aCard.card_images[0].image_url}
                        click = {()=> rmCardFromDeck(index,deck)}/>  
                        )
                    }
                )
            }
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Deck);