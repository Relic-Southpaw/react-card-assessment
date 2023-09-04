import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

//BASE API VARIABLE TO USE MULTIPLE TIMES
const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

const DrawCardFromDeck = () => {
    const [deck, setDeck] = useState(null);
    const [drew, setDrew] = useState([]);
    const [noCards, setNoCards] = useState(false);


    useEffect(() => {
        async function getData() {
            let deck = await axios.get(`${API_BASE_URL}/new/shuffle`)
            setDeck(deck.data)
        }
        getData();
    }, [setDeck]);


    useEffect(() => {
        async function getCard() {
            let { deck_id } = deck;
            try {
                let drawRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);

                if (drawRes.data.remaining === 0) {
                    setNoCards(true);
                    throw new Error("YOU HAVE DRAWN THE WHOLE DECK!");
                }

                const card = drawRes.data.cards[0];

                setDrew(d => [
                    ...d,
                    {
                        id: card.code,
                        name: card.suit + " " + card.value,
                        image: card.image
                    }
                ]);
            } catch (err) {
                alert(err);
            }
        }
        getCard();
    }, [setNoCards, deck])


    const cards = drew.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ));

    if (noCards === true) {
        return (
            <div>
                <button onClick={() => window.location.reload(false)}>
                    Click to reload!
                </button>
                <div>
                    {cards}
                </div>
            </div>
        );

    } else {
        return (
            <div>
                <button onClick={() => getCard}>
                    Draw a card!!!
                </button>
                <div>
                    {cards}
                </div>
            </div>
        )
    }

}

export default DrawCardFromDeck;