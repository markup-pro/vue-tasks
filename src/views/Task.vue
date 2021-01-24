<template>
  <div class="card" v-if="isTaskId">
    <h2>{{ dataTask.title }}</h2>
    <p><strong>Статус</strong>: <app-status :status="dataTask.status"></app-status></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(dataTask.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ dataTask.description }}</p>
    <div>
      <button class="btn" @click.prevent="changeStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click.prevent="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click.prevent="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import AppStatus from '../components/AppStatus'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const taskId = computed(() => route.params.taskId)
    const isTaskId = computed(() => store.getters.checkTaskId(taskId.value))
    const dataTask = computed(() => store.getters.getTaskData(taskId.value))

    function changeStatus (status) {
      store.dispatch('updateStatus', { status, taskId: taskId.value })
    }

    return {
      taskId,
      isTaskId,
      dataTask,
      changeStatus
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
