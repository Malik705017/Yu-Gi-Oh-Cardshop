import React, { Component } from 'react';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Deck from './Deck/Deck';
import CardDB from './CardDB/CardDB';
import CardGallery from './CardGallery/CardGallery';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import {blackWingsCards} from './CardDB/BlackWing.js';
import {blueEyesCards} from './CardDB/BlueEyes';
import './App.css';
//import {allCards} from './CardDB/Allcard';
//import Card from './Card/Card';

let DataBase = [...blueEyesCards];
DataBase = DataBase.concat(blackWingsCards);

class App extends Component {
  state = {
      decklist : [],
      db : DataBase,
      shop: DataBase.slice(0,(DataBase.length)/5-1),
      shopCart:[],
      showButton: true,
      searchCardName: '',
      searchProductName:'',
      searchPNameFromNav:'',
      currentPage:1,
      mode:0
  }

  // componentDidMount(){
  //   fetch( "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes") /*設定使用GET*/
  //   .then(res => res.json()) 
  //   .then(result => {
  //     this.setState({apiData:result.data});/*接到request data後要做的事情*/
  //     console.log(result.data);
  //   })
  //   .catch(e => {
  //       alert(e);
  //   })
  // }

  /* -------------- 牌組編輯器相關函式 start -------------- */
  deckBuildHandler = (cardName) => {
    let anotherDeckList = [...this.state.decklist];
    const index = this.state.db.findIndex(element => element.name === cardName);
    let aCard = {...this.state.db[index]};
    anotherDeckList.push(aCard);
    this.setState({decklist : anotherDeckList});
    //console.log(this.state.decklist);
  }
  
  removeCardHandler = (cardIndex) => {
    const decklist = [...this.state.decklist];
    //console.log("before:",decklist);
    decklist.splice(cardIndex,1);
    this.setState({decklist:decklist});
    //console.log("after:",decklist);
  }

  clearDeckHandler = () => {
    this.setState({decklist:[]});
  }

  //處理牌組編輯器搜尋卡片的函式
  searchCardChangeHandler = (event) => {
      this.setState({searchCardName:event.target.value});
  }
  /* -------------- 牌組編輯器相關函式 end -------------- */


  /* -------------- 商城相關函式 start -------------- */
  //處理商城搜尋商品的函式
  searchProductChangeHandler = (event) => {
    this.setState({searchProductName:event.target.value});
  }

  // 處理商城換頁的函式
  nextPageHandler = (next) => {
    //console.log(next);
    const curIndex = (DataBase.length)/5;
    let curPage = this.state.currentPage;
    let nextPage = curPage;

    if(next === true){
      nextPage += 1;
    }
    else{
      nextPage -= 1;
      curPage -= 2;
    }

    if((next === true && this.state.currentPage <= 4) || (next === false && this.state.currentPage >1))
    {
      this.setState({shop: DataBase.slice(curIndex * curPage , curIndex * nextPage -1)});
      this.setState({currentPage:nextPage});
    }
    else if(this.state.currentPage === 1){
      alert('您已在第一頁囉！')
    }
    else if(this.state.currentPage > 4)
    {
      alert('您已在最後一頁囉！')
    }
  }
  /* -------------- 商城相關函式 end -------------- */

  /* -------------- 購物車相關函式 start -------------- */
  // 將商品加入購物車的函式
  addProductHandler = (cardName) => {
    let anotherShopCart = [...this.state.shopCart];
    const index = this.state.shop.findIndex(element => element.name === cardName);
    let aCard = {...this.state.shop[index]};
    anotherShopCart.push(aCard);
    this.setState({shopCart : anotherShopCart});
    alert('成功加入至購物車');
  }

  // 將商品移除購物車的函式
  removeProductHandler = (cardIndex) => {
    const shopCart = [...this.state.shopCart];
    shopCart.splice(cardIndex,1);
    this.setState({shopCart:shopCart});
  }
  /* -------------- 購物車相關函式 end -------------- */

  // 處理頁面顯示的函式
  switchHandler = (mode) => {
      this.setState({mode:mode});
      
      //一些後續調整
      if(mode === 0){
        this.setState({searchProductName:''});
        this.setState({showButton:true});
      }
      else if(mode === 1){
        this.setState({searchCardName:''});
      }
      else if(mode === 3){
        const productName = document.getElementById("productName").value; //去抓「form 中 input 的值」
        this.setState({searchPNameFromNav:productName});
        this.setState({showButton:false});
      }
  }

