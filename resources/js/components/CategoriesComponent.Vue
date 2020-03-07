<template>
  <div>
    <div class="btn-group">
      <button type="button" class="btn btn-info" @click="abrirModalCat('category','registrar')">
        <i class="legt fas fa-plus-circle"></i>
        Agregar categoria
      </button>
      <button type="button" class="btn btn-success" @click="abrirModalCat('category','listar')">
        <i class="legt fas fa-list-alt"></i>Listar categorias
      </button>
    </div>
    <!--Inicio del modalcategoriess agregar/actualizar-->
    <div
      v-if="modal==2"
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
            <button type="button" class="close" @click="cerrarModalCat()" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form action method="post" enctype="multipart/form-data" class="form-horizontal">
              <div class="form-group row">
                <label class="form-control-label" for="text-input">Departamento</label>

                <div class="col-md-9">
                  <select
                    class="form-control"
                    id="department"
                    @change="department"
                    v-model="changestate.department"
                  >
                    <option value="0" disabled>Seleccione</option>
                    <option
                      v-for="department in arrayDepartment"
                      :key="department.id"
                      :value="department.id"
                      v-text="department.name"
                    ></option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>

                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="category_name"
                    class="form-control"
                    id="category_name"
                    placeholder="frutas de temporada"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Slug</label>
                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="category_slug"
                    class="form-control"
                    id="category_slug"
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
                    v-model="category_body"
                    class="form-control"
                    id="category_body"
                    placeholder="Ingrese descripción"
                  ></textarea>
                </div>
              </div>

              <div v-show="errorCategory" class="form-group row div-error">
                <div class="text-center text-error bg-danger">
                  <div v-for="error in errorMostrarMsjCategory" :key="error" v-text="error"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModalCat()">Cerrar</button>
            <button
              type="button"
              v-if="tipoAccion==3"
              class="btn btn-success far fa-save"
              @click="registrarCategory()"
            >Guardar</button>
            <button
              type="button"
              v-if="tipoAccion==4"
              class="btn btn-primary"
              @click="actualizarCategory()"
            >Actualizar</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!--Fin del modal categories-->
    <!--Inicio del modal listarcategories agregar/actualizar-->
    <div
      v-if="modal==8"
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
            <button type="button" class="close" @click="cerrarModalCat()" aria-label="Close">
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
                  <tr v-for="category in arrayCategory" :key="category.id">
                    <td>
                      <button
                        type="button"
                        @click="abrirModalCat('category','actualizar',category)"
                        class="btn btn-warning btn-sm"
                      >
                        <i class="fas fa-pen-alt"></i>
                      </button> &nbsp;
                      <!--
                               <button type="button" class="btn btn-danger btn-sm" @click="eliminarDepartment(category.id)">
                                 <i class="icon-trash"></i>
                      </button>&nbsp;-->
                      <template v-if="category.condition">
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm"
                          @click="desactivarCategory(category.id)"
                        >
                          <i class="fas fa-close"></i>
                        </button>
                      </template>
                      <template v-else>
                        <button
                          type="button"
                          class="btn btn-info btn-sm"
                          @click="activarCategory(category.id)"
                        >
                          <i class="icon-check"></i>
                        </button>
                      </template>
                    </td>
                    <td v-text="category.name"></td>
                    <td v-text="category.body"></td>
                    <td>
                      <div v-if="category.condition">
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
              @click="cerrarModalCat()"
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
      arrayDepartment: [],
      department_id: 0,
      commerce_d: "",
      //categories data
      arrayCategory: [],
      errorCategory: "",
      errorMostrarMsjCategory: [],
      category_id: 0,
      category_name: "",
      name: "",
      body: "",
      slug: "",
      condition: "",
      errorCategory: "",
      errorMostrarMsjCategory: [],
      modal: 0,
      tituloModal: "",
      commerce_slug: "",
      tipoAccion: 0,
      arrayCategory: [],
      pagination: {
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0
      },
      changestate: {
        commerce: "",
        department: "",
        category: "",
        product: ""
      }
    };
  },

  departments() {
    let me = this;
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
  },
  department() {
    this.changestate.category = ""; //Seleccionar categoria
    // set params
    const params = {
      department: this.changestate.department
    };
    // url /location/category?department=xxx
    axios
      .get("chained/category", { params })
      .then(response => {
        this.arrayCategory = response.data;
      })
      .catch(error => console.table(error));
  },

  computed: {
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
    cerrarModalCat() {
      this.modal = 0;
      this.category_departmentid = "";
      this.category_name = "";
      this.category_slug = "";
      this.category_body = "";
      this.category_condition = "";
    },
    abrirModalCat(modelo, accion, data = []) {
      switch (modelo) {
        case "category":
          {
            switch (accion) {
              case "listar": {
                this.modal = 8;
                this.tituloModal = "Listar categorias";
                //const axios = require("axios");

                let me = this;
                var url = "/commerce/categories";
                axios.post("commerce_slug");
                axios
                  .get(url)
                  .then(function(response) {
                    var respuesta = response.data;
                    me.arrayCategory = respuesta.categories.data;
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
                this.modal = 2;
                this.tituloModal = "Agregar categoria ";
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
                this.modal = 2;
                this.tituloModal = "Editar categoria ";
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