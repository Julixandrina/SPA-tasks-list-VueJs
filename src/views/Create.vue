<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1 class="main-text">Create Task</h1>
      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required>
          <label for="title">New task</label>
          <span class="helper-text" data-error="Data is required"></span>

          <div class="chips-tag" ref="chips"></div>
        </div>


        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2000</span>
          <input type="text" class="datepicker" ref="datepicker">
          <button class="btn waves-effect waves-light" type="submit" name="action">Add
            <i class="material-icons right">send</i>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Create',
  data: () => ({
        description: '',
        title: '',
        chips: null,
        date: null,

      }
  ),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
  },
  methods: {
    submitHandler() {
      let innerDescription = this.description.trim();
      if (innerDescription.length > 2000) {
        let checkedDescription = innerDescription.slice(0, 2000)
        innerDescription = checkedDescription
      }
      let task = {
        id: Date.now(),
        title: this.title,
        description: innerDescription,
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date,

      }
      this.$store.dispatch('createTask', task)
      this.$router.push('/List')

    }
  },
  //метод destroyed вызовется когда страница будет уничтожаться, чтобы не было утечки памяти
  //метод destroy() от materialize
  //так стоит делать со всеми плагинами
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroyed) {
      this.chips.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
input.datepicker {
  margin-bottom: 1rem;
}
</style>