  render() {

    let deckStyle = {
      width: '550px',
      display:'flex',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
      margin: '10px 50px',
      backgroundImage:'url(https://1.bp.blogspot.com/-OQYDrRTYcxY/Xq-LQBhY9_I/AAAAAAAABbs/x5SCP5fSLHk3q_iPablUztFjEn8OEHJBwCK4BGAsYHg/s320/deckbox.jpg)',
	    backgroundPosition: 'center',
      height: '700px'
    };
    
    /*當牌組張數超過20張後就不再有固定長度 */
    if(this.state.decklist.length > 20){
        delete deckStyle.height;
    }


    /* ------------------------------- 牌組編輯器 start  ------------------------------- */
    const searchCardList = this.state.db.filter( (aCard,index) => {
      return aCard.name.toLowerCase().includes(this.state.searchCardName.toLowerCase());
    })

    const CardBuilderApp = (
      <div>
        <div className = "Header">
          <h1 id="title">遊戲王卡組編輯器</h1>
        </div>
        <div className = "block">
          <Deck decklist = {this.state.decklist} click = {this.removeCardHandler} style = {deckStyle} btnClick = {this.clearDeckHandler}/>
          <CardDB db = {searchCardList} click = {this.deckBuildHandler} changed = {this.searchCardChangeHandler}/>
        </div>
      </div>
    );
    /* ------------------------------- 牌組編輯器 end  ------------------------------- */

    /* ------------------------------- 卡片商城 start  ------------------------------- */

    /*當商品展示區沒有符合條件的商品時，顯示「找不到符合挑件的商品」*/
    let product = (
      <div>
        <h3>找不到符合條件的商品</h3>
        <div>
          <img alt = "微笑" src = "https://imgur.com/MXys5Wa.png"></img>
        </div>
        <button onClick = {() => {this.switchHandler(0)}}>返回搜尋</button>
      </div>
    )

    let searchCardGallery = null;
    if(this.state.mode === 3) // 從Nav搜尋
    { 
      searchCardGallery = this.state.db.filter( (aCard,index) => {
        return aCard.name.toLowerCase().includes(this.state.searchPNameFromNav.toLowerCase());
      })
    }
    else // 從下方快速搜尋欄搜尋
    {
      searchCardGallery = this.state.shop.filter( (aCard,index) => {
        return aCard.name.toLowerCase().includes(this.state.searchProductName.toLowerCase());
      })
    }

    if(searchCardGallery.length > 0){
      product = (
        <CardGallery 
          cards = {searchCardGallery} 
          changed = {this.searchProductChangeHandler} 
          click = {this.addProductHandler} 
          nextPage = {this.nextPageHandler} 
          curPage = {this.state.currentPage}
          showButton = {this.state.showButton}  
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
    
    if(this.state.mode === 3) //表示為從Nav搜尋商品
    {
        Header = (
          <div className = "Header">
            <p>搜尋 {this.state.searchPNameFromNav} 的結果如下，共 {searchCardGallery.length} 筆符合條件的商品</p>
          </div>
        )
    }

    const CardShopApp = (
        <div>
          {Header}
          <div className = "CardShop">
            {product}  
          </div>
        </div>
    );
    /* ------------------------------- 卡片商城 end  ------------------------------- */

    /* ------------------------------- 購物車 start  ------------------------------- */
    
    // 當購物車為空時就要讓購物車頁面顯示「您的購物車目前沒有商品」
    // img用div包住是因為要讓整個水平面只有單一元素，否則會跟button並排
    // button按下去後會返回到商場首頁
    let shopping = (
      <div>
        <h3>您的購物車目前沒有商品唷</h3>
        <div>
          <img style = {{maxWidth:"100px",marginBottom:"10px"}} alt = "購物車" src="https://i.imgur.com/NAwHDGt.png" />
        </div>
        <button onClick = {() => {this.switchHandler(0)}}>前往選購</button>
      </div> 
    );

    if(this.state.shopCart.length > 0){
      shopping = (
         <div>
           <ShoppingCart cards = {this.state.shopCart} click = {this.removeProductHandler}/>
           <button onClick = {() => {this.switchHandler(0)}}>繼續選購</button>
         </div>
      )
    }

    const ShopCartApp = (
      <div>
        <div className = "Header">
          <h1 id ="title">您的購物車</h1>
          </div>
        <div>
          {shopping}
        </div>
      </div>
    );
    /* ------------------------------- 購物車 end  ------------------------------- */

    
    // 儲存全部頁面的陣列
    const PageArray = [CardShopApp,CardBuilderApp,ShopCartApp,CardShopApp];

    return (
      <div className="App">
        <Nav click = {this.switchHandler} changed = {this.searchProductChangeHandler}/>
          {PageArray[this.state.mode]}
        <Footer/>
      </div>
    );

  }
}

export default App;
