<template>
  <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
  <div class="tasks-list" v-else>
    <h3 class="text-white">Всего активных задач: {{ countActiveTask }}</h3>
    <div class="card">
      <div class="btn-holder">
        <div class="btn primary">Все</div>
        <div class="btn">Активные</div>
        <div class="btn">Выполняються</div>
        <div class="btn">Отмененные</div>
        <div class="btn">Завершенные</div></div>
      </div>
    <card-task
      v-for="task in tasks"
      :key="task.id"
      :data="task"
    ></card-task>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import CardTask from '@/components/CardTask'

export default {
  setup () {
    const store = useStore()

    store.dispatch('getTasks')
    const tasks = computed(() => store.state.tasks)
    const countActiveTask = computed(() => store.getters.getCountActiveTasks)

    return {
      tasks,
      countActiveTask
    }
  },

  components: { CardTask }
}
</script>
