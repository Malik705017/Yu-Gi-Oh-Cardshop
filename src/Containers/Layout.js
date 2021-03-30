import React, { useState } from 'react'
import Nav from '../Components/Common/Nav/Nav'
import SideDrawer from '../Components/Common/SideDrawer/SideDrawer'
import Footer from '../Components/Common/Footer/Footer'


function Layout (props) {
    const [showSideDrawer,setSideDrawer] = useState(false)

    const openHandler = () => {
        setSideDrawer(true)
    }

    const closeHandler = () => {
        setSideDrawer(false)
    }

    return(
        <div>
            <Nav click = {props.switch} open = {openHandler} changed = {props.search}/>
            <SideDrawer click = {props.switch} open = {showSideDrawer} close = {closeHandler}/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout