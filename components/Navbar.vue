<template>
  <nav class="top-navbar">
    <div class="nav-left">
      <a href="#top" class="link-item title-text">Home</a>
    </div>

    <div class="nav-center">
      <a v-for="link in navLinks" :key="link.name" :href="link.link" class="link-item title-text">{{link.name}}</a>
    </div>

    <div class="nav-right">
      <a href="about" class="link-item title-text">About</a>
      <div @click="fbPopup" class="share--item facebook">
        <svgicon name="facebook"/>
      </div>
      <div @click="twitterPopup" class="share--item twitter">
        <svgicon name="twitter"/>
      </div>
    </div>
  </nav>
</template>
<script>
import '~/assets/icons/facebook'
import '~/assets/icons/twitter'

export default {
  name: 'Navbar',
  data () {
    return {
      navLinks: this.$store.state.navLinks
    }
  },
  methods: {
    fbPopup () {
      // eslint-disable-next-line
      FB.ui({
        method: 'feed',
        display: 'popup',
        link: 'http://whatdidcongressdo.today',
        caption: 'Find out what Congress did today.'
      }, function (response) {})
    },
    twitterPopup () {
      window.open('https://twitter.com/intent/tweet?text=Find%20out%20what%20Congress%20is%20doing%20today.&url=http://whatdidcongressdo.today', '', 'width=640,height=420')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.top-navbar {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto;
  grid-template-areas: "left center right";
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 56px;
  padding-left: 8px;
  padding-right: 8px;

  background-color: $blue;
}

.nav-left {
  display: flex;
  grid-area: left;
}

.nav-center {
  display: flex;
  grid-area: center;
  justify-content: center;
}

.nav-right {
  display: flex;
  grid-area: right;
  justify-content: flex-end;
}

.link-item {
  font-size: 14px;
  padding: 8px 8px;

  &:hover {
    background-color: $beige-light;
    color: $blue;
  }
}

.share--item {
  background-color: $white;
  width: 24px;
  height: 24px;
  margin: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &.facebook {
    fill: $fb-color;
  }

  &.twitter {
    fill: $twitter-color;
  }
}

.share--item.facebook:hover {
  background-color: $fb-color;
  fill: $white;
}

.share--item.twitter:hover {
  background-color: $twitter-color;
  fill: $white;
}

@media screen and (min-width: 400px) {
  .top-navbar {
    grid-template-columns: 1fr 30% 1fr;
  }
}

@media screen and (min-width: 650px) {
  .link-item {
    font-size: 20px;
    padding: 8px 16px;
  }
}

@media screen and (min-width: 979px) {
  .top-navbar {
    padding-left: 32px;
    padding-right: 32px;
  }

  .share--item {
    width: 32px;
    height: 32px;
  }
}
</style>
