import React from 'react'
import Logo from '../Logo/Logo'
import appClass from '../../../Containers/App.css'   

const Header = (props) => {

  const { searchName, cardNum } = props
  const header = searchName === ''
    ?
    <div className = {appClass.Header}>
      <div className = {appClass.main_header}>
        <Logo/>
        <h1 id = {appClass.title}>Malik's卡片商城</h1>
      </div>
      <h1 id = {appClass.slogan}>花得更少，買得更好</h1>
    </div>
    :
    <div className = {appClass.Header}>
      <p>搜尋 {searchName} 的結果如下，共 {cardNum} 筆符合條件的商品</p>
    </div>

  return header

}

export default Header