import React from 'react';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import Scroll from '../../../Common/Scroll/Scroll';
import Card from '../../../Card/Card';
import carddbClass from './CardDB.css'

const CardDB = (props) => {
    const db = [...props.db];
    const click = props.click;

    return (
        <div className = {carddbClass.Wrapper}> 
            <h2>卡片資料庫</h2>
            <SearchBox changed = {props.changed}/>
            <Scroll>
                <div className = {carddbClass.CardDB}>
                    { db.map( aCard => 
                        <Card 
                            key = {aCard.id} 
                            src = {aCard.card_images[0].image_url}
                            click = {()=> click(aCard.name)}
                        />  
                        )
                    }
                </div>
            </Scroll>
        </div>
    )
}


export default CardDB ;