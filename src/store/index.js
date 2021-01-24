import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
    status: {
      active: 'Активен',
      done: 'Завершен',
      cancelled: 'Оменен',
      pending: 'Выполняется'
    }
  },
  mutations: {
    getTasks (state, data) {
      state.tasks = data
    }
  },
  actions: {
    async getTasks (context) {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_FIREBASE}tasks.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application-json'
          }
        })

        const dataResponse = await response.json()
        const data = Object.keys(dataResponse).map(key => {
          return {
            id: key,
            ...dataResponse[key]
          }
        })
        context.commit('getTasks', data)
      } catch (err) {
        console.error(err.message)
      }
    },
    async addNewTask (context, data) {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_FIREBASE}tasks.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application-json'
          },
          body: JSON.stringify(data)
        })
        console.log(response.json())
      } catch (err) {
        console.error(err.message)
      }
    },
    async updateStatus (context, payload) {
      const task = context.state.tasks.find(el => el.id === payload.taskId)
      task.status = payload.status
      try {
        const response = await fetch(`${process.env.VUE_APP_URL_FIREBASE}tasks.json/${payload.taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application-json'
          },
          body: JSON.stringify({ status: payload.status })
        })
        console.log(response.json())
      } catch (err) {
        console.error(err.message)
      }
    }
  },
  getters: {
    getTaskData: (state) => (id) => state.tasks.find(el => el.id === id),
    checkTaskId: (state) => (id) => state.tasks.map(el => el.id).includes(id),
    getCountActiveTasks (state) {
      let count = 0
      if (state.tasks.length > 0) {
        state.tasks.forEach((el) => {
          if (el.status === 'active') {
            count += 1
          }
        })
      }
      return count
    },
    getStatusTitle: (state) => (type) => {
      return state.status[type]
    }
  }
})
