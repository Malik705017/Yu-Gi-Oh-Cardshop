import React from 'react';

//props state children
const Scroll = (props) => {
    const style = {
        overflowY:'scroll',
        height: '700px',
        marginTop: '15px'
    }

    return(
        <div style = {style}>
            {props.children}
        </div>
    )
};

export default Scroll;