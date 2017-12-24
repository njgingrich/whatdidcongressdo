<template>
  <section class="container">
    <Navbar/>
    <section class="content">
      <h1 class="content-title title-text">About the Site</h1>
      <p class="content-info">
        I developed this site because I wanted an easy way to see what exactly Congress is doing every day, and to make it easy for others to see the process that goes on in the Senate and the House.
      </p>
      <div class="content-sub-info">
        <p>
          This site runs off of the <a href="https://projects.propublica.org/api-docs/congress-api/" target="_blank" rel="noopener">ProPublica Congress API</a>, and is updated approximately every hour.
        </p>
        <p>
          Main image credited to <a href="https://www.aoc.gov" target="_blank" rel="noopener">Architect of the Capitol</a>.
        </p>
      </div>
      <section class="share">
        <div @click="fbPopup" class="share--item facebook">
          <svgicon name="facebook"/>
        </div>
        <div @click="twitterPopup" class="share--item twitter">
          <svgicon name="twitter"/>
        </div>
      </section>
    </section>
  </section>
</template>
<script>
import Navbar from '~/components/Navbar'
import '~/assets/icons/facebook'
import '~/assets/icons/twitter'

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
  font-size: 48px;
  text-align: center;
  margin-top: 0;
}

.content-info {
  font-size: 16px;
}

.content-sub-info {
  padding-top: 16px;
  font-size: 14px;

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

a, a:visited, a:active {
  color: $white;
}

.share {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 32px;

  .share--item.facebook {
    margin-right: 16px;
  }

  .share--item.twitter {
    margin-left: 16px;
  }
}

.share--item {
  background-color: $white;
  width: 48px;
  height: 48px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
  cursor: pointer;

  &.facebook {
    fill: $fb-color;
  }

  &.twitter {
    fill: $twitter-color;
  }

  &:hover {
    width: 50px;
    height: 50px;
  margin-bottom: 0px;
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
</style>
