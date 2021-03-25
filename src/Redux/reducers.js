import {
    REQUEST_CARDS_PENDING,REQUEST_CARDS_SUCCESS,REQUEST_CARDS_FAILED,
    CHANGE_PAGE,
    ADD_CARD_TO_CART,REMOVE_CARD_FROM_CART,
    SEARCH,CLEAR_SEARCH,
    ADD_CARD_TO_DECK,REMOVE_CARD_FROM_DECK,CLEAR_DECK,SEARCH_CARD_FOR_DECK
} from './constants.js'

const initialState = {
    cardShop: {
        cards:[],
        isPending: false,
        error: '',
        searchName: '',
        shop: [],
        curPage: 1,
        totalPage: 1
    },
    cart: {
        shopCart:[]
    },
    deckBuilder: {
        deck: [],
        searchName: ''
    }
}

export const reducers = (state = initialState, action = {}) => {
    console.log('prevState', state)
    
    switch(action.type) {
        case REQUEST_CARDS_PENDING:
            return { ...state, cardShop:{ ...state.cardShop, isPending: true } }
        case REQUEST_CARDS_SUCCESS:
            return { ...state, cardShop:{ ...state.cardShop, cards: action.payload, shop: action.payload.slice(0,20) , isPending: false, totalPage: Math.ceil(action.payload.length / 20) } }
        case REQUEST_CARDS_FAILED:
            return { ...state, cardShop:{ ...state.cardShop, cards: action.payload, isPending: false } }
        case CHANGE_PAGE:
            return { ...state, cardShop:{ ...state.cardShop, shop: action.payload.newShop, curPage: action.payload.newPage } }
        case ADD_CARD_TO_CART:
            return {...state, cart:{ shopCart: action.payload } }
        case REMOVE_CARD_FROM_CART:
            return {...state, cart:{ shopCart: action.payload } }
        case SEARCH:
            return {...state, cardShop:{ ...state.cardShop, searchName: action.payload } }
        case CLEAR_SEARCH:
            return {...state, cardShop:{ ...state.cardShop, searchName: action.payload } } 
        case ADD_CARD_TO_DECK:
            return {...state, deckBuilder: {...state.deckBuilder, deck: action.payload } } 
        case REMOVE_CARD_FROM_DECK:
            return {...state, deckBuilder: {...state.deckBuilder, deck: action.payload } }
        case CLEAR_DECK:
            return {...state, deckBuilder: {...state.deckBuilder, deck: action.payload } }
        case SEARCH_CARD_FOR_DECK:
            return {...state, deckBuilder: {...state.deckBuilder, searchName: action.payload } }
        default:
            return state
    }
}
