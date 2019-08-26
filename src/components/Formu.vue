<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">Modificar Socio</div>
            <div class="card-header-icon">
                <span class="icon">
                    <i class="fas fa-user-cog" aria-hidden="true"></i>
                </span>
            </div>
        </div>
        <div class="card-content">
            <div class="columns">
                <div class="column is-3">
                    <b-field label="ID">
                        <b-input :value="id" readonly></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="CUIT">
                        <b-input maxlength="11" v-model="cuit"></b-input>
                    </b-field>
                </div>
            </div>
            <b-field label="Nombre Completo" style="margin-top:-2em;">
                <b-input maxlength="120" v-model="nombre"></b-input>
            </b-field>
            
            <b-field label="Observaciones" style="margin-top:-1em;">
                <b-input type="textarea" rows="8" maxlength="300" v-model="observaciones"></b-input>
            </b-field>
        </div>
        <div class="card-footer">
             <a class="card-footer-item" @click="guardar">Guardar</a>
        </div>
    </div>
</template>
<script>
export default {
    name:'formu',
    data(){
        return {
            id:null, nombre:'',cuit:'', observaciones:''
        }
    },
    props:['id', 'nombre', 'cuit','observaciones'],
    methods:{
        guardar(){
            this.$http({
                method:'put',
                url:'/socios/'+this.id,
                data:{
                    nombre:this.nombre,
                    cuit: this.cuit,
                    observaciones: this.observaciones
                }
            }).then(r => {
                this.$emit('socioUdated')
            })

            this.$emit('close')
        }
    }
}
</script>

