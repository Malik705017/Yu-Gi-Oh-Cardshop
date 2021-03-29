import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import NavItem from '../Nav/NavItem/NavItem'
import CartLogo from '../CartLogo/CartLogo'
import Logo from '../Logo/Logo'
import classes from './SideDrawer.css';

const SRC = 'https://i.imgur.com/LQpYplk.png'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <div>
            <Backdrop show = {props.open} close = {props.close}/>
            <div className = {attachedClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavItem isHome = {true} show = {false} to = {'/'} text = {"首頁"}/>
                    <NavItem isHome = {false} show = {false} to = {'/deck'} text = {"牌組編輯"}/>
                    <NavItem isHome = {true} show = {false} to = {'/'} text = {"關於本站"}/>
                    <NavItem isHome = {false} show = {false} to = {'/'} text = {"登入"}/>
                    <NavItem isHome = {false} show = {false} to = {'/cart'}>
                        <CartLogo src = {SRC} />
                    </NavItem>
                </nav>
            </div>
        </div>
    );
}

export default sideDrawer;