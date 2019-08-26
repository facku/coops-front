<template>
<div>
  <section class="section">
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a>Cooperativas</a></li>
            <li :class="{'is-active':selected!=null}"><a aria-current="page">Ejercicio</a></li>
            <li :class="{'is-active':selected==null}" v-if="selected!=null"><a aria-current="page">{{this.meses[this.selected.periodo-1]}}</a></li>
        </ul>
    </nav>
    <div class="columns">
      <div class="column" :class="{'is-one-quarter':selected!=null}">
        <b-table
        :data="cooperativas"
        paginated
        pagination-size="is-small"
        :current-page.sync="currentPage" 
        :per-page="10"
        :selected.sync="selected"
        narrowed
        hoverable
        striped
        bordered>
          <template slot-scope="props">
            <b-table-column
              width="120"
              centered
              field="expte"
              label="N° Expte"
              :visible="columnasShow"
              sortable>
              {{ props.row.expte }}
            </b-table-column>
            <b-table-column
              field="nombre"
              label="Cooperativa"
              sortable>
              {{ props.row.nombre }}
            </b-table-column>

            <b-table-column width="80" label="Asist" centered :visible="columnasShow">
              <b-tooltip :label="props.row.planilla_asistencia==1?'Tiene Planilla de Asistencia':'NO Tiene Planilla de Asistencia'" :type="props.row.planilla_asistencia==1?'is-success':'is-danger'">
                <i class="fa" :class="{'fa-check has-text-success':props.row.planilla_asistencia=='1','fa-close has-text-danger':props.row.planilla_asistencia=='0'}"></i>
              </b-tooltip>
            </b-table-column>

            <b-table-column width="80" label="Sintys" centered :visible="columnasShow">
              <b-tooltip :label="props.row.sintys==1?'Tiene SINTYS':'NO Tiene SINTYS'" :type="props.row.sintys==1?'is-success':'is-danger'">
                <i class="fa" :class="{'fa-check has-text-success':props.row.sintys=='1','fa-close has-text-danger':props.row.sintys=='0'}"></i>
              </b-tooltip>
            </b-table-column>

            <b-table-column width="80" label="Reso" centered :visible="columnasShow">
              <b-tooltip :label="props.row.resolucion==1?'Tiene Resolucion':'NO Tiene Resolucion'" :type="props.row.resolucion==1?'is-success':'is-danger'">
                <i class="fa fa-file-word" :class="{'has-text-success':props.row.resolucion=='1','has-text-danger':props.row.resolucion=='0'}"></i>
              </b-tooltip>
            </b-table-column>

            <b-table-column width="80" label="Anexo" centered :visible="columnasShow">
              <b-tooltip :label="props.row.anexo==1?'Tiene Anexo':'NO Tiene Anexo'" :type="props.row.anexo==1?'is-success':'is-danger'">
                <i class="fa fa-file-excel" :class="{'has-text-success':props.row.anexo=='1','has-text-danger':props.row.anexo=='0'}"></i>
              </b-tooltip>
            </b-table-column>

            <b-table-column
              width="220"
              centered
              field="localidad"
              label="Localidad"
              :visible="columnasShow"
              sortable>
              {{ props.row.localidad }}
            </b-table-column>
          </template>
        </b-table>
      </div>

      <div class="column" v-if="selected!=null">
        <div class="message is-info">
          <div class="message-header ">
            <b-button class="delete is-danger" @click="selected=null" aria-label="delete"></b-button>
          </div>
          <div class="message-body">
            <b-tabs v-model="tabActive">
              <b-tab-item label="Cooperativa">
                <div class="columns">
                  <div class="column is-6">
                  <b-field label="Nombre">
                    <b-input v-model="details.nombre"></b-input>
                  </b-field>
                  </div>
                  <div class="column is-2">
                    <b-field label="N° Expte.">
                      <b-input class="has-center" v-model="details.expte"></b-input>
                    </b-field>
                  </div>
                  <div class="column is-4">
                    <b-field label="Localiad">
                      <b-input v-model="details.localidad"></b-input>
                    </b-field>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-6">
                      <div class="level">
                        <div class="level-item pad6">  
                          <b-button @click="downloadReso()" type="is-info is-medium" icon-pack="fa" icon-left="file-word" icon-right="download" outlined>Descargar Resolución</b-button>
                        </div>
                        <div class="level-item pad6">  
                          <b-button @click="downloadAnexo()" type="is-success is-medium" icon-pack="fa" icon-left="file-excel" icon-right="download" outlined>Descargar Anexo</b-button>
                        </div>
                        <div class="level-item pad6">  
                          <b-button @click="downloadSintys()" type="is-medium" icon-pack="fa" icon-left="file-text" icon-right="download" outlined>Listado p/Sintys</b-button>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="box level">
                  <div class="level-item">
                    <b-switch type="is-success" :disabled="loading" size="is-small" false-value="0" true-value="1" @input="switchCoopChange()" v-model="selected.planilla_asistencia">Asistencia</b-switch>
                  </div>
                  <div class="level-item">
                    <b-switch type="is-success" :disabled="loading" size="is-small" false-value="0" true-value="1" @input="switchCoopChange()" v-model="selected.sintys">Sintys</b-switch>
                  </div>
                  <div class="level-item">
                    <b-switch type="is-success" :disabled="loading" size="is-small" false-value="0" true-value="1" @input="switchCoopChange()" v-model="selected.resolucion">Resolución</b-switch>
                  </div>
                  <div class="level-item">
                    <b-switch type="is-success" :disabled="loading" size="is-small" false-value="0" true-value="1" @input="switchCoopChange()" v-model="selected.anexo">Anexo</b-switch>
                  </div>

                </div>
                <b-field label="Observaciones">
                  <b-input type="textarea" rows="4" v-model="details.observacion" size="is-small"></b-input>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Socios">
                <div class="has-text-right">
                  <b-button type="is-success is-small" icon-pack="fa" icon-left="user-plus" @click="addSocioClick()">Nuevo Socio</b-button>
                </div>
                <b-field :label="'Socios ('+details.socios.length+')'">
                  <b-table hoverable narrowed :data="details.socios" :loading="loading">
                    <template slot-scope="props">
                      <b-table-column width="100"  centered field="cuit" label="CUIT" class="stext">{{props.row.cuit}}</b-table-column>

                      <b-table-column width="250" field="nombre" label="Nombre Completo" class="stext">{{props.row.nombre}}</b-table-column>

                      <b-table-column width="40" label="Asist" centered>
                        <b-switch size="is-small" @change.native="changeSwitch(props.index)"
                          v-model="details.socios[props.index].asistencia" 
                          true-value="1" false-value="0" type="is-info"
                        ></b-switch>
                      </b-table-column>

                      <b-table-column width="40" label="Sintys" centered field="sintys">
                        <!--<b-switch size="is-small" @change.native="changeSwitch(props.index)"
                          v-model="details.socios[props.index].sintys" 
                          true-value="1" false-value="0" type="is-success"
                        ></b-switch> -->

                        <b-dropdown v-model="details.socios[props.index].sintys" aria-role="list" @input="changeSwitch(props.index)">
                          <b-button slot="trigger" :type="{'is-small':true,'is-success':details.socios[props.index].sintys=='1', 'is-danger':details.socios[props.index].sintys=='2'}">

                            <template v-if="details.socios[props.index].sintys==0">
                              <b-icon icon=""></b-icon>
                            </template>

                            <template v-if="details.socios[props.index].sintys==1">
                              <b-icon icon="check"></b-icon>
                            </template>

                            <template v-if="details.socios[props.index].sintys==2">
                              <b-icon icon="close"></b-icon>
                            </template>
                          </b-button>

                          <b-dropdown-item :value="0" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left" icon=""></b-icon>
                                <div class="media-content">
                                    <h3>Sin datos</h3>
                                </div>
                            </div>
                          </b-dropdown-item>

                          <b-dropdown-item :value="1" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left" icon="check"></b-icon>
                                <div class="media-content">
                                    <h3>Ok</h3>
                                    <small>Control de Sintys superado</small>
                                </div>
                            </div>
                          </b-dropdown-item>

                          <b-dropdown-item :value="2" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left" icon="close"></b-icon>
                                <div class="media-content">
                                    <h3>Observado</h3>
                                    <small>Control de Sintys NO superado</small>
                                </div>
                            </div>
                          </b-dropdown-item>

                        </b-dropdown>
                      </b-table-column>

                      <b-table-column width="40" label="Afip" centered>
                        <b-switch size="is-small" @change.native="changeSwitch(props.index)"
                          v-model="details.socios[props.index].afip" 
                          true-value="1" false-value="0" type="is-info"
                        ></b-switch>
                      </b-table-column>

                      <b-table-column width="40" label="Anses" centered>
                        <b-switch size="is-small" @change.native="changeSwitch(props.index)"
                          v-model="details.socios[props.index].anses" 
                          true-value="1" false-value="0" type="is-success"
                        ></b-switch>
                      </b-table-column>

                      <b-table-column width="40" label="Estado" centered>
                        <b-switch size="is-small" @change.native="changeSwitch(props.index)"
                          v-model="details.socios[props.index].estado" 
                          true-value="1" false-value="0" type="is-success"
                        ></b-switch>
                      </b-table-column>

                      <b-table-column label="" width="20" centered>
                          <b-tooltip label="Editar Socio" type="is-black">
                            <b-button icon-pack="fa" icon-left="user-cog" outlined rounded type="is-primary is-small" @click="editSocio(props.index)"></b-button>
                          </b-tooltip>
                      </b-table-column>
                    </template>
                  </b-table>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Tareas">
                <b-field label="Tareas">
                  <b-table class="stext" narrowed :data="details.tareas" :columns="[
                  {
                    field:'tareas',
                    label:'Tareas'
                  },
                  {
                    field:'destino_original',
                    label:'Dest. Orig.',
                  },
                  {
                    field:'destino_nuevo',
                    label:'Dest. Nuevo'
                  }
                  ]"></b-table>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Historial">
                <b-field label="Ejercicios Anteriores">
                   <b-table hoverable narrowed :data="history" :loading="loading">
                    <template slot-scope="props">
                      <b-table-column centered field="periodo" label="Periodo" class="stext"><span class="tag is-success">{{props.row.periodo.padStart(2,'0')}}/2019</span></b-table-column>
                      <b-table-column width="100" centered field="socios" label="Socios" class="stext">
                        <b-button type="is-info is-small" @click="showHistoryDetails(props.index)">{{props.row.socios.length}}</b-button>
                      </b-table-column>
                      <b-table-column width="100" centered field="planilla_asistencia" label="Asist" class="stext">{{props.row.planilla_asistencia}}</b-table-column>
                      <b-table-column width="100" centered field="sintys" label="Sintys" class="stext">{{props.row.sintys}}</b-table-column>
                      <b-table-column centered field="fecha_pago" label="Fecha Pago" class="stext">{{props.row.fecha_pago}}</b-table-column>
                    </template>
                   </b-table>
                </b-field>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- modal history socios details -->
  <b-modal :active.sync="isHistorySociosDetails" :can-cancel="true" has-modal-card full-screen>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Socios</div>
        <div class="card-header-icon">
            <span class="icon">
                <i class="fas fa-users" aria-hidden="true"></i>
            </span>
        </div>
      </div>
      <div class="card-content">
        <b-field>
            <b-table :data="historyDeatails">
              <template slot-scope="props">
                <b-table-column field="cuit" label="CUIT">{{props.row.cuit}}</b-table-column>
                <b-table-column field="nombre" label="Socio">{{props.row.nombre}}</b-table-column>
                <b-table-column field="asistencia" label="Asist" width="50" centered>{{props.row.asistencia}}</b-table-column>
                <b-table-column field="sintys" label="Sintys" width="50" centered>{{props.row.sintys}}</b-table-column>
                <b-table-column field="observaciones" label="Obs" width="80" centered>
                  <b-tooltip v-if="props.row.observaciones" type="is-info is-left" :label="props.row.observaciones">
                    <i class="fa fa-exclamation-circle is-success"></i>
                  </b-tooltip>
                </b-table-column>
              </template>
            </b-table>
        </b-field>
      </div>
    </div>
  </b-modal>

  <!-- modals edit socio -->
  <b-modal :active.sync="isModalUpdateSocioActive" width="450px" :can-cancel="true">
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
                        <b-input readonly v-model="socio.id"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="CUIT">
                        <b-input maxlength="11" v-model="socio.cuit"></b-input>
                    </b-field>
                </div>
            </div>
            <b-field label="Nombre Completo" style="margin-top:-2em;">
                <b-input maxlength="120" v-model="socio.nombre"></b-input>
            </b-field>
            
            <b-field label="Observaciones" style="margin-top:-1em;">
                <b-input type="textarea" rows="8" maxlength="300" v-model="socio.observaciones"></b-input>
            </b-field>
        </div>
        <div class="card-footer">
          <a class="card-footer-item" @click="isModalUpdateSocioActive=false">Cancelar</a>
          <a class="card-footer-item" @click="updateSocio()">Guardar</a>
        </div>
    </div>
  </b-modal>

  <!-- modals Add socio -->
  <b-modal :active.sync="isModalAddSocioActive" width="450px" :can-cancel="true">
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
                <b-input maxlength="11" v-model="socio.cuit"></b-input>
            </b-field>
            <b-field label="Nombre Completo" style="margin-top:-2em;">
                <b-input maxlength="120" v-model="socio.nombre"></b-input>
            </b-field>
        </div>
        <div class="card-footer">
          <a class="card-footer-item" @click="isModalAddSocioActive=false">Cancelar</a>
          <b-button class="card-footer-item" v-if="socio.cuit.length==11 && socio.nombre.length>5" @click="addSocio()">Guardar</b-button>
        </div>
    </div>
  </b-modal>

