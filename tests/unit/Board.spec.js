import { render } from '@testing-library/vue';
import Board from '../../src/components/Board.vue';

describe('Board.vue', () => {
    it('Test basic render of Board', () => {
        const title = 'Welcome to Simple BlackJack';
        const { getByText } = render(Board, {
            props: { title }
        });
        expect(getByText(title)).toBeTruthy();
    });
});