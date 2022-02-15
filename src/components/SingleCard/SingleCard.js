import React from 'react'

import './SingleCard.css';

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if(!disabled)
            handleChoice(card);
    }

    return (
    <>
        <div className='card'>
            <div className={flipped ? "flipped": ""}>
                <img className='front' draggable={false} src={card.src} alt="Front Card" />
                <img 
                    className='back' 
                    draggable={false} 
                    src="/img/cover.png" 
                    onClick={handleClick} 
                    alt="Cover Card" />
            </div>
        </div>
    </>
    )
}

export default SingleCard