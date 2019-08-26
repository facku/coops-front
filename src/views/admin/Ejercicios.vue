<template>
    <section class="section">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a>Admin</a></li>
                <li class="is-active"><a href="#" aria-current="page">Ejercicios</a></li>
            </ul>
        </nav>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <b-tooltip type="is-dark" label="Generar un nuevo Ejercicio">
                        <b-button type="is-success" icon-pack="fa" icon-left="magic" @click="goToNew()">Generar Nuevo</b-button>
                    </b-tooltip>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            ejercicios:[]
        }
    },
    methods:{
        goToNew(){
            this.$router.push('/admin/ejercicio/nuevo')
        }
    }
}
</script>

