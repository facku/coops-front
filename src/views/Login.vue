<template>
<section class="hero is-info is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-white">Cooperativas Chubut</h3>
                    <p class="subtitle has-text-white">Secretaría de Trabajo</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../assets/logo.png">
                        </figure>
                        <form @submit.prevent="login">
                            <b-field :type="loginReturn">
                              <b-input v-model="model.user" size="is-large" autofocus icon="account" placeholder="Usuario" :readonly="loading"></b-input>
                            </b-field>
                            <b-field :type="loginReturn">
                              <b-input v-model="model.password" size="is-large" icon="lock" password-reveal type="password" placeholder="Clave" :readonly="loading"></b-input>
                            </b-field>
                            <hr>
                            <button :disabled="user==''||password==''" class="button is-block is-info is-large is-fullwidth" :class="{'is-loading':loading}">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:"login",
    data(){
        return {
          loading:false,
          loginReturn:'is-info',
          model:{
              user:'',
              password:''
          }
        }
    },
    methods:{
        login(){
            this.loading = true
            this.$http({
                url:'/auth',
                method:'post',
                data:this.model
            })
            .then(resp => {
                this.loading = false
                this.$store.dispatch('user/login', resp.data)
                this.$http.defaults.headers.common = {'Authorization': `Bearer ${resp.data.token}`}
                this.$router.push('/')
            })
            .catch(err => {
                this.loginReturn = 'is-danger'
                this.loading = false
                this.$toast.open({
                    message:'No se pudo iniciar sesión:<br><b>Usuario</b> o <b>Clave</b> incorrectos!',
                    type:'is-danger'
                })
            })
        }
    },
    beforeMount(){
        if( this.$store.state.user.token!=null ){
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
body{
    padding: 0;
    margin: 0;
}
</style>
