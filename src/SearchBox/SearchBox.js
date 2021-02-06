import React from 'react';

const SearchBox = (props) => {
    return(
        <input onChange = {props.changed} style = {props.style}/>
    )
}

export default SearchBox ;