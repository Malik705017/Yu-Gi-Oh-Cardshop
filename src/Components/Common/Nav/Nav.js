import React from 'react';
import NavItem from './NavItem/NavItem'
import CartLogo from '../CartLogo/CartLogo'
import navItemClass from './NavItem/NavItem.css'
import navClass from './Nav.css';

const SRC = "https://i.imgur.com/HjENLRN.png"

const Nav = (props) => {
    return(
        <nav className = {navClass.header}>
            <ul className = {navClass.mainNav}>
                <NavItem show = {false} id = {navItemClass.bars} click = {() => props.open()} ><i className = "fa fa-bars fa-2x"></i></NavItem>
                <NavItem show = {false} click = {() => props.click(0)} text = {"首頁"}/>
                <NavItem show = {false} click = {() => props.click(1)} text = {"牌組編輯"}/>
                <NavItem show = {false} click = {() => props.click(0)} text = {"關於本站"}/>
                <form className = {navClass.search}>
                    <input className = {navClass.searchBox} type = {navClass.text} name='productName' id = {navClass.productName} />
                    <input className = {navClass.searchIcon} type='button' data-action="submit" onClick = {() => props.click(3)}/>
                </form>
                <div className = {navClass.push} >
                    <NavItem show = {false} click = {() => props.click(0)} text = {"登入"}/>
                    <NavItem show = {false} click = {() => props.click(2)}>
                        <CartLogo src = {SRC} />
                    </NavItem>
                </div>
            </ul>
        </nav>
    )
}

             

export default Nav;

