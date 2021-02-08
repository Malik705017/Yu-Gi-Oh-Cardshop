# Side Project  - 遊戲王卡購物網站
這是我在上了 Udemy 的 React 課程 [React - the complete guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) 的前五章節後，以 React 為前端框架寫的簡易版購物網站，這份文件將會涵蓋以下內容，對自己的學習做點紀錄之餘，也能讓大家了解如何使用這個專案。

![展示頁](https://imgur.com/jnR7AZO.png)

## Table of content
- [Function 網站功能](#Function)
- [How to use 如何使用這個網站](#How-to-use)
- [Structure 網站結構](#Structure)
  - [Container 程式碼說明](#Container)
  - [Component 程式碼說明](#Component)
    - [Card](#Card)
    - [CardProduct](#CardProduct)
    - [CardGallery](#CardGallery)
    - [CardDB](#CardDB)
    - [Deck](#Deck)
    - [Scroll](#Scroll)
    - [SearchBox](#SearchBox)
- [Notes 一些心得筆記](#Notes)

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
此專案的結構相對單純，僅使用到 1 個 container 和 11 個 component，關係如下：
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

其他元素：
#### Scroll
#### SearchBox

## Notes
