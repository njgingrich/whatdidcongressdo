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
                 :independent="vote.independent.yes"
                 :independentsExist="independentsExist"/>
      <VoteTally type="Nay"
                 :democratic="vote.democratic.no"
                 :republican="vote.republican.no"
                 :independent="vote.independent.no"
                 :independentsExist="independentsExist"/>
      <VoteTally type="N/V"
                 :democratic="vote.democratic.not_voting"
                 :republican="vote.republican.not_voting"
                 :independent="vote.independent.not_voting"
                 :independentsExist="independentsExist"/>
    </div>
    <div class="votes-footer">
      <div class="votes-result">
        <span class="result-text">{{vote.result}}</span>
      </div>
      <div class="votes-learnmore">
        <a :href="vote.url" target="_bloank" rel="noopener" class="learnmore">Read more</a>
      </div>
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
    },
    independentsExist () {
      // independent.present being 0 does not mean none of them voted
      return (this.vote.independent.no + this.vote.independent.yes + this.vote.independent.not_voting) > 0
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
  margin-bottom: 32px;
  padding: 16px;

  font-family: 'Merriweather';
  background-color: $blue;
  color: $white;

  box-shadow: 0 8px 8px -3px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 16px -3px rgba(0, 0, 0, 0.8);
    transform: translateY(-2px);

    .votes-footer .votes-learnmore {
      background-color: $beige-light;
      a {
        color: $blue;
      }
    }
  }
}

.votes {
  display: flex;
}

.votes-footer {
  display: flex;
}

.votes-result {
  padding-top: 16px;
  margin-right: auto;
}

.votes-learnmore {
  align-self: flex-end;
  padding: 2px 36px 2px 3px;
  font-weight: bold;
  transform: translateX(32px);

  a, a:visited, a:active {
    text-decoration: none;
    color: $white;
  }
}

.result-text {
  margin: 0;
  padding: 4px 6px;

  text-transform: uppercase;
  font-weight: bold;
  color: $blue;
  background-color: $white;
}

@media (min-width: 979px) {
  .result-text {
    font-size: 24px;
  }
}
</style>
