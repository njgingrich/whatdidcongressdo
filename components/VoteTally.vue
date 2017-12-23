<template>
  <div class="votes-tally">
    <h4 class="vote-type">{{type}}</h4>
    <div class="vote gop">
      <div class="vote square"></div>
      <div class="vote tally">{{republican}}</div>
    </div>
    <div class="vote dem">
      <div class="vote square"></div>
      <div class="vote tally">{{democratic}}</div>
    </div>
    <div class="vote independent">
      <div class="vote square"></div>
      <div class="vote tally">{{independent}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    democratic: Number,
    republican: Number,
    independent: Number
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.vote {
  display: flex;
  padding: 2px 4px;

  &.square {
    width: 24px;
    height: 24px;
    border: 2px solid $white;
  }


  &.gop {
    .square {
      background-color: $red;
    }
  }

  &.dem {
    .square {
      background-color: $blue-light;
    }
  }
}

.vote-type {
  margin: 0;
  font-family: 'EB Garamond';
  font-size: 24px;
  text-decoration: underline;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

.votes-tally {
  display: flex;
  flex-direction: column;
  width: 33%;
}
</style>
