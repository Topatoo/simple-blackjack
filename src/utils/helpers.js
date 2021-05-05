export const createDeck = () => {
    const newDeck = [];
    const suits = ['heart', 'diamond', 'club', 'spade'];
    for (let i = 0; i < 4; i++) {
        const suit = suits[i];
        for (let j = 0; j < 13; j++) {
            newDeck.push({
                suit,
                value: cardValue(j),
                text: cardText(j),
            });
        }
    }
    return newDeck;
};

export const cardValue = value => {
    let weight = 2;
    if (value < 9) {
        weight = weight + value;
    } else {
        weight = value < 12 ? 10 : 11;
    }
    return weight;
};

export const cardText = value => {
    let text = `${value + 2}`;
    if (value === 9) {
        text = 'J';
    }
    if (value === 10) {
        text = 'Q';
    }
    if (value === 11) {
        text = 'K';
    }
    if (value === 12) {
        text = 'A';
    }
    return text;
};
