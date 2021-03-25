import {
    REQUEST_CARDS_PENDING,REQUEST_CARDS_SUCCESS,REQUEST_CARDS_FAILED,
    SEARCH,CLEAR_SEARCH,
    CHANGE_PAGE,
    ADD_CARD_TO_CART,REMOVE_CARD_FROM_CART,
    BLUE_EYES_URL,BLACK_WING_URL,BLACK_MAGICAIAN_URL,
    ADD_CARD_TO_DECK,REMOVE_CARD_FROM_DECK,CLEAR_DECK,SEARCH_CARD_FOR_DECK
} from './constants.js'

const fetchCardSet = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    const cards = data.data
    return cards
}

const fetchAllCards = async (urls, dispatch) => {
    try{
        dispatch({ type: REQUEST_CARDS_PENDING})
        let cards = []
        for(let i = 0 ; i < urls.length ; i++)
            cards = cards.concat( await fetchCardSet(urls[i]) )
        dispatch({ type: REQUEST_CARDS_SUCCESS, payload: cards})
    }catch(err){
        dispatch({ type: REQUEST_CARDS_FAILED, payload: err})
    }
}

export const requestCards = () => dispatch => {
    fetchAllCards([BLUE_EYES_URL,BLACK_MAGICAIAN_URL,BLACK_WING_URL], dispatch)
}

export const changePage = (cards, lastPage, totalPage, next)=> {

    const originalPage = lastPage
    let nextPage = lastPage
    let data = {
        newPage: originalPage,
        newShop: cards.slice(20 * (lastPage-1) , 20 * originalPage)
    }

    if(next === true)
      nextPage += 1
    else{
      nextPage -= 1
      lastPage -= 2 
    }

    if((next === true && originalPage <= (totalPage-1)) || (next === false && originalPage > 1))
    {
      data.newPage = nextPage
      data.newShop = cards.slice(20 * lastPage , 20 * nextPage)
    }
    else if(originalPage === 1)
      alert('您已在第一頁囉！')
    else if(originalPage > (totalPage-1))
      alert('您已在最後一頁囉！')
    

    return {
        type: CHANGE_PAGE,
        payload: data
    }
}

export const addCardToCart = (cardName, shopCart, cards) => {
    let anotherShopCart = [...shopCart];
    const index = cards.findIndex(element => element.name === cardName);
    const aCard = {...cards[index]};
    anotherShopCart.push(aCard);
    alert('成功加入至購物車');
    return {
        type: ADD_CARD_TO_CART,
        payload: anotherShopCart
    }
}

export const rmCardFromCart = (cardIndex, shopCart) => {
    let anotherShopCart = [...shopCart];
    anotherShopCart.splice(cardIndex,1);
    return {
        type: REMOVE_CARD_FROM_CART,
        payload: anotherShopCart
    }
  }

export const search = () => {
    const productName = document.getElementsByName("productName")[0].value
    return {
        type: SEARCH,
        payload: productName
    }
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH,
        payload: ''
    }
}

export const addCardToDeck = (cardName, deck, cards) => {
    let anotherDeck = [...deck];
    const index = cards.findIndex(element => element.name === cardName);
    let aCard = {...cards[index]};
    anotherDeck.push(aCard);
    return {
        type: ADD_CARD_TO_DECK,
        payload: anotherDeck
    }
}
  
export const rmCardFromDeck = (cardIndex, deck) => {
    let anotherDeck = [...deck];
    anotherDeck.splice(cardIndex,1);
    return {
        type: REMOVE_CARD_FROM_DECK,
        payload: anotherDeck
    }
}

export const clearDeck = () => {
    return {
        type: CLEAR_DECK,
        payload: []
    }
}

export const searchCardForDeck = cardName => {
    return {
        type: SEARCH_CARD_FOR_DECK,
        payload: cardName
    }
}

