<template>
  <div class="chambers--votes">
    <template v-if="anyVotes">
      <Vote v-for="vote in votes" :key="vote.bill.bill_id" :vote="vote"/>
    </template>
    <template v-else>
      <div class="message">{{message}}</div>
    </template>
  </div>
</template>
<script>
import Vote from '~/components/Vote'

export default {
  name: 'VoteDisplay',
  components: {
    Vote
  },
  props: {
    message: String,
    votes: Array
  },
  computed: {
    anyVotes () {
      return this.votes.length > 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.message {
  text-align: center;
  font-family: 'Merriweather';
  font-size: 24px;
  color: $blue;
  padding: 16px 32px 32px 32px;
}

.chambers--votes {
  padding-top: 16px;
}
</style>
