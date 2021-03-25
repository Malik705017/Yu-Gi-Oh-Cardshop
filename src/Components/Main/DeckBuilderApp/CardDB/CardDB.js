import React from 'react';
import { connect } from 'react-redux';
import { addCardToDeck, searchCardForDeck } from '../../../../Redux/actions'
import SearchBox from '../../../Common/SearchBox/SearchBox';
import Scroll from '../../../Common/Scroll/Scroll';
import Card from '../../../Card/Card';
import carddbClass from './CardDB.css'

const mapStateToProps = state => ({
    cards: state.cardShop.cards,
    deck: state.deckBuilder.deck,
    searchName: state.deckBuilder.searchName
})
  
const mapDispatchToProps = dispatch => {
    return {
        addCardToDeck: (cardName, deck, cards) => dispatch(addCardToDeck(cardName, deck, cards)),
        searchCardForDeck: (event) => dispatch(searchCardForDeck(event.target.value))
    }
}

const CardDB = (props) => {

    const { cards, deck, searchName,
            addCardToDeck, searchCardForDeck } = props
    
    const filterCards 
        =  cards.filter( card => card.name.toLowerCase().includes(searchName.toLowerCase()))

    return (
        <div className = {carddbClass.Wrapper}> 
            <h2>卡片資料庫</h2>
            <SearchBox changed = {searchCardForDeck}/>
            <Scroll>
                <div className = {carddbClass.CardDB}>
                    { filterCards.map( card => 
                        <Card 
                            key = {card.id} 
                            src = {card.card_images[0].image_url}
                            click = {()=> addCardToDeck(card.name, deck , cards)}
                        />  
                        )
                    }
                </div>
            </Scroll>
        </div>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(CardDB) ;