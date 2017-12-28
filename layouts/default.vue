<template>
  <div class="container">
    <Navbar/>
    <nuxt/>
    <Foot/>
  </div>
</template>
<script>
import Foot from '~/components/Foot'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Foot,
    Navbar
  }
}
</script>

<style lang="scss">
@import "~assets/styles/colors";

html {
  font-family: "Merriweather", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: $offwhite;
}

body {
  margin: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

a.link-item, a.link-item:visited, a.link-item:active {
  color: $white;
  text-decoration: none;
}

.title-text {
  font-family: 'EB Garamond';
  font-weight: bold;
  text-transform: uppercase;
}

.container {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 56px auto minmax(120px, auto);
  grid-template-areas:
    "navbar"
    "page"
    "footer";
}

.top-navbar {
  grid-area: navbar;
}

.footer {
  grid-area: footer;
}

.page {
  grid-area: page;
}

// Global styles
.action-link {
  color: $blue;
  padding: 1px;
  text-decoration: underline;

  &:hover {
    background-color: $beige-light;
    text-decoration: none;
  }
}

a {
  text-decoration-skip: ink;
}
</style>
