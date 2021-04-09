import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../../../redux/actions'
import ShopGallery from './ShopGallery/ShopGallery'  
import Loading from '../LoadingApp/LoadingApp'
import Header from '../../Common/Header/Header'

import appClass from '../../../Containers/App.css'   
import cardShopAppClass from './CardShopApp.css'

const mapStateToProps = state => {
  const { cards, isPending, error, searchName, curPage, totalPage, shop } = state.cardShop 
  const { shopCart } = state.cart
  return {
    cards: cards,
    isPending: isPending,
    error: error,
    searchName: searchName,
    curPage: curPage,
    totalPage: totalPage,
    shop: shop,
    shopCart: shopCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePage: (cards, lastPage, totalPage, isFoward) => dispatch(changePage(cards, lastPage, totalPage, isFoward)),
  }
}

const CardShopApp = (props) => { 

  const { isPending, curPage, totalPage, searchName, cards, shop, onChangePage } = props    
  
  /*當商品展示區沒有符合條件的商品時，顯示「找不到符合挑件的商品」*/
  const filterCards = searchName !== ''
    ?
    cards.filter( (card) => {
        return card.name.toLowerCase().includes(searchName.toLowerCase());
    })
    :
    shop

  const switchPageButton = isPending || searchName !== ''
    ?
    <div></div>
    :
    <div className = {cardShopAppClass.divStyle}>
        <button onClick = {()=>onChangePage(cards, curPage, totalPage, false)}>上一頁</button>
        <p className = {cardShopAppClass.pStyle}>您目前在第 {curPage} 頁</p>
        <button onClick = {()=>onChangePage(cards, curPage, totalPage, true)}>下一頁</button>
    </div>

  

  const content = isPending 
    ?
    <Loading/>
    :
    <ShopGallery cards = {filterCards}/>
    
  return (
      <div>
        <Header searchName = {searchName} cardNum = {filterCards.length}/>
        <div className = {appClass.CardShop}>
          {content}  
        </div>
        {switchPageButton}
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardShopApp)