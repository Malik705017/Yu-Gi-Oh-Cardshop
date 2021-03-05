# Side Project  - 遊戲王卡購物網站
這是我在上了 Udemy 的 React 課程 [React - the complete guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) 的前五章節後，以 React 為前端框架寫的簡易版購物網站，這份文件將會涵蓋以下內容，對自己的學習做點紀錄之餘，也能讓大家了解如何使用這個專案。

![展示頁](https://imgur.com/jnR7AZO.png)

## Demo
本專案部署在 Heroku 上，請點選此[連結](https://malik-card-game.herokuapp.com/)

## Table of content
- [Version Update 版本更新](#Version)
- [Function 網站功能](#Function)
- [How to use 如何使用這個網站](#How-to-use)
- [Structure 網站結構](#Structure)
  - [Container 程式碼說明](#Container)
    - deckBuildHandler
    - removeCardHandle
    - clearDeckHandler
    - searchCardChangeHandler
    - searchProductChangeHandler
    - nextPageHandler
    - addProductHandler
    - removeProductHandler
    - switchHandler
    
  - [Component 程式碼說明](#Component)
    - [Card](#Card)
    - [CardProduct](#CardProduct)
    - [CardGallery](#CardGallery)
    - [CardDB](#CardDB)
    - [Deck](#Deck)
    - [Nav](#Nav)
    - [Footer](#Footer)
    - [Scroll](#Scroll)
    - [SearchBox](#SearchBox)
- [Notes 一些心得筆記](#Notes)

## Version 
- v1.0 (2021/2/6)
- v1.1 取代原先將資料下載到本地端的方法，改使用 axios 套件實作 get API 的方法取得資料。並修改部分 bug 以提升效能。（2021/2/24）
- v1.2 修改原先專案架構，新增三個 component: DeckBuilderApp, ShoppingCartApp, CardShopApp 以減少 App.js render() 中的 code 行數。（2021/2/28）
- v1.3 修改網頁為響應式網頁，並改善第一次資料載入期間（fetching data）的畫面顯示（增加 loading.gif）。（2021/3/5）

## Function
本專案實作了兩個大功能，分別是卡組編輯器、卡片商城（包含：商品頁面與購物車）。
- 卡組編輯器：讓用戶能從卡片資料庫中點擊卡片，組成一副牌組。
- 卡片商城：模擬一般電商有的基本功能：顯示商品、將商品加入購物車與移除商品。

## How to use
### 安裝與執行
0) `package.json` store the info of environment 
1) Run `npm install` in the extracted folder
2) Run `npm start` to view the project

### 功能解說
- Navigation Bar : 在搜尋欄中輸入想購買的卡片，按下右方，會在 Card Shop 區塊得到符合搜尋條件的結果。
- Card Shop : 呈現商品的地方。在中間搜尋欄輸入想購買的卡片**會即時反饋搜尋內容**，點選加入購物車按鈕就會將商品放到購物車頁面中。換頁按鈕則會
- Shop Cart : 購物車。先前加入過的商品都會記錄在此，點選移除購物車按鈕就能將商品從購物車刪除。右方小計欄位會**會即時反饋金額加總與商品清單**
- Deck Builder : 
## Structure
此專案的結構相對單純，僅使用到 1 個 container 和 9 個 component，關係如下：
![架構圖](https://imgur.com/w37YrJk.png)
 
### Container
```javascript
  state = {
      decklist : [], /*卡組編輯器使用，儲存使用者的卡組*/
      db : DataBase, /*卡組編輯器使用，儲存所有的卡片資訊*/
      shop: DataBase.slice(0,(DataBase.length)/5-1), /*商城使用，儲存哪些商品會被顯示在商城頁面上*/
      shopCart:[], /*購物車使用，儲存哪些商品會被顯示在購物車頁面上*/
      showButton: true, /*商城使用，控制換頁的按鈕是否會顯示，預設會顯示，但當商城呈現的是搜尋結果時就改為不顯示*/
      searchCardName: '', /*卡組編輯器使用，存取使用者輸入的卡片名稱*/
      searchProductName:'', /*商城使用，存取使用者「在商品頁面搜尋欄」輸入的卡片名稱*/
      searchPNameFromNav:'', /*商城使用，存取使用者「在 Nav Bar」輸入的卡片名稱*/
      currentPage:1, /*商城使用，儲存商城現在所在的頁數*/
      mode:0 /*控制現在畫面應該顯示哪種服務：0為商城,1為卡組編輯器,2為購物車,3為「顯示搜尋結果」的商城*/
  }
```
container 運用到了 9 個函式，以下列舉9個函式的功能：
- deckBuildHandler：`Card`被點擊時所執行，會將`Card`的資訊存到`state`的`decklist`中。
- removeCardHandle：`Card`被點擊時所執行，會將`state`的`decklist`中所儲存的該卡移除。
- clearDeckHandler：`Deck`中的 button 被點擊時所執行，會將`state`的`decklist`中「所有」儲存的卡清空。
- searchCardChangeHandler：`CardDB`中的`SearchBox`被輸入時所執行，會即時將輸入的字更新在`state`的`searchCardName`中。
- searchProductChangeHandler：`CardGallery`中的`SearchBox`被輸入時所執行，會即時將輸入的字更新在`state`的`searchProductName`中。
- nextPageHandler：`CardGallery`中的換頁 button 被點擊時所執行，會將`state`的`currentPage`-1或＋1，並且更新`shop`的內容。
- addProductHandler：`CardProduct`中的加入購物車button被點擊時所執行，會將`state`的`shopCart`加入點擊的商品
- removeProductHandler：`CardProduct`中的移除購物車button被點擊時所執行，會將`state`的`shopCart`移除點擊的商品
- switchHandler：`Nav`中的標籤或搜尋button被點擊時所執行，會將`state`的`mode`切換到對應的服務內容，0為商城，1為卡組編輯器，2為購物車，3為「顯示搜尋結果」的商城。


### Component
#### Card
```javascript
const Card = (props) => {

    const style = {
        cursor: 'pointer'
    };
    return(
        <div>
            <img alt = "yu-gi-oh card" src = {props.src} onClick = {props.click} style={style}/>  
        </div>
    )
}
```
`button` 在 `onClick` 後會執行 `deckBuildHandler` 將卡片加入卡組(由上層的`CardDB`元素傳入)，或是 `removeCardHandler`將卡片移出卡組(由上層的`Deck`元素傳入)。

```javascript
deckBuildHandler = (cardName) => {
  let anotherDeckList = [...this.state.decklist];
  const index = this.state.db.findIndex(element => element.name === cardName);
  let aCard = {...this.state.db[index]};
  anotherDeckList.push(aCard);
  this.setState({decklist : anotherDeckList});
  //console.log(this.state.decklist);
}
```
```javascript
removeCardHandler = (cardIndex) => {
  const decklist = [...this.state.decklist];
  //console.log("before:",decklist);
  decklist.splice(cardIndex,1);
  this.setState({decklist:decklist});
  //console.log("after:",decklist);
}
```

#### CardProduct
```javascript
const CardProduct = (props) => {

    let text = "加入購物車";
    let clickFuncInput = props.name ;

    if (props.add === false){
        text = "移除此商品";
        clickFuncInput = props.index ;
    }

    return(
        <div className = "CardProduct">
            <Card src = {props.src} click = {console.log('click')}/>
            <div className = "CardInfo">
                <div className = "BasicInfo">
                    <p>{props.name}</p>
                    <p>USD： {props.price}</p>
                </div>
                <button onClick = { () => {props.click(clickFuncInput)}}>{text}<img class = "cartIcon" alt="購物車" src = "https://i.imgur.com/NAwHDGt.png"/>
            </div>
        </div>
    )
}
```
button 在 onClick 後會執行 `addProductHandler`，將商品加入購物車。

```javascript
  addProductHandler = (cardName) => {
    let anotherShopCart = [...this.state.shopCart];
    const index = this.state.shop.findIndex(element => element.name === cardName);
    let aCard = {...this.state.shop[index]};
    anotherShopCart.push(aCard);
    this.setState({shopCart : anotherShopCart});
    alert('成功加入至購物車');
  }
```
#### CardGallery
```javascript
const CardGallery = (props) => {

    
    let switchPageButton = (
        <div style = {divStyle}>
            <button onClick = {()=>props.nextPage(false)}>上一頁</button>
            <p style = {pStyle}>您目前在第 {props.curPage} 頁</p>
            <button onClick = {()=>props.nextPage(true)}>下一頁</button>
        </div>
    )

    let searchBox = (
        <div style = {divStyle}>
            <SearchBox changed = {props.changed}/>
        </div>
    )

    if(props.showButton === false){
        switchPageButton = (
            <div></div>
        )
        searchBox = (
            <div></div>
        )
    }

    return(
        <div>
            {searchBox}
            {switchPageButton}
            <div className = "CardGallery">
                { props.cards.map( (aCard , index) => {
                    return ( <CardProduct 
                            key = {aCard.id}
                            src = {aCard.card_images[0].image_url}
                            name = {aCard.name}
                            price = {aCard.card_prices[0].amazon_price}
                            click = {props.click}
                            add = {true}
                            />  
                            )
                        }
                    )
                }
            </div>
            {switchPageButton}
        </div>
    )
}
```
`CardGallery` 是商城的重要元素，他會管理現在顯示了哪些 `CardProduct` 在商城中。商城有兩種可能的樣貌：有換頁功能或是無換頁功能。這部分由 `state` 的 `showButton` 控制。`CardGallery`在此會傳入的函式包括：1. `switchPageButton` 部分：`nextPageHandler` 2.`CardProduct`部分：`addProductHandler`。

```javascript
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
```

#### CardDB
```javascript
const CardDB = (props) => {
    const db = [...props.db];
    const click = props.click;

    return (
        <div> 
            <h2>卡片資料庫</h2>
            <SearchBox changed = {props.changed}/>
            <Scroll>
                <div className = "CardDB">
                    { db.map( (aCard , index) => {
                        return ( <Card 
                                key = {aCard.id} 
                                src = {aCard.card_images[0].image_url}
                                click = {()=> click(aCard.name)}
                                />  
                                )
                            }
                        )
                    }
                </div>
            </Scroll>
        </div>
    )
}
```
此元素顯示有哪些卡片在「資料庫」當中，會傳入`deckBuildHandler`這個函式。當Card元素被點擊時，就會將該卡片加入使用者編輯的卡組中。

#### Deck
```javascript
const Deck = (props) => {
    return(
        <div> 
            <h2>您的牌組</h2>
            <div style = {{display:'flex', justifyContent:'center'}}>
                <p style = {{marginRight:'5px'}}>牌組張數：{props.decklist.length}</p>
                <button onClick = {props.btnClick}>一鍵清空</button>
            </div>
            <div className="Deck" style={props.style}>
            {props.decklist.map( (aCard , index) => {
                return ( <Card 
                        key = {index}
                        src = {aCard.card_images[0].image_url}
                        click = {()=> props.click(index)}/>  
                        )
                    }
                )
            }
            </div>
        </div>
    )
}
```
此元素顯示了現在使用者編輯的卡組內容。元素組成分兩個部分，第一個 `div` 中顯示現在有多少卡，以及有一個 `button` 按下後會執行 `clearDeckHandler ` 將卡組中的所有卡片清空。第二個 `div` 則會顯示當前卡組有的卡片，其中 `Card` 元素傳入的 `click` 參數是 `removeCardHandler`，因此點擊時就會將該卡移除。

#### ShoppingCart
```javascript
const ShoppingCart = (props) => {

    /*計算總價*/
    let totalPrice = 0;

    for(let i = 0 ; i <  props.cards.length ; i++){
        totalPrice += parseFloat(props.cards[i].card_prices[0].amazon_price);
    }

    /*小數四捨五入（直接copy別人的函式XD）*/
    var roundDecimal = function (val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }

    totalPrice = roundDecimal(totalPrice,2);

    const pStyle = {
        fontSize:'20px'
    }


    return(
        <div className = "ShoppingCart">
            <div className = "CardGallery W-70">
                { props.cards.map( (aCard,index) => {
                    return ( <CardProduct 
                                key = {aCard.id}
                                index = {index}
                                src = {aCard.card_images[0].image_url}
                                name = {aCard.name}
                                price = {aCard.card_prices[0].amazon_price}
                                click = {props.click}
                                add = {false}
                                />  
                                )
                            }
                        )
                }
            </div>
            <div className = "CartList">
                <p style = {pStyle}>小計：${totalPrice}</p>
                <div>
                { props.cards.map( (aCard,index) => {
                    return( 
                            <div className = "ListItem">
                                <p>{index+1}.</p>
                                <p>{aCard.name}</p>
                                <p className = "itemPrice">{aCard.card_prices[0].amazon_price}</p>
                            </div>
                        )
                        }
                    )
                }
                </div>
            </div>
        </div>
    )
}
```
`ShoppingCart`一樣分兩個部分，分別呈現在畫面的左右兩邊。左方會顯示購物車有哪些商品以及價格（引入`CardProduct`），右方則是結帳清單，計算目前的總金額與所有商品品項清單。這邊CardProduct被點擊時，所觸發的函式是`removeProductHandler`。由於需要計算總金額(`totalPrice`)，因此在`ShoppingCart`的一開始會有計算邏輯的部分。

```javascript
  removeProductHandler = (cardIndex) => {
    const shopCart = [...this.state.shopCart];
    shopCart.splice(cardIndex,1);
    this.setState({shopCart:shopCart});
  }
```

#### Nav
```javascript
const Nav = (props) => {

    const SearchBoxStyle = {
        width:'100%',
        height:'20px',
        padding:'5px',
        border:'0px',
        margin:'0 10px 0 0'

    }

    const cartIconStyle = {
        maxWidth:'30px'
    }

    return(
        <nav className="header">
            <ul className = "main-nav">
                <li onClick = { () => props.click(0)}>首頁</li>
                <li onClick = { () => props.click(1)}>牌組編輯器</li>
                <li onClick = { () => props.click(0)}>關於本站</li>
                <form className="search">
                    <input type='text' name='productName' id='productName' style = {SearchBoxStyle}  />
                    <input className = "addSearchIcon" type='button' data-action="submit" onClick = {() => props.click(3)}/>
                </form>
                <div className = "push" >
                    <li onClick = { () => props.click(0)}>登入</li>
                    <li onClick = { () => props.click(2)}><img style = {cartIconStyle} alt = "購物車" src="省略" /></li>
                </div>
            </ul>
        </nav>
    )
}
```
`Nav` 其實就是 Navigation Bar 的意思，props.click 會執行 `switchHandler` 函式，更改 container's state 的 mode。如同我們在 [container](#container)所提到的，mode = 0,1,2分別代表首頁、卡組編輯器、購物車，因此`switchHandler`會幫我們做這些轉換。
```javascript
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
```

#### Footer
```javascript
const Footer = () => {
    return(
        <div className = "footer">
            <h2>COPYRIGHT © 2021 Malik's Card Game </h2>
        </div>
    )
}
```
#### Scroll
```javascript
const Scroll = (props) => {
    const style = {
        overflowY:'scroll',
        height: '700px',
        margin: '10px 50px'
    }

    return(
        <div style = {style}>
            {props.children}
        </div>
    )
};
```
#### SearchBox
```javascript
const SearchBox = (props) => {
    return(
        <input onChange = {props.changed} style = {props.style}/>
    )
}
```

## Notes
這是我第一個自己做的 React project，一直以來就很想做電商商城這類的網站，在寒假終於有時間做一個簡單版的出來，總計花了5天的時間。
特別感謝：https://db.ygoprodeck.com/api-guide/ 提供了完整的遊戲王卡片資訊，讓我可以直接拿來使用。
