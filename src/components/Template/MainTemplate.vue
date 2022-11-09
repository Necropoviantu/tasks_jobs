<template>
  <suspense>
<div class="q-pa-sm">


  <q-splitter
      v-model="splitterModel"
      style="height: 88vh; "
  >

    <template v-slot:before>
      <q-splitter
          v-model="insideModel2"
          horizontal
      >

        <template v-slot:before>
          <q-splitter
              v-model="insideModel"
              horizontal
          >
            <template v-slot:before>
          <div class="q-pa-sm">
            <TaskEvalation ></TaskEvalation>
          </div>
            </template>
              <template v-slot:after>
          <div class="q-pa-sm">

          <TaskWaiting></TaskWaiting>

          </div>
              </template>
          </q-splitter>
        </template>

        <template v-slot:after>
          <div class="q-pa-sm">
            <kpi></kpi>
          </div>
        </template>

      </q-splitter>
    </template>

    <template v-slot:after>
      <q-splitter
          v-model="insideModel"
          horizontal
      >

        <template v-slot:before>
          <div class="q-pa-sm">
            <task-job></task-job>
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-sm">
            <TaskPlane></TaskPlane>
          </div>
        </template>

      </q-splitter>
    </template>

  </q-splitter>




</div>
  </suspense>
</template>

<script>
import {ref} from 'vue'
import TaskEvalation from "@/components/TaskEvalation/TaskEvalation";
import TaskWaiting from "@/components/TasksWaiting/TaskWaiting";
import TaskPlane from "@/components/TaskPlane/TaskPlane";
import TaskJob from "@/components/TaskJob/TaskJob";
import Kpi from "@/components/Kpi/Kpi";
export default {
  name: "MainTemplate.vue",
  setup(){

    const tasks = [
      {id:1,name:'Задача номер 1'},
      {id:2,name:'Задача номер 2'},
      {id:3,name:'Задача номер 3'},
      {id:4,name:'Задача номер 4'},
      {id:5,name:'Задача номер 5'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
      {id:6,name:'Задача номер 6'},
    ]
    return{
      tasks,
      splitterModel: ref(50),
      insideModel:ref(50),
      insideModel2:ref(65),
      thumbStyle: {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#5f6161',
        width: '4px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#5f6161',
        width: '8px',
        opacity: 0.2
      },
    }},
  components:{
    TaskEvalation,
    TaskWaiting,
    TaskPlane,
    TaskJob,
    Kpi
  }
}
</script>

<style  lang="sass" scoped>
.card-header
      color: white
      background: linear-gradient(to right, #130cb7c2, #52e5e782)
      box-shadow: 0px 3px 1.96px 0.04px rgba(0, 0, 0, 0.18)
.toolbar-round
      border-radius: 5px
</style>