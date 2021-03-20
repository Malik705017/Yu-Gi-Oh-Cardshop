import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import NavItem from '../Nav/NavItem/NavItem'
import CartLogo from '../CartLogo/CartLogo'
import Logo from '../Logo/Logo'
import classes from './SideDrawer.css';

const SRC = "https://i.imgur.com/UpoDOFK.png"

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
                    <ul className = {classes.p0}>
                        <NavItem show = {props.open} click = {() => props.click(0)} text = {"首頁"}/>
                        <NavItem show = {props.open} click = {() => props.click(1)} text = {"牌組編輯"}/>
                        <NavItem show = {props.open} click = {() => props.click(0)} text = {"關於本站"}/>
                        <NavItem show = {props.open} click = {() => props.click(0)} text = {"登入"}/>
                        <NavItem show = {props.open} click = {() => props.click(2)}><CartLogo src = {SRC}/></NavItem>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default sideDrawer;