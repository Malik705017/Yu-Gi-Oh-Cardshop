import React from 'react'
import navItemClass from './NavItem.css'


const NavItem = (props) => {
    
    let liClass = navItemClass.displayLi
    if (props.show) {
        liClass = navItemClass.sideLi
    }

    return(   
        <li 
            className = {liClass} 
            id = {props.id}
            onClick = { props.click }>
            {props.text}
            {props.children} 
        </li>
    )
}

export default NavItem