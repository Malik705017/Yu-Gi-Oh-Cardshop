# Side Project 1 - 遊戲王卡購物網站
這是我在上了 Udemy 的 React 課程 [React - the complete guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) 的前五章節後，以 React 為前端框架寫的簡易版購物網站，這份文件將會涵蓋以下內容，對自己的學習做點紀錄之餘，也能讓大家了解如何使用這個專案。

## Table of content
- [Function 網站功能](#Function)
- [How to use 如何使用這個網站](#How-to-use)
- [Structure 網站結構](#Structure)
  - [Component 程式碼說明]()
  - [Container 程式碼說明]()
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

## Structure
### Component
本專案共使用了 11 個 component，分組整理如下：
- Card：最基本的元素
```const Card = (props) => {

    const style = {
        cursor: 'pointer'
    };
    return(
        <div>
            <img alt = "yu-gi-oh card" src = {props.src} onClick = {props.click} style={style}/>  
        </div>
    )
}```
- CardDB
- CardProduct
- CardGallery
- Deck
-
-
-
-
-
-
### Container

## Notes
