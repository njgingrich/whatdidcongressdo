<template>
  <section class="container">
    <Navbar/>
    <section class="content">
      <h1 class="content-title">About the Site</h1>
      <p class="content-info">
        I developed this site because I wanted an easy way to see what exactly Congress is doing every day, and to make it easy for others to see the process that goes on in the Senate and the House.
      </p>
      <p class="content-sub-info">
        This site runs off of the <a href="https://projects.propublica.org/api-docs/congress-api/" target="_blank" rel="noopener">ProPublica Congress API</a>, and is updated approximately every hour.
      </p>
      <section class="share">
        <a href="#top" @click="fbPopup">Facebook</a>
        <a href="#top" @click="twitterPopup">Tweet</a>
      </section>
    </section>
  </section>
</template>
<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
  methods: {
    fbPopup () {
      // eslint-disable-next-line
      FB.ui({
        method: 'feed',
        display: 'popup',
        link: 'http://whatdidcongressdo.today',
        caption: 'An example caption'
      }, function (response) {})
    },
    twitterPopup () {
      window.open('https://twitter.com/intent/tweet?text=Find%20out%20what%20Congress%20is%20doing%20today.&url=http://whatdidcongressdo.today', '', 'width=640,height=420')
    }
  },
  mounted () {
    this.$initFBSDK()
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.container {
  display: grid;
  grid-template-columns: auto minmax(auto, 1000px) auto;
  grid-template-rows: 56px auto;
  grid-template-areas:
  ". navbar  ."
  ". content .";

  background-image: url("~assets/images/congress.jpg");
  background-position-x: 50%;
  background-size: cover;
  height: 100vh;
}

.content {
  grid-area: content;
  align-self: start;
  margin: 64px;
  padding: 32px;
  background-color: $blue;
  color: $white;

  font-family: 'Merriweather';
}

.content-title {
  font-size: 32px;
  margin-top: 0;
}

.content-info {
  font-size: 16px;
}

.content-sub-info {
  font-size: 14px;
}

a, a:visited, a:active {
  color: $white;
}
</style>
