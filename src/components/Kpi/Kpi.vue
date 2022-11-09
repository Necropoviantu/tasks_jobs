<template>
  <q-card  class="q-mt-sm" style=" max-height: 200px">
    <q-bar class="card-header">
      <q-toolbar-title class="text-white">KPI Текушего месяца</q-toolbar-title>
    </q-bar>

    <q-card-section class="q-pa-sm row no-wrap justify-between">
      <div>Средние трудозатраты по дню : {{ trackDay.time }} ч.</div>
      <div> Мы приодолели 5 часовой барьер раз : {{trackDay.moreFive}} из {{trackDay.allDay}}</div>
    </q-card-section>
    <q-card-section class="q-pa-sm row no-wrap justify-between">
      <div>Трудозатраты по счетчику</div>
      <div>{{trackTime}}</div>
    </q-card-section>
    <q-card-section class="q-pa-sm row no-wrap justify-between">
      <div>Сумма часов принятых проект менеджером:  </div>
      <div>{{closedPlanned}}</div>
    </q-card-section>
    <q-card-section class="q-pa-sm row no-wrap justify-between">
      <div> Задач закрытых / во время.</div>
      <div>{{tasks.tasksComplite.value.length}} / {{closedOnTime.length}} </div>
    </q-card-section>
    <pre>

    </pre>
  </q-card>
</template>

<script>
import {ref, computed } from 'vue'
import {useTasksStore} from "@/store/useTasks";
import {storeToRefs} from "pinia";
import moment from 'moment'
export default {
  setup() {
    const tasks = storeToRefs(useTasksStore())
    const closedOnTime = computed(()=>{
          let result = []
          tasks.tasksComplite.value.forEach(item=>{
            if(item.deadline && item.closedDate) {
              if (moment().isAfter(item.closedDate, item.deadline)) {
                result.push(item)
              }
            }
          })
        return result
  })
    const closedPlanned = computed(()=>{
       let sum = 0
      tasks.tasksComplite.value.forEach(item =>{
        if(item.ufAuto534114283231) {
        sum+=Number(item.ufAuto534114283231.replace(',','.'))
        }
      })
      return sum
    })
    const trackTime = computed(()=>{
            let sum = 0
      tasks.tasksElapsed.value.forEach(item=>{
        if((item.SECONDS /60/60) < 7) {
          sum += Number(item.SECONDS)
        }
      })
      let hours = Math.floor(sum / 60 / 60);
      let minutes = Math.floor(sum / 60) - (hours * 60);
      let seconds = sum % 60;
      let formatted = hours + ':' + minutes + ':' + seconds;
      return formatted
    })

    const trackDay = computed(()=>{
      let result = {};
      let tasksW = tasks.tasksElapsed.value
      tasksW =  JSON.stringify(tasksW)
      tasksW = JSON.parse(tasksW)
      for(let task of  tasksW){
        if(result[task.CREATED_DATE.split(' ')[0]]){
          result[task.CREATED_DATE.split(' ')[0]].SECONDS += +task.SECONDS;
        }else{
         task.SECONDS = +task.SECONDS
          result[task.CREATED_DATE.split(' ')[0]] = task
        }
      }
      let complData = []
     for(let key in result){
       complData.push({
         data: key,
         seconds: result[key].SECONDS
       })
     }
     let res ={
        moreFive:0,
        allDay:0,
        time:0
     }

  res.allDay = complData.length
     let sum = 0
      complData.forEach(item =>{

       if((+item.seconds/60/60) > 5){
          res.moreFive+=1
       }
       sum+= +item.seconds
     })
      let sums = sum / complData.length


      let hours = Math.floor(sums / 60 / 60);
      let minutes = Math.floor(sums / 60) - (hours * 60);
      let seconds = sums % 60;
      let formatted = hours + ':' + minutes + ':' + seconds.toFixed(0);

      res.time = formatted





      return  res;
   })
    return {
        tasks,
        closedOnTime,
        trackTime,
        trackDay,
        closedPlanned
    }
  }
}
</script>

<style lang="sass" scoped>
.card-header
  color: white
  background: linear-gradient(to right, #130cb7c2, #52e5e782)
  box-shadow: 0px 3px 1.96px 0.04px rgba(0, 0, 0, 0.18)
.toolbar-round
  border-radius: 5px
.item-border
  border-bottom: 1px solid rgba(0, 0, 0, 0.12)
</style>