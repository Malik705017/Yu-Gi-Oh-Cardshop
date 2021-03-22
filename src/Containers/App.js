import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout'
import Loading from '../Components/Main/LoadingApp/LoadingApp';
import DeckBuilder from '../Components/Main/DeckBuilderApp/DeckBuilderApp'
import CardShop from '../Components/Main/CardShopApp/CardShopApp'
import Cart from '../Components/Main/ShoppingCartApp/ShoppingCartApp';
import {Router} from 'react-router-dom'
class App extends Component {
  state = {
      decklist : [],
      db : [],
      shop: [],
      shopCart:[],
      showButton: true,
      searchCardName: '',
      searchProductName:'',
      searchPNameFromNav:'',
      currentPage:1,
      mode:4
  }

  componentDidMount(){

      /* 宣告即執行 */
      (async () => {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes');
        //console.log(response)
        const data = response.data.data;
  
        const response2 = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blackwing');
        const data2 = response2.data.data;
        //console.log(data2);

        const dbData = data.concat(data2)

        setTimeout(()=>{this.setState({
          db:dbData,
          shop:dbData.slice(0,(dbData.length)/5-1),
          mode: 0
        })},"1000")
        

        console.log('componentDidMount')

      })().catch((err)=>console.log(err))
  }

  /* 牌組編輯器相關函式 */

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
  
  /* 商城相關函式 */

  //處理商城搜尋商品的函式
  searchProductChangeHandler = (event) => {
    this.setState({searchProductName:event.target.value});
  }

  // 處理商城換頁的函式
  nextPageHandler = (next) => {
    //console.log(next);
    const curIndex = (this.state.db.length)/5;
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
      this.setState({shop: this.state.db.slice(curIndex * curPage , curIndex * nextPage -1)});
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


  /*  購物車相關函式 */

  // 將商品加入購物車的函式
  addProductHandler = (cardName) => {
    let anotherShopCart = [...this.state.shopCart];
    const index = this.state.db.findIndex(element => element.name === cardName);
    let aCard = {...this.state.db[index]};
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


  /* 處理頁面顯示的函式 */
  


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
        const productName = document.getElementsByName("productName")[0].value; //去抓「form 中 input 的值」 
        this.setState({searchPNameFromNav:productName});
        this.setState({showButton:false});
      }
  }

  render() {

    console.log('render');


    // 第一次載入
    const LoadingApp = (
      <Loading/>
    )

    // 牌組編輯器
    const DeckBuilderApp = (
      <DeckBuilder 
        searchCardName = {this.state.searchCardName} 
        database = {this.state.db}
        deckList = {this.state.decklist}
        removeClick = {this.removeCardHandler}
        clearClick = {this.clearDeckHandler}
        cardList = {this.searchCardList}
        addClick = {this.deckBuildHandler}
        searchChange = {this.searchCardChangeHandler}
      />
    )

    // 卡片商城
    const CardShopApp = (
      <CardShop
        backSearchClick = {() => this.switchHandler(0)}
        mode = {this.state.mode}
        database = {this.state.db}
        shop = {this.state.shop}
        searchNav = {this.state.searchPNameFromNav}
        searchBox = {this.state.searchProductName}
        searchProductChange = {this.searchProductChangeHandler}
        addProductClick = {this.addProductHandler}
        nextPage = {this.nextPageHandler}
        curPage = {this.state.currentPage}
        showButton = {this.state.showButton}
      />
    )
    
    // 購物車
    const ShopCartApp = (
      <Cart  
        switchHandler = {() => this.switchHandler(0)}
        shopCart = {this.state.shopCart}
        removeClick = {this.removeProductHandler}
      />
    )

    // 註冊與登入頁面
    // const RegisterForm
    
    // 儲存全部頁面的陣列
    const Router = [CardShopApp,DeckBuilderApp,ShopCartApp,CardShopApp,LoadingApp];

    return (
        <Layout switch = {this.switchHandler} search = {this.searchProductChangeHandler}>
            {Router[this.state.mode]}
        </Layout>
    );

  }
}

export default App;
