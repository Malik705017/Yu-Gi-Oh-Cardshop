import React from 'react';
import SearchBox from '../../SearchBox/SearchBox';
import Scroll from '../../Scroll/Scroll';
import Card from '../../Card/Card';

const CardDB = (props) => {
    const db = [...props.db];
    const click = props.click;

    return (
        <div> 
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