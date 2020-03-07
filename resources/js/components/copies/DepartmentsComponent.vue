
<template>
  <div>
    <td>
<div class="btn-group">
      <button class="btn btn-success" @click="abrirModalDep('department','registrar')">
        <i class="legt fas fa-plus-circle"></i>
        Agregar departamento
      </button>
      <button class="btn btn-success" @click="abrirModalDep('department','listar')">
        <i class="legt fas fa-list-alt"></i>
        Listar departamentos
      </button>
    </div>
    </td>
    
    <!--Inicio del modaldepartments agregar/actualizar-->
    <div
      v-if="modal==1"
      class="modal fade"
      tabindex="-1"
      :class="{'mostrar' : modal}"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: none; overflow-y:auto;"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-primary modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header-SUCCESS">
            <h4 class="modal-title" v-text="tituloModal"></h4>
            <button type="button" class="close" @click="cerrarModalDep()" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form action method="post" enctype="multipart/form-data" class="form-horizontal">
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>

                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="department_name"
                    class="form-control"
                    id="department_name"
                    placeholder="Frutería"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Slug</label>
                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="department_slug"
                    class="form-control"
                    id="department_slug"
                    placeholder="frutas-de-temporada"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Descripción</label>
                <div class="col-md-9">
                  <textarea
                    required
                    rows="5"
                    maxlength="900"
                    v-model="department_body"
                    class="form-control"
                    id="department_body"
                    placeholder="Ingrese descripción"
                  ></textarea>
                </div>
              </div>

              <div v-show="errorDepartment" class="form-group row div-error">
                <div class="text-center text-error bg-danger">
                  <div v-for="error in errorMostrarMsjDepartment" :key="error" v-text="error"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModalDep()">Cerrar</button>
            <button
              type="button"
              v-if="tipoAccion==2"
              class="btn btn-success far fa-save"
              @click="registrarDepartment()"
            >Guardar</button>
            <button
              type="button"
              v-if="tipoAccion==1"
              class="btn btn-primary"
              @click="actualizarDepartment()"
            >Actualizar</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!--Fin del modal departments-->
    <!--Inicio del modal listar departamentos-->
    <div
      v-if="modal==7"
      class="modal fade"
      tabindex="-1"
      :class="{'mostrar' : modal}"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: none; overflow-y:auto;"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-primary modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header-SUCCESS">
            <h4 class="modal-title" v-text="tituloModal"></h4>
            <button type="button" class="close" @click="cerrarModalDep()" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div style="overflow-x:auto; border:solid ; min-width:80%">
              <table class="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th>Opciones</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="department in arrayDepartment" :key="department.id">
                    <td>
                      <button
                        type="button"
                        @click="abrirModalDep('department','actualizar',department)"
                        class="btn btn-warning btn-sm"
                      >
                        <i class="fas fa-pen-alt"></i>
                      </button> &nbsp;
                      <!--
                               <button type="button" class="btn btn-danger btn-sm" @click="eliminarDepartment(department.id)">
                                 <i class="icon-trash"></i>
                      </button>&nbsp;-->
                      <template v-if="department.condition">
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm"
                          @click="desactivarDepartment(department.id)"
                        >
                          <i class="fas fa-close"></i>
                        </button>
                      </template>
                      <template v-else>
                        <button
                          type="button"
                          class="btn btn-info btn-sm"
                          @click="activarDepartment(department.id)"
                        >
                          <i class="icon-check"></i>
                        </button>
                      </template>
                    </td>
                    <td v-text="department.name"></td>
                    <td v-text="department.body"></td>
                    <td>
                      <div v-if="department.condition">
                        <span class="badge badge-success">Activo</span>
                      </div>
                      <div v-else>
                        <span class="badge badge-danger">Desactivado</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav>
              <ul class="pagination">
                <li class="page-item" v-if="pagination.current_page > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(pagination.current_page - 1,buscar,criterio)"
                  >Ant</a>
                </li>
                <li
                  class="page-item"
                  v-for="page in pagesNumber"
                  :key="page"
                  :class="[page == isActived ? 'active' : '']"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(page,buscar,criterio)"
                    v-text="page"
                  ></a>
                </li>
                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="cambiarPagina(pagination.current_page + 1,buscar,criterio)"
                  >Sig</a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="modal-footer row">
            <button
              type="button"
              v-if="tipoAccion==5"
              class="btn btn-success fas fa-save"
              @click="registrarProduct()"
            >Guardar</button>
            <button
              type="button"
              v-if="tipoAccion==6"
              class="btn btn-success fas fa-save"
              @click="actualizarProduct()"
            >Actualizar</button>
            <button
              type="button"
              class="btn btn-success fas fa-close"
              @click="cerrarModalDep()"
            >Cerrar</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!--Fin del modal-->
  </div>
</template>
<script>
import Commerces from "./CommercesComponent.vue";
export default {
  extends: Commerces,
  components: {
    Commerces
  },
  data() {
    return {
      //departments data
      department_id: 0,
      commerce_d: "",
      name: "",
      body: "",
      slug: "",
      condition: "",
      errorDepartment: "",
      errorMostrarMsjDepartment: [],
      modal: 0,
      tituloModal: "",
      commerce_slug: "",
      tipoAccion: 0,
      arrayDepartment: [],
       pagination: {
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0
      },
      
    };
  }, computed: {
    isActived: function() {
      return this.pagination.current_page;
    },
    //Calcula los elementos de la paginación
    pagesNumber: function() {
      if (!this.pagination.to) {
        return [];
      }

      var from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }

      var to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    }
  },
  methods: {
     cerrarModalDep() {
      this.modal = 0;
      this.department_name = "";
      this.department_slug = "";
      this.department_body = "";
      this.department_condition = "";
    },
    abrirModalDep(modelo, accion, data = []) {
      switch (modelo) {
        case "department":
          {
            switch (accion) {
              case "listar": {
                this.modal = 7;
                this.tituloModal = "Listar departamentos";
                //const axios = require("axios");

                let me = this;
                var url = "/commerce/departments";
                axios
                  .post("chained/department", {
                    commerce_d: this.commerce_slug
                  })
                  .then(function(response) {
                    axios.get("chained/department").then(response => {
                      me.arrayDepartment = response.data;
                    });
                  })
                  .catch(function(error) {
                    console.table(error);
                  });
                axios
                  .get("chained/department")
                  .then(function(response) {
                    var respuesta = response.data;
                    me.arrayDepartment = respuesta.departments.data;
                    me.pagination = respuesta.pagination;
                    //console.table(response);
                  })
                  .catch(function(error) {
                    console.table(error);
                  });
                this.tipoAccion = 3;
                break;
              }
              case "registrar": {
                this.modal = 1;
                this.tituloModal = "Agregar departamento ";
                this.department_id = 0;
                this.category_name = "";
                this.category_slug = "";
                this.category_body = "";
                this.category_condition = "";
                this.tipoAccion = 3;
                break;
              }
              case "actualizar": {
                //console.log(data);
                this.department_id = data["department_id"];
                this.modal = 1;
                this.tituloModal = "Editar departamento ";
                this.tipoAccion = 4;
                this.category_name = data["category_name"];
                this.category_body = data["category_body"];
                this.category_slug = data["category_slug"];
                break;
              }
            }
          }
          break;
      }
    }
  }
};
</script>