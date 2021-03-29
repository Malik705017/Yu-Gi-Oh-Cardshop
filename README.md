# Side Project  - 遊戲王卡購物網站
這是我在上了 Udemy 的 React 課程 [React - the complete guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) 的前五章節後，以 React 為前端框架寫的簡易版購物網站，本專案為響應式，同時支援電腦與手機，並以 PWA 為目標進行開發。這份 README 將會涵蓋我的版本歷史、如何使用、專案架構與個人心得，對自己的學習做點紀錄之餘，也能讓大家了解如何使用這個專案。

本專案也同步部署在 Heroku 上，請點選此 [連結](https://malik-card-game.herokuapp.com/) 來嘗試看看，也可以跟我回報有什麼 Bug !

## DEMO

### 電腦版
![電腦版](https://imgur.com/As47N1l.png)

### 手機版
![手機版Loading頁](https://i.imgur.com/haW4PV5m.jpg)
![手機版首頁](https://i.imgur.com/rDCZwDFm.jpg)
![手機版卡組編輯](https://i.imgur.com/lnKPualm.png)

## Table of content
- [Version Update 版本更新](#Version)
- [Function 網站功能](#Function)
- [How to use 如何使用這個網站](#How-to-use)
- [Structure 網站結構](#Structure)
  - [Container 程式碼說明](#Container)
  - [Component 程式碼說明](#Component)
- [Notes 一些心得筆記](#Notes)

## Version
- v1.4 以 redux 重構專案，優化 state management ，此外也導入 react-router-dom 套件來實作 routing 功能。（2021/3/25）
  - v1.4.1 修改主視覺，將 Linkedin 藍改為純黑色 (2021/3/26)
- v1.3 修改網頁為響應式網頁，並改善第一次資料載入期間（fetching data）的畫面顯示（增加 loading.gif）。（2021/3/5）
  - v1.3.1 修改商品欄位配色、優化 layout
  - v1.3.2 將 CSS 改為 CSS module，並對專案結構做調整。 (2021/3/20)
  - v1.3.3 新增 side drawer 並讓圖片 loading 完後能將 gif 移除。(2021/3/20)
  - v1.3.4 改善新增商品到購物車 Bug (`this.state.shop -> this.state.db`)，並移掉測試用的程式碼。(2021/3/22)
- v1.2 修改原先專案架構，新增三個 component: DeckBuilderApp, ShoppingCartApp, CardShopApp 以減少 App.js render() 中的 code 行數。（2021/2/28）
- v1.1 取代原先將資料下載到本地端的方法，改使用 axios 套件實作 get API 的方法取得資料。並修改部分 bug 以提升效能。（2021/2/24）
- v1.0 (2021/2/6)

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
- Card Shop : 呈現商品的地方。點選加入購物車按鈕就會將商品放到購物車頁面中。
- Shop Cart : 購物車。先前加入過的商品都會記錄在此，點選移除購物車按鈕就能將商品從購物車刪除。右方小計欄位會**會即時反饋金額加總與商品清單**
- Deck Builder : 牌組編輯器，可以自己建立牌組。

## Structure
此架構圖為剛建立專案時的架構(2/6)，已過時但尚未更新
![架構圖](https://imgur.com/w37YrJk.png)
 

## Notes
2/6
> Side project 開始動工！

這是我第一個自己做的 React project，一直以來就很想做電商商城這類的網站，在寒假終於有時間做一個簡單版的出來，總計花了5天的時間。
特別感謝：https://db.ygoprodeck.com/api-guide/ 提供了完整的遊戲王卡片資訊，讓我可以直接拿來使用。

3/21
> 當你東西變得愈來愈複雜，就需要一個架構去把職責切割開來，不然會造成日後維護上的困難。

今天拜讀完 Huli 大的[文章](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)，我覺得文中這句話真的挺好的，當規模大起來時就有這個動機跟需求去寫更好的架構，從一開始把所有東西都擠在 App.js 裡到把三個主要功能拆開成三個 XXApp.js 檔案，現在我有考慮要再把職責切更多讓這三個檔案各自維護 state 了。

3/25
> Redux is so gooood !

從 3/21 決定要優化 state 的管理後，就在 useContex 與 redux 中做抉擇，最後決定採用 redux。 redux 成功幫我把 state 拉到更高的層級並讓所有 state 統一由 reducer 做管理，讓整個 data flow 清晰不少。