</div>
</template>
<script>
export default {
  name: 'home',
  data(){
    return {
      isHistorySociosDetails:false,
      isModalUpdateSocioActive:false,
      isModalAddSocioActive: false,
      tabActive:0,
      selected:null,
      currentPage:1,
      columnasShow:true,
      cooperativas: [],
      history:[],
      details:null,
      loading:false,
      meses:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      socio:{id:'',nombre:'',cuit:'',observaciones:''},
      historyDeatails:null
    }
  },
  methods:{
    loadEjercicio(){
      this.$http.get('/ejercicios').then(resp => {
        this.cooperativas = resp.data
        this.$toast.open({
            message:`Cargadas <b>${this.cooperativas.length}</b> cooperativas!`,
            type:'is-info',
            position:'is-bottom'
        })
        this.selected = this.cooperativas[0]; this.tabActive = this.tabActive || 0
        //para debug, borrar luego
        //this.currentPage = 2
        //this.selected = this.cooperativas[18];
        //this.tabActive = 3;
      })
    },
    editSocio(index){
      this.socio = {
        id:this.details.socios[index].id_persona,
        nombre:this.details.socios[index].nombre,
        cuit:this.details.socios[index].cuit,
        observaciones:this.details.socios[index].observaciones
      }
      this.isModalUpdateSocioActive = true
    },
    addSocioClick(){
      this.socio = {id:'',nombre:'',cuit:'',observaciones:''}
      this.isModalAddSocioActive = true
    },
    addSocio(){
      this.$http({
        method:'post',
        url:'/socios/',
        data:{
          id_coop:this.details.id,
          nombre:this.socio.nombre,
          cuit:this.socio.cuit,
          observaciones:this.socio.observaciones,
          periodo:this.selected.periodo
        }
      }).then(resp=>{
        this.socio = {id:'',nombre:'',cuit:'',observaciones:''}
        this.isModalAddSocioActive = false
        this.loadCoop()
        this.$toast.open({
            message:`Socio Creado!`,
            type:'is-success',
            position:'is-bottom'
        })
      })
    },
    changeSwitch(index){
      this.loading = true
      this.$http({
        method:'put',
        url:'/ejercicios/'+this.details.socios[index].id,
        data:{
          "estado":this.details.socios[index].estado,
          "sintys":this.details.socios[index].sintys,
          "afip":this.details.socios[index].afip,
          "anses":this.details.socios[index].anses,
          "asistencia":this.details.socios[index].asistencia,
          "observaciones":this.details.socios[index].observaciones
        }}).then(resp => {
          this.loading = false
        })
        
    },
    //Metodo que se llama cuando se cambio un Sitch global de la cooperativa
    switchCoopChange(a,b){
      this.loading = true
      this.$http({
        method:'put',
        url:'/ejercicios/coop',
        data:{...this.selected}
      }).then(resp => {
        console.log(resp.data)
        this.loading = false
      })
    },
    downloadReso(){
      this.$http({
        method:'get',
        url:'/resolucion/generar',
        responseType: 'blob',
        params:{
          coop:this.selected.nombre,
          expte:this.selected.expte,
          beneficiarios:this.details.socios.filter(x=> x.estado=='1').length,
          pte:this.details.autoridades[0].presidente,
          acompana:this.details.autoridades[0].acompana,
        }
      }).then(resp => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Resolucion ' + this.selected.nombre.toUpperCase()+'.docx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove()
      })
    },
    downloadAnexo(){
      this.$http({
        method:'get',
        url:'/anexo/generar/'+this.selected.id_coop,
        responseType: 'blob'
      }).then(resp => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Anexo ' + this.selected.nombre.toUpperCase() + ' ('+this.details.socios.length+').xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove()
      })
    },
    downloadSintys(){
      window.open(this.$http.defaults.baseURL + 'sintys/lista/' + this.selected.id_coop)
    },
    loadCoop(){
      this.$http.get(`/coops/${this.selected.id_coop}`).then(resp => {
        this.$set(this.details = resp.data)
        this.$http.get(`/coops/${this.selected.id_coop}/history`).then(h => this.$set(this.history = h.data))
      })
    },
    updateSocio(){
      this.$http({
        method:'put',
        url:'/socios/'+this.socio.id,
        data:{
          nombre:this.socio.nombre,
          cuit:this.socio.cuit,
          observaciones:this.socio.observaciones,
          periodo:this.selected.periodo
        }
      }).then(resp => {
        this.loadEjercicio()
        this.isModalUpdateSocioActive = false
        this.$toast.open({
            message:`Socio Actualizado!`,
            type:'is-success',
            position:'is-bottom'
        })
      })
    },
    showHistoryDetails(index){
      this.historyDeatails = this.history[index].socios
      this.isHistorySociosDetails = true
    }
  },
  mounted(){
    this.loadEjercicio()
  },
  watch:{
    selected: function(nuevo) {
      if(nuevo == null){
        this.columnasShow = true
      }else{
        this.columnasShow = false
      }
      this.loadCoop()
    }
  }
}
</script>
<style scoped>
 .stext {
   font-size: 9pt;
 }
 .pad6 {
   margin-left:10px;
 }
</style>
