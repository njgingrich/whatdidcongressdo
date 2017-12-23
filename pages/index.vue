<template>
  <section class="container">
    <header class="header">
      <h1 class="header--text">What Did Congress Do Today?</h1>
    </header>
    <section class="chambers">
      <section class="chamber house">
        <h2 class="chambers--text">House</h2>
        <Vote v-for="vote in houseVotes" :key="vote.bill.bill_id" :vote="vote"/>
      </section>
      <section class="chamber senate">
        <h2 class="chambers--text">Senate</h2>
        <Vote v-for="vote in senateVotes" :key="vote.bill.bill_id" :vote="vote"/>
      </section>
    </section>
  </section>
</template>

<script>
import Vote from '~/components/Vote'

export default {
  components: {
    Vote
  },
  data () {
    return {
      houseVotes: this.$store.state.votes.house,
      senateVotes: this.$store.state.votes.senate
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getTodaysVotes')
  }
}
</script>

<style lang="scss">
@import "~assets/styles/colors";

.header {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-image: url("~assets/images/congress.jpg");
  background-position-x: 50%;
  background-position-y: top;
  background-size: cover;
  height: 800px;
}

.header--text {
  margin-top: 150px;
  margin-bottom: 0;
  padding: 16px 32px;
  font-family: 'EB Garamond', serif;
  font-size: 56px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background-color: $blue;
  color: $white;
}

.chambers {
  display: flex;

  min-height: 600px;
}

.chamber {
  width: 50%;
}

.chambers--text {
  font-family: 'EB Garamond', serif;
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: $blue;
}
</style>
