import React from 'react'
import './LoadingApp.css'

let Header = (
    <div className = "Header">
      <div className = "Logo">
        <img id = "logoImg" alt = "logo" src = "https://imgur.com/c37t0NS.png"/>
        <h1 id = "title">Malik's卡片商城</h1>
      </div>
      <h1 id = "slogan">花得更少，買得更好</h1>
    </div>
  )

const loadingApp = () => (
    <div>
        {Header}
        <h3>Loading...</h3>
        <div className = "loading"></div>
    </div>
)

export default loadingApp