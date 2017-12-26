<template>
  <footer class="footer">
    <p>Copyright 2017 <a href="https://twitter.com/njgingrich" target="_blank" rel="noopener">@njgingrich</a></p>
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
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;

  background-color: $blue;
  color: $white;
  font-weight: bold;
  font-size: 14px;
  font-family: 'EB Garamond';

  p {
    margin-bottom: 0;
  }

  p a, p a:visited, p a:active {
    color: $twitter-color;
    text-decoration: none;
    padding: 1px 4px 3px 4px;

    &:hover {
      color: $white;
      background-color: $twitter-color;
    }
  }
}

@media screen and (min-width: 979px) {
  .footer {
    padding-bottom: 32px;
    font-size: 20px;
  }
}
</style>
