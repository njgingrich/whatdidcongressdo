<template>
  <section class="vote-container">
    <p class="question">{{questionText}}</p>
    <p class="question--highlight">{{questionHighlight}}</p>
    <p class="colon">:</p>
    <p class="motion-text">{{vote.description}}</p>
    <div class="votes">
      <VoteTally type="Yea"
                 :democratic="vote.democratic.yes"
                 :republican="vote.republican.yes"
                 :independent="vote.independent.yes"/>
      <VoteTally type="Nay"
                 :democratic="vote.democratic.no"
                 :republican="vote.republican.no"
                 :independent="vote.independent.no"/>
      <VoteTally type="N/V"
                 :democratic="vote.democratic.not_voting"
                 :republican="vote.republican.not_voting"
                 :independent="vote.independent.not_voting"/>
    </div>
    <div class="votes-result">
      <span class="result-text">{{vote.result}}</span>
    </div>
  </section>
</template>
<script>
import VoteTally from '~/components/VoteTally'

export default {
  name: 'Vote',
  props: {
    vote: Object
  },
  components: {
    VoteTally
  },
  computed: {
    questionText () {
      if (this.vote.chamber === 'House') {
        return this.vote.question.substring(0, 3)
      } else {
        return this.vote.question.substring(0, 7)
      }
    },
    questionHighlight () {
      if (this.vote.chamber === 'House') {
        return this.vote.question.substring(3)
      } else {
        return this.vote.question.substring(7)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.question {
  display: inline;
}

.question--highlight {
  display: inline;
  padding: 2px 3px;
  color: $blue;
  background-color: $white;
  font-weight: bold;
  text-transform: uppercase;
}

.question, .question--highlight, .colon {
  line-height: 1.8;
}

.colon {
  display: inline;
  padding-left: 1px;
}

.vote-container {
  margin: 16px;
  padding: 16px;

  font-family: 'Merriweather';
  background-color: $blue;
  color: $white;
}

.votes {
  display: flex;
}

.votes-result {
  padding-top: 16px;
}

.result-text {
  margin: 0;
  padding: 4px 6px;

  text-transform: uppercase;
  font-size: 24px;
  font-weight: bold;
  color: $blue;
  background-color: $white;
}
</style>
