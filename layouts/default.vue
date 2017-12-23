<template>
  <div>
    <nav class="top-navbar">
      <nuxt-link to="/" class="link-item">Home</nuxt-link>
    </nav>

    <nuxt/>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="scss">
@import "~assets/styles/colors";

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

.top-navbar {
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;

  height: 56px;
  background-color: $blue;
}

.link-item {
  font-family: 'EB Garamond';
  font-size: 24px;
  text-transform: uppercase;
}

a.link-item, a.link-item:visited, a.link-item:active {
  color: $white;
  text-decoration: none;

  &:hover {
    color: $white;
  }
}
</style>
