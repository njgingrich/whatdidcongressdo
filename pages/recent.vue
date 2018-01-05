<template>
  <section class="page">
    <header class="recent-header">
      <h2 class="title-text">Recent Activity</h2>
    </header>
    <div id="senate" class="senate session">
      <div class="title-box title-text">{{senateDateFormatted}}</div>
    </div>
    <div class="background senate"></div>

    <VoteDisplay class="senate-votes"
                  message="No votes today."
                  :votes="senateVotes"/>
    <FloorActionDisplay class="senate-floor"
                        message="No floor actions today."
                        :actions="senateActions"/>

    <div id="house" class="house session">
      <div class="title-box title-text">{{houseDateFormatted}}</div>
    </div>

    <div class="background house"></div>
    <VoteDisplay class="house-votes"
                  message="No votes."
                  :votes="houseVotes"/>
    <FloorActionDisplay class="house-floor"
                        message="No floor actions."
                        :actions="houseActions"/>
  </section>
</template>
<script>
import moment from 'moment-timezone'
import FloorActionDisplay from '~/components/FloorActionDisplay'
import VoteDisplay from '~/components/VoteDisplay'

export default {
  components: {
    FloorActionDisplay,
    VoteDisplay
  },
  data () {
    return {
      houseInSession: this.$store.state.house.isInSession,
      houseVotes: this.$store.state.house.recent.votes,
      houseActions: this.$store.state.house.recent.floor_actions,
      houseDate: this.$store.state.house.recent.date,
      senateInSession: this.$store.state.senate.isInSession,
      senateActions: this.$store.state.senate.recent.floor_actions,
      senateVotes: this.$store.state.senate.recent.votes,
      senateDate: this.$store.state.senate.recent.date
    }
  },
  async fetch ({store, params}) {
    await store.dispatch('getRecentVotes')
    await store.dispatch('getRecentFloorActions')
    await store.dispatch('getCongressSession')
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
      if (this.houseInSession) {
        return `The House was in session today.`
      }
      return `The last House session was ${moment(this.houseDate).tz('America/New_York').format('dddd, MMMM Do')}`
    },
    senateDateFormatted () {
      if (this.senateInSession) {
        return `The Senate was in session today.`
      }
      return `The last Senate session was ${moment(this.senateDate).tz('America/New_York').format('dddd, MMMM Do')}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";
@import "~assets/styles/mixins";

.page {
  overflow: hidden;
  display: grid;
  @include svg-bg;

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

.background {
  grid-column: 1 / -1;
  background-color: $white;
  width: 100%;
  height: 100%;

  &.senate {
    grid-row: 3 / 5;
  }

  &.house {
    grid-row: 6 / -1;
  }
}

.title-box {
  background-color: $beige-dark;
  color: $white;
  padding: 16px;
  font-size: 20px;
}

.session {
  padding-top: 56px;
}

.recent-header {
  grid-area: header;
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

  .background {
    &.senate {
      grid-row: 3 / 4;
    }

    &.house {
      grid-row: 5 / -1;
    }
  }
}
</style>
