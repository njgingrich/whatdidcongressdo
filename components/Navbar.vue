<template>
  <nav class="top-navbar">
    <a href="#top" class="link-item title-text">Home</a>
    <a href="#senate" class="link-item title-text">Senate</a>
    <a href="#house" class="link-item title-text">House</a>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.top-navbar {
  grid-area: navbar;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 56px;
  padding-left: 32px;
  padding-right: 32px;

  background-color: $blue;
}

.link-item {
  font-size: 20px;
  padding: 8px 16px;

  &:first-child {
    margin-right: auto;
  }

  &:hover {
    background-color: $beige-light;
    color: $blue;
  }
}
</style>
