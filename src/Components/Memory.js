import { useEffect, useState } from 'react';
import styles from './Memory.module.css';
import Game from './Game.js';

const initialCards = [
  { "src": "/images/pkpng1.png", matched: false },
  { "src": "/images/pkpng2.png", matched: false },
  { "src": "/images/pkpng3.png", matched: false },
  { "src": "/images/pkpng5.png", matched: false },
  { "src": "/images/pkpng7.png", matched: false },
  { "src": "/images/pkpng9.png", matched: false },
];

function Memory() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    shuffleCards();
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  }, []);

  const shuffleCards = () => {
    const duplicatedCards = [...initialCards, ...initialCards];
    const shuffledCards = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false);
    setStartFlip(true);

    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (choiceOne.id !== card.id && !choiceTwo) {
      setChoiceTwo(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        const updatedCards = cards.map((card) =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        );
        setCards(updatedCards);
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={shuffleCards}>Start Over</button>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Game
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
            disabled={disabled}
            isMatched={card.matched}
          />
        ))}
      </div>
      <p className={styles.turns}>Rounds: {turn}</p>
    </div>
  );
}

export default Memory;
