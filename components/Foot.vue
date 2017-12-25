<template>
  <footer class="footer">
    <p>Copyright 2017 Nathan Gingrich  - <a href="https://twitter.com/njgingrich" target="_blank" rel="noopener">@njgingrich</a></p>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;

  background-color: $blue;
  color: $white;
  font-weight: bold;

  p a, p a:visited, p a:active {
    color: $twitter-color;
    text-decoration: none;
    padding: 3px 4px;

    &:hover {
      color: $white;
      background-color: $twitter-color;
    }
  }
}
</style>
