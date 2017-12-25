<template>
  <div class="chambers--floor">
    <template v-if="anyActions">
      <FloorAction v-for="action in actions" :key="action.timestamp" :action="action"/>
    </template>
    <template v-else>
      <div class="message">{{message}}</div>
    </template>
  </div>
</template>
<script>
import FloorAction from '~/components/FloorAction'

export default {
  name: 'FloorActionDisplay',
  components: {
    FloorAction
  },
  props: {
    message: String,
    actions: Array
  },
  computed: {
    anyActions () {
      return this.actions.length > 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/colors";

.message {
  text-align: center;
  font-family: 'Merriweather';
  font-size: 24px;
  color: $blue;
  padding: 16px 32px 32px 32px;
}

.chambers--floor {
  padding-top: 16px;
}
</style>
