<template>
  <div>
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

a.link-item, a.link-item:visited, a.link-item:active {
  color: $white;
  text-decoration: none;
}

.title-text {
  font-family: 'EB Garamond';
  font-weight: bold;
  text-transform: uppercase;
}
</style>
