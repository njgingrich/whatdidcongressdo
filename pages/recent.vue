<template>
  <section class="page">
    <header class="recent-header">
      <h2 class="title-text">Recent Activity</h2>
    </header>
    <div id="senate" class="senate session">
      <div class="title-box title-text">The last Senate session was {{senateDateFormatted}}</div>
    </div>

    <VoteDisplay class="senate-votes"
                  message="No votes today."
                  :votes="senateVotes"/>
    <FloorActionDisplay class="senate-floor"
                        message="No floor actions today."
                        :actions="senateActions"/>

    <div id="house" class="house session">
      <div class="title-box title-text">The last House session was {{houseDateFormatted}}</div>
    </div>

    <VoteDisplay class="house-votes"
                  message="No votes today."
                  :votes="houseVotes"/>
    <FloorActionDisplay class="house-floor"
                        message="No floor actions today."
                        :actions="houseActions"/>
  </section>
</template>
<script>
import moment from 'moment'
import FloorActionDisplay from '~/components/FloorActionDisplay'
import VoteDisplay from '~/components/VoteDisplay'

export default {
  components: {
    FloorActionDisplay,
    VoteDisplay
  },
  data () {
    return {
      houseVotes: this.$store.state.house.recent.votes,
      houseActions: this.$store.state.house.recent.floor_actions,
      houseDate: this.$store.state.house.recent.date,
      senateActions: this.$store.state.senate.recent.floor_actions,
      senateVotes: this.$store.state.senate.recent.votes,
      senateDate: this.$store.state.senate.recent.date
    }
  },
  async fetch ({store, params}) {
    await store.dispatch('getRecentVotes')
    await store.dispatch('getRecentFloorActions')
    await store.dispatch('setNavLinks', {
      links: [
        {
          link: 'recent#senate',
          name: 'Senate'
        },
        {
          link: 'recent#house',
          name: 'House'
        }
      ]
    })
  },
  computed: {
    houseDateFormatted () {
      return moment(this.houseDate).local().format('dddd, MMMM Do')
    },
    senateDateFormatted () {
      return moment(this.senateDate).local().format('dddd, MMMM Do')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.page {
  overflow: hidden;
  display: grid;

  grid-template-columns: 1fr 90vw 1fr;
  grid-template-rows: repeat(7, auto);
  grid-template-areas:
    "header header  header"
    "senate senate  senate"
    ".      s-votes .     "
    ".      s-floor .     "
    "house  house   house "
    ".      h-votes .     "
    ".      h-floor .     ";
  overflow: hidden;
}

.title-box {
  background-color: $beige-dark;
  color: $white;
  padding: 16px;
  font-size: 20px;
}

.session {
  background-color: $blue;
  padding-top: 56px;
}

.recent-header {
  grid-area: header;
  background-color: $blue;
  color: $white;

  h2 {
    text-align: center;
    font-size: 48px;
  }
}

.senate {
  grid-area: senate;
}

.house {
  grid-area: house;
}

.senate-votes {
  grid-area: s-votes;
  margin-top: 32px;
}

.senate-floor {
  grid-area: s-floor;
  margin-top: 32px;
}

.house-votes {
  grid-area: h-votes;
  margin-top: 32px;
}

.house-floor {
  grid-area: h-floor;
  margin-top: 32px;
}

@media screen and (min-width: 979px) {
  .page {
    grid-template-columns: 1fr minmax(420px, 520px) 64px minmax(auto, 600px) 1fr;
    grid-template-rows: 160px 100px auto 100px auto;
    grid-template-areas:
      "header header  header header  header"
      "senate senate  senate senate  senate"
      ".      s-votes .      s-floor .     "
      "house  house   house  house   house "
      ".      h-votes .      h-floor .     ";
  }

  .title-box {
    width: fit-content;
    background-color: $beige-dark;
    color: $white;
    padding: 16px;
    font-size: 20px;
    transform: translateX(16px);
  }
}
</style>
