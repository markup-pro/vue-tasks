<template>
  <h1 class="text-white center" v-if="$store.state.tasks.length === 0">Задач пока нет</h1>
  <div class="tasks-list" v-else>
    <h3 class="text-white">Всего активных задач: {{ countActiveTask }}</h3>
    <div class="card">
      <div class="btn-holder">
        <button
          :class="['btn', { 'primary': activeStatusIndex === idx }]"
          v-for="(btn, idx) in statusList"
          :key="btn.title"
          @click="filterTasks(idx)">
          {{ btn.title }}
        </button>
      </div>
    </div>
    <card-task
      v-for="task in tasks"
      :key="task.id"
      :data="task"
    ></card-task>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import CardTask from '@/components/CardTask'

export default {
  setup () {
    const store = useStore()
    const statusList = reactive([
      {
        type: '',
        title: 'Все'
      },
      {
        type: 'active',
        title: 'Активные'
      },
      {
        type: 'pending',
        title: 'Выполняються'
      },
      {
        type: 'cancelled',
        title: 'Отмененные'
      },
      {
        type: 'done',
        title: 'Завершенные'
      }
    ])
    const activeStatusIndex = ref(0)

    store.dispatch('getTasks')
    const tasks = computed(() => {
      return store.getters.getFilterTasks(statusList[activeStatusIndex.value].type)
    })
    const countActiveTask = computed(() => store.getters.getCountActiveTasks)

    function filterTasks (idx) {
      activeStatusIndex.value = idx
    }

    return {
      tasks,
      countActiveTask,
      activeStatusIndex,
      statusList,
      filterTasks
    }
  },

  components: { CardTask }
}
</script>
