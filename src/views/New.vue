<template>
  <form class="card" @submit.prevent="submitForm">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="state.title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="state.date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="state.description"></textarea>
    </div>

    <button class="btn primary" :disabled="disableBtn">Создать</button>
  </form>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const state = reactive({
      title: '',
      date: '',
      description: '',
      status: ''
    })

    const store = useStore()
    const router = useRouter()
    const disableBtn = computed(() => !state.title || !state.date || !state.description)

    function submitForm () {
      const checkDate = new Date(state.date).getTime() > new Date().getTime()
      state.status = checkDate ? 'active' : 'cancelled'

      store.dispatch('addNewTask', state)

      router.push('/')
    }

    return {
      state,
      disableBtn,
      submitForm
    }
  }
}
</script>
