<template>
  <section class="container">
    <Navbar>
      <a href="#senate" class="link-item title-text">Senate</a>
      <a href="#house" class="link-item title-text">House</a>
    </Navbar>
    <header class="header">
      <h1 class="header--text title-text">What Did Congress Do Today?</h1>
    </header>
    <h2 id="senate" class="chambers--text title-text senate-header">Senate</h2>
    <div class="offset-box title-text senate-header--votes">
      <span>Votes</span>
    </div>
    <div class="offset-box title-text senate-header--floor">
      <span>Floor Actions</span>
    </div>
    <div class="chambers--votes senate">
      <Vote v-for="vote in senateVotes" :key="vote.bill.bill_id" :vote="vote"/>
    </div>
    <div class="chambers--floor senate">
      <FloorAction v-for="action in senateActions" :key="action.timestamp" :action="action"/>
    </div>
    <h2 id="house" class="chambers--text title-text house-header">House</h2>
    <div class="offset-box title-text house-header--votes">
      <span>Votes</span>
    </div>
    <div class="offset-box title-text house-header--floor">
      <span>Floor Actions</span>
    </div>
    <div class="chambers--votes house">
      <Vote v-for="vote in houseVotes" :key="vote.bill.bill_id" :vote="vote"/>
    </div>
    <div class="chambers--floor house">
      <FloorAction v-for="action in houseActions" :key="action.timestamp" :action="action"/>
    </div>
  </section>
</template>

<script>
import FloorAction from '~/components/FloorAction'
import Navbar from '~/components/Navbar'
import Vote from '~/components/Vote'

export default {
  components: {
    FloorAction,
    Navbar,
    Vote
  },
  data () {
    return {
      houseVotes: this.$store.state.house.votes,
      senateVotes: this.$store.state.senate.votes,
      senateActions: this.$store.state.senate.floor_actions,
      houseActions: this.$store.state.house.floor_actions
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
  grid-template-columns: 1fr 90vw 1fr;
  grid-template-rows: 56px 100vh repeat(10, auto);
  grid-template-areas:
    "navbar    navbar    navbar"
    "header    header    header"
    "s-head    s-head    s-head"
    "s-h-votes s-h-votes s-h-votes"
    ".         s-votes   .     "
    "s-h-floor s-h-floor s-h-floor"
    ".         s-floor   .     "
    "h-head    h-head    h-head"
    "h-h-votes h-h-votes h-h-votes"
    ".         h-votes   .     "
    "h-h-floor h-h-floor h-h-floor"
    ".         h-floor   .     ";
  overflow: hidden;
}

.offset-box {
  span {
    display: block;
    padding: 8px 16px;
    background-color: $beige-light;
    color: $blue;
    font-size: 36px;
    text-align: center;
  }
}

.senate {
  &.chambers--votes {
    grid-area: s-votes;
  }

  &.chambers--floor {
    grid-area: s-floor;
  }
}

.house {
  &.chambers--votes {
    grid-area: h-votes;
  }

  &.chambers--floor {
    grid-area: h-floor;
  }
}

.chambers--votes {
  padding-top: 16px;
}

.chambers--floor {
  padding-top: 16px;
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
  margin-top: 80px;
  margin-bottom: 0;
  padding: 16px 32px;
  font-size: 5vw;//56px;
  text-align: center;
  background-color: $blue;
  color: $white;
}

.chambers--text {
  margin: 0;
  padding: 56px 0 80px 0;
  font-size: 72px;
  text-align: center;
  color: $white;
  background-color: $blue;
}

.house-header {
  grid-area: h-head;
}

.house-header--votes {
  grid-area: h-h-votes;

}

.house-header--floor {
  grid-area: h-h-floor;
}

.senate-header {
  grid-area: s-head;
}

.senate-header--votes {
  grid-area: s-h-votes;
}

.senate-header--floor {
  grid-area: s-h-floor;
}

@media (min-width: 979px) {
  .container {
    grid-template-columns: 1fr minmax(420px, 520px) 64px minmax(auto, 600px) 1fr;
    grid-template-rows: 56px 100vh auto auto auto auto auto auto;
    grid-template-areas:
      "navbar  navbar    navbar navbar    navbar "
      "header  header    header header    header "
      "s-head  s-head    s-head s-head    s-head "
      ".       s-h-votes .      s-h-floor .      "
      ".       s-votes   .      s-floor   .      "
      "h-head  h-head    h-head h-head    h-head "
      ".       h-h-votes .      h-h-floor .      "
      ".       h-votes   .      h-floor   .      ";
  }

  .offset-box {
    transform: translateY(-40px);

    span {
      text-align: left;
      display: inline;
    }
  }

  .chambers--votes, .chambers--floor {
    padding-top: 0;
  }
}
</style>
