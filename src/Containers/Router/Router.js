import React from 'react'
import { Route } from 'react-router-dom';
import DeckBuilder from '../../Components/Main/DeckBuilderApp/DeckBuilderApp'
import CardShop from '../../Components/Main/CardShopApp/CardShopApp'
import Cart from '../../Components/Main/ShoppingCartApp/ShoppingCartApp';


const Router = () => 
    <div>
        <Route exact path="/" component={CardShop}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/deck" component={DeckBuilder}/>
    </div>

export default Router