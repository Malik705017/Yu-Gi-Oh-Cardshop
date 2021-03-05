 import React from 'react'
 import CardGallery from '../CardGallery/CardGallery'  
   
const CardShopApp = (props) => { 

    console.log('CardShopApp')
    
    /*當商品展示區沒有符合條件的商品時，顯示「找不到符合挑件的商品」*/
    let product = (
        <div>
          <h3>找不到符合條件的商品</h3>
          <div>
            <img alt = "微笑" src = "https://imgur.com/MXys5Wa.png"></img>
          </div>
          <button onClick = {props.backSearchClick}>返回搜尋</button>
        </div>
      )
  
      let searchCardGallery = [];
      if(props.mode === 3) // 從Nav搜尋
      { 
        searchCardGallery = props.database.filter( (aCard) => {
          return aCard.name.toLowerCase().includes(props.searchNav.toLowerCase());
        })
      }
      else // 從下方快速搜尋欄搜尋
      {
        searchCardGallery = props.shop.filter( (aCard) => {
          return aCard.name.toLowerCase().includes(props.searchBox.toLowerCase());
        })
      }
  
      if(searchCardGallery.length > 0){
        product = (
          <CardGallery 
            cards = {searchCardGallery} 
            changed = {props.searchProductChange} 
            click = {props.addProductClick } 
            nextPage = {props.nextPage} 
            curPage = {props.curPage}
            showButton = {props.showButton}  
          />
        )
      }
  
      //網站標題
      let Header = (
        <div className = "Header">
          <div className = "Logo">
            <img id = "logoImg" alt = "logo" src = "https://imgur.com/c37t0NS.png"/>
            <h1 id = "title">Malik's卡片商城</h1>
          </div>
          <h1 id = "slogan">花得更少，買得更好</h1>
        </div>
      )
      
      if(props.mode === 3) //表示為從Nav搜尋商品
      {
          Header = (
            <div className = "Header">
              <p>搜尋 {props.searchNav} 的結果如下，共 {searchCardGallery.length} 筆符合條件的商品</p>
            </div>
          )
      }
  
      return (
          <div>
            {Header}
            <div className = "CardShop">
              {product}  
            </div>
          </div>
      );
}

export default CardShopApp