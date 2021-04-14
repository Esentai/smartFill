<template>
  <div>
    <Header name="Добавить абитуриента" />
    <div class="container">
      <div class="add_form">
        <step-progress :steps="mySteps" :current-step="currentStep" :line-thickness="8" :passive-thickness="4" :active-thickness="4" active-color="#28a745" passive-color="#6c757d" icon-class="fa fa-check"></step-progress>
        <form>
          <br>
          <div v-if="currentStep === 0">
            <div class="form-group">
              <label>Введите ИИН:</label>
              <input type="number" class="form-control" v-model="iin" @input="checkIIN" >
            </div>
            <div class="form-group" v-if="fio">
              <input type="text" v-model="fio" class="form-control" readonly>
            </div>
          </div>


          <div class="buttons">
            <b-button class="addBtn" v-if="currentStep>0" :disabled="fio" variant="primary">Назад</b-button>
            <h1></h1>
            <b-button class="addBtn" :disabled="!fio" v-on:click="nextStep" variant="primary">Продолжить</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header";

import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
import axios from "axios";

export default {
  name: "Add",
  components:{
    Header,
    StepProgress,
  },
  data() {
    return {
      mySteps:['ФИО','Личные данные', 'Специальность', 'Школа' ],
      currentStep:0,
      iin:'',
      fio:'',
      dateOfBirth:'',
    }
  },
  methods:{
    nextStep(){
      if (this.currentStep === 0 && this.fio){
        this.currentStep++;
      }
    },

    checkIIN: async function() {
      if(this.iin.length === 12 ) {
        let config = {
          headers:{
            'Accept': 'application/json'
          }
        }
        const response = await axios.get(`http://easypay.kz/api/iin/${this.iin}`, config);
        let res = JSON.parse(response.data)
        console.log(res.name)
        this.fio =  res.name;
        this.dateOfBirth =  res.birthdate;
      }
    },
  }

}
</script>

<style scoped>
  .add_form{
    border: 2px #6c757d solid;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px 45px;
    text-align: left;
  }
  .buttons{
    display: flex;
    justify-content: space-between;
  }
  .addBtn{
    margin-bottom: 20px;
  }

</style>


