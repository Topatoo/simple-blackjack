<template>
  <div class="card__wrapper">
      <div class="card__header">{{ text }}</div>
      <div class="card__suit">
          <img class="card__image" :alt="suit" :src="suitIcon()" />
      </div>
      <div class="card__footer">{{ text }}</div>
  </div>
</template>

<script>
import { integer, string } from 'vue-types';
import heart from '../assets/heart.png';
import diamond from '../assets/diamond.png';
import club from '../assets/club.png';
import spade from '../assets/spade.png';

export default {
    name: 'Card',
    props: {
        text: string().isRequired,
        value: integer().isRequired,
        suit: string().isRequired,
    },
    methods: {
        suitIcon() {
            switch (this.suit) {
                case 'heart':
                    return heart;
                case 'diamond':
                    return diamond;
                case 'club':
                    return club;
                case 'spade':
                    return spade;
                default:
                    return '';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .card {
        &__wrapper {
            width: 4rem;
            padding: 2px;
            border: 1px solid black;
            border-radius: 10px;
            background: white;
        }
        &__header {
            display: flex;
            justify-content: flex-start;
            padding-left: 2px;
        }
        &__suit {
            display: flex;
            justify-content: center;
        }
        &__image {
            width: 50%;
        }
        &__footer {
            display: flex;
            justify-content: flex-end;
            padding-right: 2px;
        }
    }
</style>