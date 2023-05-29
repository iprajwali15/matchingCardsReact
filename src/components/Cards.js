import React, { useEffect, useState } from "react";
import "./cards.css";

export default function Cards() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);

  const card = [
    { id: 1, name: "balbasaur" },
    { id: 2, name: "wartotle" },
    { id: 3, name: "blastoise" },
    { id: 4, name: "charizard" }
  ];

  //currently there are 4 pokemons but we need the pair

  const pairOfcards = [...card, ...card];

  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }

  useEffect(() => {
    if (openedCard < 2) return ;

    const firstMatched = pairOfcards[openedCard[0]];
    const secondMatched = pairOfcards[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);

  const handleRestart = () => {
    console.log("clicked");
    setOpenedCard([]);
    setMatched([]);
  };
  return (
    <div>
      <div className="cards">
        {pairOfcards.map((singlecard, index) => {
          //lets flip the card
          let isFlipped = false;
          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(singlecard.id)) isFlipped = true;
          return (
            <div
              className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <div>{singlecard.id}</div>
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="restart">
        <button onClick={handleRestart} color="primary" variant="contained">
          Restart
        </button>
      </div>
    </div>
  );
}
