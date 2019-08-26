<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">Agregar Nuevo Socio</div>
            <div class="card-header-icon">
                <span class="icon">
                    <i class="fas fa-user-plus" aria-hidden="true"></i>
                </span>
            </div>
        </div>
        <div class="card-content">
            <b-field label="CUIT">
                <b-input maxlength="11" v-model="cuit"></b-input>
            </b-field>

            <b-field label="Nombre" style="margin-top:-2em;">
                <b-input maxlength="120" v-model="nombre"></b-input>
            </b-field>

            <b-field label="Observaciones" style="margin-top:-1em;">
                <b-input type="textarea" rows="8" maxlength="300" ></b-input>
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
            id:null, nombre:'',cuit:''
        }
    },
    methods:{
        guardar(){
            //alert(JSON.stringify([this.id,this.nombre,this.cuit]))
            console.clear()
            console.log(this.$parent.$parent.details.socios)
            this.$parent.$parent.loadEjercicio()
            this.$parent.$parent.loadCoop()
            this.$emit('close')
        }
    }
}
</script>

