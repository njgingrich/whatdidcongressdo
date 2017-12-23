<template>
  <section class="container">
    <header class="header">
      <h1 class="header--text title-text">What Did Congress Do Today?</h1>
    </header>
    <h2 class="chambers--text title-text senate-header">Senate</h2>
    <div class="offset-box title-text senate-header--votes">
      <span>Votes</span>
    </div>
    <div class="offset-box title-text senate-header--floor">
      <span>Floor</span>
    </div>
    <section class="chamber senate">
      <div class="chambers--votes">
        <Vote v-for="vote in senateVotes" :key="vote.bill.bill_id" :vote="vote"/>
      </div>
      <div class="chambers--floor"></div>
    </section>
    <h2 class="chambers--text title-text house-header">House</h2>
    <div class="offset-box title-text house-header--votes">
      <span>Votes</span>
    </div>
    <div class="offset-box title-text house-header--floor">
      <span>Floor</span>
    </div>
    <section class="chamber house">
      <div class="chambers--votes">
        <Vote v-for="vote in houseVotes" :key="vote.bill.bill_id" :vote="vote"/>
      </div>
      <div class="chambers--floor"></div>
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
      houseVotes: this.$store.state.house.votes,
      senateVotes: this.$store.state.senate.votes
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getTodaysVotes')
    await store.dispatch('getTodaysFloorActions')
  }
}
</script>

<style lang="scss">
@import "~assets/styles/colors";

.container {
  display: grid;
  grid-template-columns: 1fr auto 32px auto 1fr;
  grid-template-rows: 100vh auto auto auto auto auto auto;
  grid-template-areas:
    "header  header  header header  header "
    "s-head  s-head  s-head s-head  s-head "
    ".       s-votes .      s-floor .      "
    ".       senate  senate senate  .      "
    "h-head  h-head  h-head h-head  h-head "
    ".       h-votes .      h-floor .      "
    ".       house   house  house   .      ";
}

.chamber {
  display: grid;
  grid-template-columns: minmax(auto, 520px) 32px minmax(50%, auto);
  grid-template-rows: auto;
  grid-template-areas: "votes . floor";
}

.chambers--votes {
  grid-area: votes;
}

.chambers--floor {
  grid-area: floor;
  min-width: 480px;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-image: url("~assets/images/congress.jpg");
  background-position-x: 50%;
  background-position-y: top;
  background-size: cover;
  height: 100vh;
}

.header--text {
  margin-top: 150px;
  margin-bottom: 0;
  padding: 16px 32px;
  font-size: 5vw;//56px;
  text-align: center;
  background-color: $blue;
  color: $white;
}

.chambers--text {
  margin: 0;
  padding: 32px 0 72px 0;
  font-size: 72px;
  text-align: center;
  color: $white;
  background-color: $blue;
}


.title-text {
  font-family: 'EB Garamond';
  font-weight: bold;
  text-transform: uppercase;
}

.offset-box {
  transform: translateY(-40px);
  span {
    padding: 8px 16px;
    background-color: $beige-light;
    color: $blue;
    font-size: 36px;
  }
}

.house {
  grid-area: house;
}

.house-header {
  grid-area: h-head;
}

.house-header--votes {
  grid-area: h-votes;

}

.house-header--floor {
  grid-area: h-floor;
}

.senate {
  grid-area: senate;
}

.senate-header {
  grid-area: s-head;
}

.senate-header--votes {
  grid-area: s-votes;
}

.senate-header--floor {
  grid-area: s-floor;
}
</style>
