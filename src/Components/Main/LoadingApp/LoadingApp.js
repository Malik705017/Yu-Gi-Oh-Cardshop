import React from 'react'
import Logo from '../../Common/Logo/Logo'
import appClass from '../../../Containers/App.css'
import loadingClass from './LoadingApp.css'

let Header = (
    <div className = {appClass.Header}>
      <div className = {appClass.Logo}>
        <Logo/>
        <h1 id = {appClass.title}>Malik's卡片商城</h1>
      </div>
      <h1 id = {appClass.slogan}>花得更少，買得更好</h1>
    </div>
  )

const loadingApp = () => (
    <div>
        {Header}
        <h3 className = {loadingClass.loadText}>Loading...</h3>
        <div className = {loadingClass.loading}></div>
    </div>
)

export default loadingApp