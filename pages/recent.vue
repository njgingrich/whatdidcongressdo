<template>
  <section class="page">
    <header class="recent-header">
      <h2 class="title-text">Recent Activity</h2>
    </header>
    <div class="senate session">
      <span class="title-box title-text">The last Senate session was {{senateDateFormatted}}</span>
    </div>
    <div class="senate-votes">

    </div>
    <div class="senate-floor">

    </div>
    <div class="house session">
      <span class="title-box title-text">The last House session was {{houseDateFormatted}}</span>
    </div>
    <div class="house-votes">

    </div>
    <div class="house-floor">

    </div>
  </section>
</template>
<script>
import moment from 'moment'

export default {
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
  },
  computed: {
    houseDateFormatted () {
      return moment(this.houseDate).format('dddd, MMMM Do')
    },
    senateDateFormatted () {
      return moment(this.senateDate).format('dddd, MMMM Do')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.page {
  overflow: hidden;
  display: grid;
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
  background-color: $beige-light;
  padding: 16px;
}

.session {
  transform: translateX(32px);
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
}

.senate-floor {
  grid-area: s-floor;
}

.house-votes {
  grid-area: h-votes;
}

.house-floor {
  grid-area: h-floor;
}
</style>
