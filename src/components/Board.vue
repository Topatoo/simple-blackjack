<template>
  <div class="board">
      <h1>{{ msg }}</h1>
      <div class="board__wrapper">
          <div class="board__players">
              <h2>Player</h2>
              <h3>Total: {{ playerTotal }}</h3>
              <div v-if="playerHand.length > 0" class="board__players-cards">
                  <div v-for="card in playerHand" class="board__player-card" :key="`${card.text}-${card.suit}`">
                      <Card :suit="card.suit" :value="card.value" :text="card.text" />
                  </div>
              </div>
              <div v-if="!playerStand || !playerBust" class="board__controls">
                  <button class="board__hit-button" @click="playerHit()">Hit</button>
                  <button class="board__stand-button" @click="playerStand = !playerStand">Stand</button>
              </div>
              <p v-if="playerBust" class="board__message">
                  Player has gone bust!
              </p>
          </div>
          <div class="board__players">
              <h2>Dealer</h2>
              <h3>Total: {{ dealerTotal }}</h3>
          </div>
      </div>
      <!-- <div v-for="(card, index) in deck" :key="index">
          <Card :suit="card.suit" :value="card.value" :text="card.text" />
      </div> -->
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
            playerHand: [],
            dealerHand: [],
            playerStand: false,
        };
    },
    computed: {
        playerTotal() {
            return this.playerHand.reduce((acc, item) => acc + item.value, 0);
        },
        dealerTotal() {
            return this.dealerHand.reduce((acc, item) => acc + item.value, 0);
        },
        playerBust() {
            return this.playerTotal > 21; 
        },
    },
    methods: {
        playerHit() {
            this.playerHand.push(this.deck.shift());
        },
        dealerHit() {
            this.dealerHand.push(this.deck.shift());
        },
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
    .board {
        height: 100vh;
        border-radius: 5px;
        &__wrapper {
            display: flex;
            justify-content: space-evenly;
            height: 60vh;
        }
        &__players {
            background: rgb(42, 172, 85);
            width: 40%;
            padding: 2px;
            border: 1px solid black;
            border-radius: 10px;
        }
        // &__dealer {
        //     background: rgb(42, 172, 85);
        //     width: 40%;
        //     padding: 2px;
        //     border: 1px solid black;
        //     border-radius: 10px;
        // }
        &__controls {
            padding: 0.5rem;
        }
        &__hit-button {
            margin-right: 10px;
            width: 20%;
            height: 24px;
        }
        &__stand-button {
            width: 20%;
            height: 24px;
        }
    }
</style>