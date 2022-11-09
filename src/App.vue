<template>

  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="card-header shadow-3">
            <q-avatar>
              <img :src="current.getCurrent.value.photo">
            </q-avatar>
      <q-toolbar-title class="text-white">{{current.getCurrent.value.name}}</q-toolbar-title>
    </q-toolbar>

    <q-page-container>

      <MainTemplate></MainTemplate>

    </q-page-container>
  </q-layout>

</template>

<script >
import {ref} from 'vue'
import MainTemplate from "@/components/Template/MainTemplate";
import {useUserStore} from "@/store/useUsers";
import {useTasksStore} from "@/store/useTasks";
import { storeToRefs } from 'pinia'
import { useQuasar, QSpinnerGears } from 'quasar'
import { watchEffect } from 'vue'
export default {
  name: 'LayoutDefault',

  components: {
    MainTemplate
  },
  async created() {
    const load = useUserStore()
    await load.getUser()
    const task = useTasksStore()
    await  task.loadTasks(load.getCurrent.id)
    await task.loadTasksComplite(load.getCurrent.id)
    await task.loadTaskElapsedItem(load.getCurrent.id)
    },
  setup () {
    const current = storeToRefs(useUserStore())
    const $q = useQuasar()
    const loader = storeToRefs(useTasksStore())

    let timer
    if (loader.tasksAtWork.value.length == 0) {
      $q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        message: 'Носим мешки ...'
      })
      timer = setTimeout(() => {
        $q.loading.show({
          spinner: QSpinnerGears,
           spinnerColor: 'primary',
          // messageColor: 'black',
          // backgroundColor: 'yellow',
          message: 'Строим Барикады ...'
        })
        timer = setTimeout(() => {
          $q.loading.show({
            spinner: QSpinnerGears,
             spinnerColor: 'primary',
            // messageColor: 'black',
            // backgroundColor: 'yellow',
            message: 'Кормим тролей ...'
          })

        }, 2000)
      }, 2000)

    }
    watchEffect(async () => {
      if (loader.tasksAtWork.value.length > 0) {
        $q.loading.hide()

      }
    })

    return {
      current,


    }


  }
}
</script>
<style lang="sass" scoped>
.card-header
    color: white
    background: linear-gradient(to right, #130cb7c2, #52e5e782)
    box-shadow: 0px 3px 1.96px 0.04px rgba(0, 0, 0, 0.18)

</style>
