<template>
  <span :class="['badge', classBadge]">{{ statusTitle }}</span>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    status: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const statusTitle = computed(() => store.getters.getStatusTitle(props.status))
    const classBadge = computed(() => {
      return {
        primary: props.status === 'done' || props.status === 'active',
        danger: props.status === 'pending',
        warning: props.status === 'cancelled'
      }
    })

    return {
      statusTitle,
      classBadge
    }
  }
}
</script>
