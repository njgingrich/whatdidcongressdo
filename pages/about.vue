<template>
  <section class="page">
    <section class="content">
      <h1 class="content-title title-text">About the Site</h1>
      <p class="content-info">
        What exactly goes on in a typical day at the Senate or the House of Representatives? I had no idea, but I wanted to find out.
        Staying informed about the political process is part of being a good citizen, but it can be hard to trawl through the Senate
        or House official websites to get the important information. This site was built to pull that information and display it in an
        easy-to-read format that provides the stuff people may actually care about.
      </p>
      <section class="share title-text">
        <p class="share--note">If you found this interesting, you can share it on Facebook or Twitter below:</p>
        <div @click="fbPopup" class="share--item facebook">
          <svgicon name="facebook"/>
        </div>
        <div @click="twitterPopup" class="share--item twitter">
          <svgicon name="twitter"/>
        </div>
      </section>
      <div class="content-sub-info">
        <p>
          This site runs off of the <a href="https://projects.propublica.org/api-docs/congress-api/" target="_blank" rel="noopener">ProPublica Congress API</a>, and is updated approximately every hour.
        </p>
        <p>
          Main image credited to <a href="https://www.aoc.gov" target="_blank" rel="noopener">Architect of the Capitol</a>.
        </p>
        <p>
          The source code for the site is available on GitHub <a href="https://www.github.com/njgingrich/whatdidcongressdo" target="_blank" rel="noopener">here.</a>
        </p>
      </div>
    </section>
  </section>
</template>
<script>
import '~/assets/icons/facebook'
import '~/assets/icons/twitter'

export default {
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

.page {
  background-image: url("~assets/images/congress.jpg");
  background-position-x: 50%;
  background-size: cover;
  height: auto;
}

.content {
  grid-area: content;
  align-self: start;
  margin: 16px 8px;
  padding: 32px;
  background-color: $blue;
  color: $white;

  font-family: 'Merriweather';
}

.content-title {
  font-size: 32px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 16px;
}

.content-info {
  font-size: 16px;
}

.content-sub-info {
  padding-top: 32px;
  font-size: 12px;

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

a, a:visited, a:active {
  color: $white;
  padding: 2px;

  &:hover {
    color: $blue;
    text-decoration: none;
    background-color: $beige-light;
  }
}

.share {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 48px;
  grid-template-areas:
    "note note"
    "fb   twitter";

  padding-top: 16px;

  .share--item.facebook {
    grid-area: fb;
    justify-self: flex-end;
  }

  .share--item.twitter {
    grid-area: twitter;
    justify-self: flex-start;
  }

  .share--note {
    grid-area: note;
    justify-self: center;
    margin: 0;
    padding: 0 0 16px 0;
    font-size: 18px;
    text-transform: initial;
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

@media screen and (min-width: 979px) {
  .page {
    height: calc(100vh - 56px - 120px);
  }

  .content {
    margin: 64px;
  }

  .content-title {
    font-size: 48px;
  }

  .content-sub-info {
    font-size: 14px;
  }

  .share {
    padding-top: 48px;

    .share--note {
      padding: 8px;
      font-size: 24px;
    }
  }
}
</style>
