<template>
  <section class="page">
    <header class="header">
      <h1 class="header--text title-text">What Did Congress Do Today?</h1>
    </header>

    <template v-if="senateInSession">
      <h2 id="senate" class="chambers--text title-text senate-header">Senate</h2>
      <div class="offset-box title-text senate-header--votes">
        <span>Votes</span>
      </div>
      <div class="offset-box title-text senate-header--floor">
        <span>Floor Actions</span>
      </div>

      <VoteDisplay class="senate"
                  message="No votes today."
                  :votes="senateVotes"/>
      <FloorActionDisplay class="senate"
                          message="No floor actions today."
                          :actions="senateActions"/>
    </template>
    <template v-else>
      <div class="senate-header no-session">
        <p class="title-text">The Senate isn't in session today.</p>
        <a href="recent#senate" class="recent-link">Check out what they did on their last day in session.</a>
      </div>
    </template>

    <template v-if="houseInSession">
      <h2 id="house" class="chambers--text title-text house-header">House</h2>
      <div class="offset-box title-text house-header--votes">
        <span>Votes</span>
      </div>
      <div class="offset-box title-text house-header--floor">
        <span>Floor Actions</span>
      </div>

      <VoteDisplay class="house"
                  message="No votes today."
                  :votes="houseVotes"/>
      <FloorActionDisplay class="house"
                          message="No floor actions today."
                          :actions="houseActions"/>
    </template>
    <template v-else>
      <div class="house-header no-session">
        <p class="title-text">The House isn't in session today.</p>
        <a href="recent#house" class="recent-link">Check out what they did on their last day in session.</a>
      </div>
    </template>

  </section>
</template>

<script>
import FloorActionDisplay from '~/components/FloorActionDisplay'
import VoteDisplay from '~/components/VoteDisplay'

export default {
  components: {
    FloorActionDisplay,
    VoteDisplay
  },
  data () {
    return {
      senateVotes: this.$store.state.senate.today.votes,
      senateActions: this.$store.state.senate.today.floor_actions,
      senateInSession: this.$store.state.senate.isInSession,
      houseVotes: this.$store.state.house.today.votes,
      houseActions: this.$store.state.house.today.floor_actions,
      houseInSession: this.$store.state.house.isInSession
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getTodaysVotes')
    await store.dispatch('getTodaysFloorActions')
    await store.dispatch('getCongressSession')
  }
}
</script>

<style lang="scss">
@import "~assets/styles/colors";

.page {
  display: grid;
  grid-template-columns: 1fr 90vw 1fr;
  grid-template-rows: 100vh repeat(10, auto);
  grid-template-areas:
    "header    header    header"
    "s-head    s-head    s-head"
    "s-h-votes s-h-votes s-h-votes"
    ".         s-votes   .        "
    "s-h-floor s-h-floor s-h-floor"
    ".         s-floor   .        "
    "h-head    h-head    h-head   "
    "h-h-votes h-h-votes h-h-votes"
    ".         h-votes   .        "
    "h-h-floor h-h-floor h-h-floor"
    ".         h-floor   .        ";
  overflow: hidden;
}

.offset-box {
  span {
    display: block;
    padding: 8px 16px;
    background-color: $beige-dark;
    color: $white;
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

.no-session {
  min-height: 240px;
  padding: 16px;
  background-color: $blue;
  color: $white;

  .title-text {
    font-size: 48px;
    text-align: center;
    text-transform: initial;
  }
}

.recent-link {
  color: $white;
  padding: 2px 3px;
  font-size: 24px;

  &:hover {
    background-color: $beige-light;
    color: $blue;
    text-decoration: none;
  }
}

@media (min-width: 979px) {
  .page {
    grid-template-columns: 1fr minmax(420px, 520px) 64px minmax(auto, 600px) 1fr;
    grid-template-rows: 100vh auto auto auto auto auto auto;
    grid-template-areas:
      "header  header    header header    header"
      "s-head  s-head    s-head s-head    s-head"
      ".       s-h-votes .      s-h-floor .     "
      ".       s-votes   .      s-floor   .     "
      "h-head  h-head    h-head h-head    h-head"
      ".       h-h-votes .      h-h-floor .     "
      ".       h-votes   .      h-floor   .     ";
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

.footer {
  grid-area: footer;
}
</style>
