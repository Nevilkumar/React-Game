import React, { useEffect, useState } from 'react'

import './App.css';
import SingleCard from './components/SingleCard/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", "matched": false },
  { "src": "/img/potion-1.png", "matched": false },
  { "src": "/img/ring-1.png", "matched": false },
  { "src": "/img/scroll-1.png", "matched": false },
  { "src": "/img/shield-1.png", "matched": false },
  { "src": "/img/sword-1.png", "matched": false },
]

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, "id": Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    if(choiceOne) 
      setChoiceTwo(card);
    else
      setChoiceOne(card);
  }

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(p => p+1);
    setDisabled(false);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo)
    {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src)
      {
        setCards(p => {
          return p.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, "matched": true}
            }
            else{
              return card;
            }
          })
        })
      }
      setTimeout(() => resetChoices(), 800);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffle();
  }, []);
  return (
    <div className='App'>
      <div className='left'>
        <h1 className='title'>Magic Match</h1>
        <button onClick={shuffle}>New Game</button>
        <p className='turns'>Turns: {turns}</p>
      </div>

      <div className='card-grid'>
        {
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={ card === choiceOne || card === choiceTwo || card.matched === true}
              disabled={disabled}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
