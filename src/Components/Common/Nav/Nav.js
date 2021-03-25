import React from 'react';
import SearchForm from './SearchForm/SearchForm'
import NavItem from './NavItem/NavItem'
import CartLogo from '../CartLogo/CartLogo'
import navItemClass from './NavItem/NavItem.css'
import navClass from './Nav.css';

const SRC = "https://i.imgur.com/HjENLRN.png"

const Nav = (props) => {

    const { open } = props

    return(
        <nav className = {navClass.mainNav}>
            <NavItem id = {navItemClass.bars} isBar = {true} isHome = {false} show = {false}>
                <i className = "fa fa-bars fa-2x" onClick = {() => open()}/>
            </NavItem>
            <NavItem isHome = {true} show = {true} to = {'/'} text = {"首頁"}/>
            <NavItem isHome = {false} show = {true} to = {'/deck'} text = {"牌組編輯"}/>
            <NavItem isHome = {true} show = {true} to = {'/'} text = {"關於本站"}/>
            <SearchForm/>
            <div className = {navClass.push} >
                <NavItem isHome = {false} show = {true} to = {'/'} text = {"登入"}/>
                <NavItem isHome = {false} show = {true} to = {'/cart'}>
                    <CartLogo src = {SRC} />
                </NavItem>
            </div>
        </nav>
    )
}

             

export default Nav;

