import React from 'react'
import appClass from '../../../Containers/App.css'
import loadingClass from './LoadingApp.css'

let Header = (
    <div className = {appClass.Header}>
      <div className = {appClass.Logo}>
        <img id = {appClass.logoImg} alt = "logo" src = "https://imgur.com/c37t0NS.png"/>
        <h1 id = {appClass.title}>Malik's卡片商城</h1>
      </div>
      <h1 id = {appClass.slogan}>花得更少，買得更好</h1>
    </div>
  )

const loadingApp = () => (
    <div>
        {Header}
        <h3>Loading...</h3>
        <div className = {loadingClass.loading}></div>
    </div>
)

export default loadingApp