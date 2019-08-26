<template>
  <div id="app">
    <appMenu></appMenu>
    <router-view/>
  </div>
</template>
<script>
import appMenu from './components/Menu.vue'
export default {
  components:{ appMenu },
  created(){
    if(this.$store.state.user.token!=null){
      this.$http.defaults.headers.common = {'Authorization': `Bearer ${this.$store.state.user.token}`}
    }
  }
}
</script>
