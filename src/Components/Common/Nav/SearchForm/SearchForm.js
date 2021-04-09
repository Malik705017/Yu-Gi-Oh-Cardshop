import React from 'react'
import { connect } from 'react-redux';
import { search } from '../../../../redux/actions'
import navClass from '../Nav.css'

const mapStateToProps = state => ({
    cards: state.cardShop.cards
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchCard: () => dispatch(search()),
    }
}

const SearchForm = (props) => {

    const { onSearchCard } = props

    return(            
        <form className = {navClass.search}>
            <input className = {navClass.searchBox} type = {navClass.text} name='productName' id = {navClass.productName} />
            <input className = {navClass.searchIcon} type='button' data-action="submit" onClick = {onSearchCard}/>
        </form>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchForm)