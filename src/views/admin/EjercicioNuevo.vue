<template>
    <section class="section">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a>Admin</a></li>
                <li><a>Ejercicios</a></li>
                <li class="is-active"><a href="#" aria-current="page">Generar Nuevo</a></li>
            </ul>
        </nav>
        <div class="box">
            <div class="level">
                <div class="level-item">
                    <span class="subtitle">
                        Cooperativas:
                        <span class="tag is-medium" :class="{'is-success':checkedRows.length, 'is-warning':!checkedRows.length}">
                            {{ checkedRows.length }}
                        </span>
                    </span>
                </div>
                <div class="level-item">
                    <span class="subtitle">Periodo:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <b-select v-model="periodo" placeholder="Mes" icon="calendar">
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Oktubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </b-select>
                    <b-select placeholder="Año" icon="calendar" value="2019" disabled>
                        <option value="2019">2019</option>
                    </b-select>
                </div>
                <div class="level-item">
                    <b-button
                        :disabled="checkedRows.length<1"
                        @click="generar"
                        type="is-success"
                        icon-pack="fa"
                        icon-left="magic"
                        icon-right="chevron-right">
                        Generar Ejercicio
                    </b-button>
                </div>
            </div>
        </div>

        <b-table
            narrowed
            striped
            :data="coops"
            :columns="columnas"
            :checked-rows.sync="checkedRows"
            checkable
            checkbox-position="left">
        </b-table>
    </section>
</template>
<script>
export default {
    data(){
        return {
            periodo:(new Date()).getUTCMonth()+1,
            columnas:[
                { field:'id', label:'ID', numeric:true, width:120, sortable:true, centered:true },
                { field:'nombre', label:'Cooperativa', sortable:true},
                { field:'expte', label:'Expte', numeric:true, width:220, sortable:true, centered:true },
                { field:'localidad', label:'Localidad', sortable:true, width:200, centered:true}
            ],
            coops:[],
            checkedRows:[]
        }
    },
    methods:{
        generar(){
            let ids = this.checkedRows.map(x => x.id)
            this.$dialog.confirm({
                type:'is-danger',
                hasIcon:true,
                title:'Generar Nuevo Ejercicio?',
                message:'Realmente desea generar un <b>nuevo ejercicio</b>?<br>El ejercicio actual sera cerrado y archivado.',
                confirmText:'Generar',
                cancelText:'Cancelar',
                onConfirm: () => {
                    const loadingComponent = this.$modal.open({
                        parent:this,
                        canCancel:[],
                        content:`<div class="card">
                                    <div class="card-content has-text-centered">
                                        <p class="title">Procesando... espere.</p><br>
                                        <p>
                                            <i class="fa-3x fa fa-spinner fa-spin"></i>
                                        </p>
                                    </div>
                                </div>`,
                        width:400
                    })

                    this.$http({
                        method:'post',
                        url:'/ejercicios',
                        data:{
                            cooperativas:ids,
                            periodo:this.periodo
                        }
                    }).then(resp => {
                        loadingComponent.close()
                        this.$toast.open({
                            message:'<i class="fa fa-cal"></i>&nbsp;Nuevo ejercicio generado con exito!',
                            type:'is-success',
                            position:'is-bottom'
                        })
                    })
                }
            })
        }
    },
    mounted(){
        this.$http.get('/coops').then(resp => this.coops = resp.data)
    }
}
</script>

