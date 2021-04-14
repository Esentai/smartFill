<template>
  <div>
    <b-button class="addBtn" v-b-modal.modal-1 variant="primary">Добавить ГОП</b-button>
    <div>
      <b-modal id="modal-1" v-model="modalShow" title="Добавить ГОП">
        <b-form-input v-model="id" placeholder="ГОП ID"></b-form-input>
        <br>
        <b-form-input v-model="gep_name" placeholder="Название"></b-form-input>
        <br>
        <b-form-input type="number" v-model="minn" placeholder="Минимальный балл"></b-form-input>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="md" variant="danger" @click="cancel()">
            Cancel
          </b-button>
          <b-button size="md" variant="primary" @click="handleOk">Добавить ГОП</b-button>

        </template>
      </b-modal>
    </div>
    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Название</th>
        <th scope="col">Минимальный балл</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in info" :key="item.ID">
          <th scope="row">{{item.ID}}</th>
          <td>{{item.name}}</td>
          <td>{{item.minimum_score}}</td>
          <td><b-button  v-on:click="deleteGep(item.ID)" variant="danger">Удалить</b-button></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "gep",

  data () {
    return {
      info: null,
      id: '',
      gep_name:'',
      minn: null,
      modalShow: false
    }
  },
  mounted () {
    this.getGep();
  },
  methods: {
    async getGep(){
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      const gep = await axios.get('http://localhost:5000/gep', config);
      this.info = gep.data;
    },

    async handleOk(){
      if (this.id && this.gep_name){
        console.log("OK!")
        await axios.post('http://localhost:5000/gep', {
          params: {
            ID: this.id,
            name: this.gep_name,
            minimum_score: this.minn
          }
        })
        await this.getGep();
        this.modalShow = false;
        this.id = '';
        this.gep_name = '';
        this.minn = null;
      }else{
        alert("Заполните все поля")
      }
    },

    async deleteGep(id){
      console.log(id);
      let config = {
        headers:{
          'Accept': 'application/json'
        }
      }
      await axios.delete(`http://localhost:5000/gep/${id}`, config);
      await this.getGep();
    }
  }
}

</script>

<style scoped>
  .addBtn{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
</style>