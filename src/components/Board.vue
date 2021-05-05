<template>
  <div class="board">
      <h1>{{ msg }}</h1>
      <!-- <div class="board__wrapper">
          <div class="board__player">
              <h2>Player</h2>
          </div>
          <div class="board__house">
              <h2>House</h2>
          </div>
      </div> -->
      <div v-for="(card, index) in deck" :key="index">
          <Card :suit="card.suit" :value="card.value" :text="card.text" />
      </div>
  </div>
</template>

<script>
import { string } from 'vue-types';
import Card from '../components/Card';

export default {
    name: 'Board',
    components: {
        Card,
    },
    props: {
        msg: string().isRequired,
    },
    data() {
        return {
            deck: [],
        };
    },
    methods: {
        createShuffledDeck() {
            this.deck = this.createDeck();
            for (let i = this.deck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
        },
        createDeck() {
            const newDeck = [];
            const suits = ['heart', 'diamond', 'club', 'spade'];
            for (let i = 0; i < 4; i++) {
                const suit = suits[i];
                for (let j = 0; j < 13; j++) {
                    newDeck.push({
                        suit,
                        value: this.cardValue(j),
                        text: this.cardText(j),
                    });
                }
            }
            return newDeck;
        },
        cardValue(value) {
            let weight = 2;
            if (value < 9) {
                weight = weight + value;
            } else {
                weight = value < 12 ? 10 : 11;
            }
            return weight;
        },
        cardText(value) {
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
        },
    },
    created() {
        this.createShuffledDeck();
    },
};
</script>

<style lang="scss" scoped>

</style>