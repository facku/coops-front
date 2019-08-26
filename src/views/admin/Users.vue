<template>
    <!-- Main Section -->
    <section class="section">
        <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a>Admin</a></li>
                        <li class="is-active"><a href="#" aria-current="page">Usuarios</a></li>
                    </ul>
                </nav>
        <!-- Main Container -->
        <div class="columns">
            <!-- Column Table -->
            <div class="column" :class="{'is-8':showForm}">
                <div class="box">
                    <div class="has-text-right">
                        <b-button type="is-info" icon-pack="fa" icon-left="user-plus"
                            @click="action='Crear Usuario';showForm=true;resetForm()"
                        >Nuevo Usuario</b-button>
                    </div>
                    <b-table :data="users">
                        <template slot-scope="props">
                            <b-table-column label="Usuario" sortable centered field="alias">
                                <span class="tag is-dark is-medium">{{props.row.alias}}</span>
                            </b-table-column>

                            <b-table-column label="Nombre" sortable field="nombre">
                                {{props.row.nombre}}
                            </b-table-column>

                            <b-table-column label="Apellido" sortable field="apellido">
                                {{props.row.apellido}}
                            </b-table-column>

                            <b-table-column label="Rol" sortable field="role" centered>
                                <span
                                    class="tag"
                                    :class="{'is-success':props.row.role==1,'is-info':props.row.role==3}"
                                >
                                    {{(roles[props.row.role]).padEnd(40-roles[props.row.role].length,'&nbsp;')}}&nbsp;
                                    <i :class="{'far fa-user':props.row.role==1,'fa fa-user-lock':props.row.role==3}"></i>
                                </span>
                            </b-table-column>

                            <b-table-column centered width="120">
                                <b-tooltip :label="`Borrar a ${props.row.nombre+' '+props.row.apellido}`" type="is-danger">
                                    <b-button icon-pack="fa" icon-left="trash" size="is-small" type="is-danger" outlined @click="borrarUser(props.row.id)"></b-button>
                                </b-tooltip>
                                &nbsp;
                                 <b-tooltip :label="`Modificar ${props.row.nombre+' '+props.row.apellido}`" type="is-info">
                                    <b-button @click="action='Editar Usuario';showForm=true;newUser=props.row;newUser.password=''"
                                        icon-pack="fa" icon-left="edit" size="is-small" type="is-success" outlined></b-button>
                                </b-tooltip>
                            </b-table-column>

                        </template>
                    </b-table>
                </div>
            </div>
            <!-- Column Form -->
            <div class="column is-4" v-if="showForm">
                <div class="box">
                    <p class="subtitle">
                        <i class="fa" :class="{'fa-user-plus':action=='Crear Usuario','fa-user-edit':action=='Editar Usuario'}"></i>
                        {{ action }}
                    </p>

                    <b-field label="Usuario">
                        <b-input v-model="newUser.alias"></b-input>
                    </b-field>

                    <b-field label="Nombre">
                        <b-input v-model="newUser.nombre"></b-input>
                    </b-field>

                    <b-field label="Apellido">
                        <b-input v-model="newUser.apellido"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input :placeholder="action=='Editar Usuario'?'Dejar en blanco para no cambiar la clave':'Password'" type="password" password-reveal v-model="newUser.password"></b-input>
                    </b-field>

                    <b-field label="Rol">
                        <b-select placeholder="Seleccione rol" v-model="newUser.role" expanded>
                            <option v-for="(rol,index) in roles" :value="index">{{rol}}</option>>
                        </b-select>
                    </b-field>

                    <b-field style="padding-top:15px">
                        <div class="level">
                            <div class="level-item">
                                <b-button type="is-fullwidth is-danger" outlined icon-pack="fa" icon-left="chevron-left" @click="resetForm();showForm=false">Cancelar</b-button>
                            </div>
                            <div class="level-item"></div>
                            <div class="level-item">
                                <b-button type="is-fullwidth is-success" outlined icon-pack="fa" icon-left="check" @click="action=='Editar Usuario'?editUser():createUser()">Guardar</b-button>
                            </div>
                        </div>
                        
                    </b-field>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:"users",
    data(){
        return {
            action:'',
            roles:{1:'Usuario', 3:'Administrador'},
            users: [],
            newUser:{
                alias:'',
                nombre:'',
                apellido:'',
                password:'',
                role:1
            },
            showForm:false
        }
    },
    methods:{
        loadUsers(){
            this.$http.get('/users').then( resp => this.users = resp.data )
        },
        resetForm(){
            this.newUser = {
                alias:'',
                nombre:'',
                apellido:'',
                password:'',
                role:1
            }
        },
        borrarUser(id){
            this.$dialog.confirm({
                type:'is-danger',
                hasIcon:true,
                title:'Borrar Usuario?',
                message:'Realmente desea borrar el usuario "<b>'+this.users.filter(x=> x.id==id)[0].alias+'</b>"?<br>La operacion no se podrá deshacer.',
                confirmText:'Borrar',
                cancelText:'Cancelar',
                onConfirm: () => {
                    this.$http.delete('/users/'+id).then(resp => {
                        this.$toast.open({
                            message:'<i class="fa fa-user-times"></i>&nbsp;Usuario "'+resp.data.alias+'" eliminado',
                            type:'is-danger',
                            position:'is-bottom'
                        })
                        this.users = []
                        this.loadUsers()
                    })
                }
            })
        },
        createUser(){
            this.$http.post('/users',this.newUser).then(resp => {
                this.loadUsers()
                this.resetForm()
                this.$toast.open({
                    message:'<i class="fa fa-user-check"></i>&nbsp;Usuario "'+resp.data.alias+'" creado',
                    type:'is-success',
                    position:'is-bottom'
                })
            })
        },
        editUser(){
            this.$http.put('/users/'+this.newUser.id, this.newUser).then( resp => {
                this.loadUsers()
                this.$toast.open({
                    message:'<i class="fa fa-user-check"></i>&nbsp;Usuario "'+resp.data.alias+'" modifico',
                    type:'is-success',
                    position:'is-bottom'
                })
            })
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>
