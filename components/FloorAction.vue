<template>
  <section class="floor-action">
    <div class="timestamp">
      <span>{{time}}</span>
    </div>
    <div class="action">
      <span>{{action.description}}</span>
    </div>
  </section>
</template>
<script>
import moment from 'moment'

export default {
  name: 'FloorAction',
  props: {
    action: Object
  },
  computed: {
    time () {
      let d = new Date(this.action.timestamp)
      return moment(d.getTime()).format('h:mm:ss a')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.timestamp {
  grid-area: time;
  color: $black;
  font-weight: bold;
}

.action {
  grid-area: action;
}

.floor-action {
  display: grid;
  grid-template-columns: 120px auto;
  grid-template-rows: auto;
  grid-template-areas: "time action";
  margin-bottom: 16px;
  margin-left: -24px;
  padding: 12px 8px;

  background-color: $white;
  color: $blue;
  border-left: 24px solid $blue;
  font-family: 'Merriweather';

  box-shadow: 0 4px 8px -3px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px -3px rgba(0, 0, 0, 0.8);
    transform: translateY(-1px) translateX(-4px);
    border-left: 28px solid $blue;
  }
}
</style>
