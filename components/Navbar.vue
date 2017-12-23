<template>
  <nav class="top-navbar">
    <a href="#top" class="link-item title-text">Home</a>
    <slot></slot>
    <a href="about" class="link-item title-text">About</a>
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
  padding-left: 8px;
  padding-right: 8px;

  background-color: $blue;
}

@media (min-width: 979px) {
  .top-navbar {
    padding-left: 32px;
    padding-right: 32px;
  }
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
