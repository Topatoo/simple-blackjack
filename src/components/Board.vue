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
              <div class="board__controls">
                  <button :disabled="disableButtons" class="board__hit-button" @click="playerHit()">Hit</button>
                  <button :disabled="disableButtons" class="board__stand-button" @click="updatePlayerStand()">Stand</button>
              </div>
              <p v-if="playerBust" class="board__message">
                  Player has gone bust!
              </p>
          </div>
          <div class="board__players">
              <h2>Dealer</h2>
              <h3>Total: {{ dealerTotal }}</h3>
              <div v-if="dealerHand.length > 0" class="board__players-cards">
                  <div v-for="card in dealerHand" class="board__player-card" :key="`${card.text}-${card.suit}`">
                      <Card :suit="card.suit" :value="card.value" :text="card.text" />
                  </div>
              </div>
              <p v-if="dealerBust" class="board__message">
                  Dealer has gone bust!
              </p>
          </div>
      </div>
      <div v-if="winnerMessage">
          <p class="board__winner-message">
              {{ winnerMessage }}
          </p>
          <button class="board__play-button" @click="playAgain()">Play Again</button>
      </div>
  </div>
</template>

<script>
import { string } from 'vue-types';
import { createDeck } from '../utils/helpers';
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
            winnerMessage: null,
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
        dealerBust() {
            return this.dealerTotal > 21;
        },
        disableButtons() {
            return this.playerBust || this.playerStand;
        }
    },
    methods: {
        playerHit() {
            this.playerHand.push(this.deck.shift());
            if (this.playerBust) {
                this.updateWinnerMessage();
            }
        },
        updatePlayerStand() {
            this.playerStand = true;
            this.autoPopDealerHand();
            this.updateWinnerMessage();
        },
        dealerHit() {
            this.dealerHand.push(this.deck.shift());
        },
        autoPopDealerHand() {
            while (this.dealerTotal < 17) {
                this.dealerHit();
            }
        },
        createShuffledDeck() {
            this.deck = createDeck();
            for (let i = this.deck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
        },
        updateWinnerMessage() {
            if (this.playerBust) {
                this.winnerMessage = 'Dealer wins!'
            } else if (this.dealerBust) {
                this.winnerMessage = 'Player wins!'
            } else if (this.dealerTotal === this.playerTotal) {
                this.winnerMessage = 'Game is a draw.'
            } else if (this.dealerTotal > this.playerTotal) {
                this.winnerMessage = 'Dealer wins!'
            } else if (this.playerTotal > this.dealerTotal) {
                this.winnerMessage = 'Player wins!'
            } else {
                this.winnerMessage = null;
            }
        },
        playAgain() {
            this.deck = createDeck();
            this.playerHand = [];
            this.dealerHand = [];
            this.playerStand = false;
            this.winnerMessage = null;
            this.createShuffledDeck();
            this.dealPlayerHand();
        },
        dealPlayerHand() {
            this.playerHit();
            this.playerHit();
        },
    },
    created() {
        this.createShuffledDeck();
        this.dealPlayerHand();
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
            height: 40vh;
        }
        &__players {
            background: rgb(105, 193, 134);
            width: 40%;
            padding: 2px;
            border: 1px solid black;
            border-radius: 10px;
        }
        &__players-cards {
            display: flex;
            justify-content: center;
        }
        &__controls {
            padding: 8px;
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
        &__message {
            color: red;
            font-weight: 800;
        }
        &__winner-message {
            color: green;
            font-size: 30px;
            font-weight: 800;
        }
        &__play-button {
            height: 24px;
            width: 100px;
        }
    }
</style>