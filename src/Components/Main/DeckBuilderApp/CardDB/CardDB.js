import React from 'react';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import Scroll from '../../../Common/Scroll/Scroll';
import Card from '../../../Card/Card';
import './CardDB.css'

const CardDB = (props) => {
    const db = [...props.db];
    const click = props.click;

    return (
        <div className = "CardDB-Wrapper"> 
            <h2>卡片資料庫</h2>
            <SearchBox changed = {props.changed}/>
            <Scroll>
                <div className = "CardDB">
                    { db.map( (aCard , index) => {
                        return ( <Card 
                                key = {aCard.id} 
                                src = {aCard.card_images[0].image_url}
                                click = {()=> click(aCard.name)}
                                />  
                                )
                            }
                        )
                    }
                </div>
            </Scroll>
        </div>
    )
}


export default CardDB ;