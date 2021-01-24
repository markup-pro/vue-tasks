<template>
  <div class="card">
    <h2 class="card-title">
      {{ data.title }}
      <app-status :status="data.status"></app-status>
    </h2>
    <p>
      <strong>
        <small>
          {{ new Date(data.date).toLocaleDateString() }}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click.prevent="showTaskDetail">Посмотреть</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  props: ['data'],
  setup (props) {
    const router = useRouter()
    function showTaskDetail () {
      router.push(`/task/${props.data.id}`)
    }
    return {
      showTaskDetail
    }
  },
  components: { AppStatus }
}
</script>
