<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.el-submenu [class^=fa] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^=fa] {
  vertical-align: baseline;
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
