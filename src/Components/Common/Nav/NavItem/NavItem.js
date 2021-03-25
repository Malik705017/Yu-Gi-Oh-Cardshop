import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { clearSearch } from '../../../../Redux/actions'
import navItemClass from './NavItem.css'

const mapStateToProps = state => ({})
  
const mapDispatchToProps = dispatch => {
    return {
        clear: () => dispatch(clearSearch())
    }
} 

const NavItem = (props) => {
    const { show, isHome, isBar, id, to, text, children, clear } = props
    const linkClass = show ?  navItemClass.navLink : navItemClass.sideLink
    const click = isHome ? clear : () => undefined
    const navItem = isBar 
        ? 
        <div className = {linkClass} id = {id}>
            {children} 
        </div>
        : 
        <Link 
            className = {linkClass} 
            to = {to} 
            onClick = {click} 
            replace >
            {text}
            {children} 
        </Link>
        
    return navItem
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItem)