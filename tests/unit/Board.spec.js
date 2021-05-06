import { render, fireEvent } from '@testing-library/vue';
import Board from '../../src/components/Board.vue';

describe('Board.vue', () => {
    const title = 'Welcome to Simple BlackJack';
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Test basic render of Board', () => {
        const { getByText } = render(Board, {
            props: { title }
        });
        expect(getByText(title)).toBeTruthy();
    });
    it('Test player busts and dealer wins', async () => {
        const { getByRole, getByText } = render(Board, {
            props: { title }
        });
        const hitButton = getByRole('button', { name: /hit/i });
        const playerTotal = getByRole('heading', { name: /player total:/i });
        let playerBust = false;
        while (playerBust === false) {
            await fireEvent.click(hitButton);
            if (parseInt(playerTotal.textContent.split(': ').pop()) > 21) {
                playerBust = true;
            }
        }
        expect(getByText(/player has gone bust!/i)).toBeTruthy();
        expect(getByText(/dealer wins/i)).toBeTruthy();
    });
    it('Test player stands and the game runs to completion, dealer wins, players wins or a draw', async () => {
        const { getByRole, getByText } = render(Board, {
            props: { title }
        });
        const standButton = getByRole('button', { name: /stand/i });
        const playerTotal = getByRole('heading', { name: /player total:/i });
        const playerScore = parseInt(playerTotal.textContent.split(': ').pop());
        // There is an edge case that the player could be dealt two aces at start and they would automatically bust
        // as Ace can only be 11 in simple black jack.
        if (playerScore === 22) {
            expect(getByText(/player has gone bust!/i)).toBeTruthy();
            expect(getByText(/dealer wins/i)).toBeTruthy();
            console.debug('Player bust, edge case for two Aces');
        } else {
            const dealerTotal = getByRole('heading', { name: /dealer total:/i });
            await fireEvent.click(standButton);
            const dealerScore = parseInt(dealerTotal.textContent.split(': ').pop());
            if (dealerScore > 21) {
                expect(getByText(/dealer has gone bust!/i)).toBeTruthy();
                expect(getByText(/player wins/i)).toBeTruthy();
            } else if (dealerScore > playerScore) {
                expect(getByText(/dealer wins/i)).toBeTruthy();
            } else if (playerScore > dealerScore) {
                expect(getByText(/player wins/i)).toBeTruthy();
            } else if (dealerScore === playerScore) {
                expect(getByText(/game is a draw/i)).toBeTruthy();
            }
        }
    });
});