import React from 'react'
import loadingClass from './LoadingApp.css'

const loadingApp = () => (
    <div>
        <h3 className = {loadingClass.loadText}>Loading...</h3>
        <div className = {loadingClass.loading}></div>
    </div>
)

export default loadingApp