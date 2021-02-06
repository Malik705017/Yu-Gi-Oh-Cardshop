import React from 'react';

//props state children
const Scroll = (props) => {
    const style = {
        overflowY:'scroll',
        height: '700px',
        margin: '10px 50px'
    }

    return(
        <div style = {style}>
            {props.children}
        </div>
    )
};

export default Scroll;