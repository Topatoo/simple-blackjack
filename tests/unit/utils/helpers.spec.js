import { cardText, cardValue, createDeck } from '../../../src/utils/helpers';

describe('helpers.js', () => {
    it('Test createDeck function', () => {
        const deck = createDeck();
        expect(deck.length).toBe(52);
        expect(deck[0]).toStrictEqual({ suit: 'heart', value: 2, text: '2' });
        expect(deck[12]).toStrictEqual({ suit: 'heart', value: 11, text: 'A' });
    });
    it('Test cardValue function', () => {
        const valueA = cardValue(0);
        expect(valueA).toStrictEqual(2);
        const valueB = cardValue(12);
        expect(valueB).toStrictEqual(11);
    });
    it('Test cardText function', () => {
        const textA = cardText(0);
        expect(textA).toStrictEqual('2');
        const textB = cardText(12);
        expect(textB).toStrictEqual('A');
    });
});
