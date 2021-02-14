<template>
  <div>
    <h2 class="text-list">List Tasks</h2>
    <div class="row search-content">
      <div class="input-field col s6" v-if="tasks.length">
        <!-- ref="select" для иницилизации плагина -->
        <form>
          <select ref="select"
                  id="select-form"
                  v-model="filter">
            <option value="" disabled selected>Choose your option</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="outdated">Outdated</option>
          </select>
          <label>Status filter</label>
          <div class="btn-container">
            <button v-show="filter" type="reset" class="btn btn-small  cyan darken-3" v-model="filter" @click="clearFilter">Clear filter</button>
            <button v-show="filter === 'completed'" type="reset" class="btn btn-small teal darken-1" v-model="filter" @click="deleteCompleted">
              Delete completed</button>
            <button v-show="filter === 'outdated'" type="reset" class="btn btn-small  blue-grey darken-1" v-model="filter" @click="deleteOutdated">
              Delete outdated</button>

          </div>
        </form>
      </div>
    </div>

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="(task, index) in filteredTasks"
        :key="task.id"
        >
    <td>{{index + 1}}</td>
        <td>{{task.title}}</td>
        <td>{{new Date(task.date).toLocaleDateString()}}</td>
        <td class="td-container"><div class="description-text">{{task.description}}</div></td>
        <td><span class="new badge" :data-badge-caption="task.status"></span></td>
        <td>
          <router-link
          tag="button"
          class="btn btn-small"
          :to="'/task/' + task.id"
          >Open</router-link>
        </td>
        
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="row">
        <div class="col s12 m5">
          <div class="card-panel teal">
        <span class="white-text"><h4>No tasks</h4></span>
            <div class="card-action">
              <router-link
                  tag="div"
                  to="/"
              ><a href="#" class="create-link">Create task</a></router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'List',
  data() {
    return {
      filter: null,//изначально фильт никак не влияет на отображение
}
  },
  mounted() {
   this.select = M.FormSelect.init(this.$refs.select)
  },
  //чтобы использовать состояние хранилища в компонентах Vue
  // возвращаем часть состояния хранилища в вычисляемом свойстве
  //т.е из state получаем tasks
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    filteredTasks() {
      return this.tasks.filter(t => {
        if (!this.filter) {
          return true
        }
        return t.status === this.filter
      })

    },
    /*filteredTodos() {
      if (this.filter === 'all') {
        return this.tasks
      }
      if (this.filter === 'completed') {
        return this.tasks.filter(t => t.status === 'completed');
      }
      if (this.filter === 'active') {
        return this.tasks.filter(t => t.status === 'active');
      }
      if (this.filter === 'outdated') {
        return this.tasks.filter(t => t.status === 'outdated');
      }
    },*/
  /*  active: function () {
      return this.tasks.filter(function (task) {
        return task.status === 'active';
      });
    },
    completed: function () {
      return this.tasks.filter(function (task) {
        return task.status === 'complete';
      });
    }*/
  },
  methods: {
    clearFilter() {
      this.filter = null
    },
    deleteCompleted() {
      this.$store.dispatch('deleteCompleted')
    },
    deleteOutdated() {
      this.$store.dispatch('deleteOutdated')
    }
  }
}
</script>

<style lang="scss" scoped>
.td-container{
  max-width: 400px;
}
.description-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
