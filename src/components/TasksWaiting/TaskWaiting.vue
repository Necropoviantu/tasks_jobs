<template>

  <q-card  class=" q-mt-sm" >
    <q-bar class="card-header" >
      <q-toolbar-title  class="text-white">Задачи отложенны</q-toolbar-title >
      <q-space/>
      <q-toolbar-title class="text-white" align="right">В ожидании: {{tasks.tasksWaiting.value.length}}</q-toolbar-title>
    </q-bar>
    <q-card-section class="q-pa-sm">
      <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 20vh"
      >
        <q-item :style="{'backgroundColor': colorTask(task.deadline)}"  class="q-pa-xs" v-for="task in tasks.tasksWaiting.value" >

          <q-item-section class="text-resize" style="max-width: 250px" @click="openTasks(task.id)">
            <div><span :class="taskUrgentColor(task.ufUrgentTask)">{{task.title}}</span>
              <q-tooltip :delay="1000" :offset="[0, 10]">{{task.title}}</q-tooltip>
            </div>
            <div>
              <q-badge color="teal" v-if="task.group.length != 0">{{ task.group.name }}</q-badge>
            </div>

          </q-item-section>
          <q-separator class="q-ml-sm q-mr-sm" vertical />
          <q-item-section style="max-width: 100px">
            <div align="center">{{mom(task.timeSpentInLogs)+ 'ч.'}}/{{task.ufAuto534114283231 + 'ч.'}}</div>
            <div class="row no-wrap q-gutter-sm justify-center " align="center">
              <q-linear-progress rounded size="10px" :value="getProgres(task)"
               :color="getColor(task)"
              />
            </div>

          </q-item-section>



          <q-separator class="q-ml-sm q-mr-sm" vertical />
          <q-item-section align="center">{{getTime(task.createdDate)}}
            <q-tooltip :delay="1000" :offset="[0, 10]">Дата постановки задачи</q-tooltip>
          </q-item-section>
          <q-separator class="q-ml-sm q-mr-sm" vertical />
          <q-item-section align="center">{{getTime(task.deadline)}}
            <q-tooltip :delay="1000" :offset="[0, 10]">Дата Deadline</q-tooltip>
          </q-item-section>
        </q-item>


      </q-scroll-area>

    </q-card-section>
  </q-card>
</template>

<script>
import {useTasksStore} from "@/store/useTasks";
import {useUserStore} from "@/store/useUsers";
import {storeToRefs} from "pinia";
import moment from "moment";

export default {
  name: "TaskWaiting.vue",
  setup(){
    const tasks = storeToRefs(useTasksStore())
    const user = storeToRefs(useUserStore())
    const openTasks = function (id){
      const url = '/company/personal/user/'+user.getCurrent.value.id+'/tasks/task/view/'+id+'/'
      BX24.openPath(
          url,
          result => {
          })
    }
    const getTime = function (time){
      if(time) {
        let times = moment(time)
        return times.format('DD.MM.YYYY HH:ss')
      }else {
        return ''
      }
    }
    const  mom = function (data){
      const secs = data;

      const formatted = moment.utc(secs * 1000).format("HH:mm:ss");
      return formatted
    };
    const getProgres = function (data){
      let time = 0
        time = data.timeSpentInLogs / data.timeEstimate
        return time.toFixed(2)
    }
    const getColor = function (data){
      let time = 0
      time = data.timeSpentInLogs / data.timeEstimate
        if(time.toFixed(2) < 0.33){
          return 'green'
        } else if(time.toFixed(2) > 0.33 && time.toFixed(2) < 0.66){
          return 'yellow'
        }else if(time.toFixed(2) > 0.66){
          return 'red'
        }else{
          return 'primary'
        }

    }
    const colorTask = function (data){
      var a = moment();
      var b = moment(data);
     if(a.diff(b, 'days') > 0){
       return 'rgba(219, 115, 128, 0.2)'
     }

    }
    const taskUrgentColor = function (data){
      if(data){
        let color =''
        tasks.getTaskUrgent.value.forEach(item =>{
          if(item.id == data){
            color = 'text-'+item.color
          }
        })
        return color
      }else {
        return 'text-black'
      }
    }

    return{
      tasks,
      user,
      mom,
      openTasks,
      getTime,
      getProgres,
      getColor,
      colorTask,
      taskUrgentColor,
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
.text-resize
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>