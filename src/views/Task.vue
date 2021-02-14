<template>
  <div class="row">
    <!--v-if="task" таким способом мы проверяем существует ли такой таск и если нет выводим другой контент -->
    <div v-if="task" class="col s6 offset-s3">

      <form v-on:submit.prevent="updateTask">
        <h2 class="title-task">{{ task.title }}</h2>
        <div class="chips-tag" ref="chips"></div>
        <div>
          <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea">'f'</textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2000</span>
            <input type="text" class="datepicker" ref="datepicker">
            <div class="btn-container">
              <button v-if="task.status === 'active'" class="btn waves-effect waves-light" type="submit">Update</button>
              <button v-if="task.status === 'active'" type="button" class="btn blue" @click="completeTask">Complete</button>
              <button type="button" class="btn deep-orange darken-4" @click="deleteTask">Delete</button>
            </div>
          </div>
        </div>

      </form>
    </div>
    <p v-else>Task not found</p>
  </div>
</template>

<script>


// @ is an alias to /src


export default {
  name: 'Task',
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id)
      // конвертируем строку к числу, чтобы не было ошибки типизации
      //так как this.$route.params.id изначально string
    },
  },
  data: () => ({
        description: '',
        chips: null,
        date: null,

      }
  ),
  mounted() {
    this.description = this.task.description
    //chips иницилизируем с теми данными, что есть у конкретной задачи
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.tags//поле data с официальной документации
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    })
    setTimeout(() => {
          M.updateTextFields() //для исправления бага налипания description
        }, 0
    )
  },
  methods: {
    updateTask() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      })
      /*this.$store.commit('updateTask', {
        id: this.task.id,
        description: this.task.description,
        date: this.date.date,
      })*/
      this.$router.push('/List')
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$router.push('/List')
    },
    deleteTask() {
      this.$store.dispatch('deleteTask', this.task.id)
      this.$router.push('/List')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {

}
</style>
