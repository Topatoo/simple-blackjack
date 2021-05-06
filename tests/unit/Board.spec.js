import { render, fireEvent } from '@testing-library/vue';
import Board from '../../src/components/Board.vue';

describe('Board.vue', () => {
    const title = 'Welcome to Simple BlackJack';
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
            if (playerTotal.textContent.split(': ').pop() > 21) {
                playerBust = true;
            }
        }
        expect(getByText(/player has gone bust!/i)).toBeTruthy();
        expect(getByText(/dealer wins/i)).toBeTruthy();
    });
});