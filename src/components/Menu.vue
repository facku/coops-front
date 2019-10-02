<template>
<nav class="navbar is-info" role="navigation"
  aria-label="main navigation"
  v-if="$store.state.user.token">
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src="../assets/escudo.png" style="min-height:50px;">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">
        <i class="fas fa-people-carry"></i>&nbsp;Cooperativas
      </router-link>

      
    </div>
  </div>

    <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="$store.state.user.role==3">
          <a class="navbar-link">
              <i class="fas fa-tools"></i>&nbsp;Adminstración
          </a>

          <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/admin/users">
                <i class="fa fa-users-cog"></i><span>&nbsp;ABM Usuarios</span>
              </router-link>
              <hr class="navbar-divider">
              <router-link class="navbar-item" to="/admin/ejercicio/nuevo">
                <i class="fa fa-chart-line"></i><span>&nbsp;Nuevo Ejercicio</span>
              </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
              <i class="fa fa-user-circle"></i>&nbsp;{{$store.state.user.alias}}
          </a>

          <div class="navbar-dropdown">
              <a class="navbar-item" @click="logOut">
              <i class="fa fa-sign-out"></i> Salir
              </a>
          </div>
        </div>
  </div>
</nav>
</template>
<script>
export default {
    name:"appMenu",
    methods:{
        logOut(){
            this.$store.dispatch('user/logout')
            this.$router.push('/login')
        }
    }
}
</script>

