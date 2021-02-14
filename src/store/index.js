import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //при заборе tasks из localStorage мы должны проверить истёк ли срок задачи и поменять статус
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
            if (new Date(task.date) < new Date()) {
                task.status = 'outdated'
            }
            return task //и только после проверки вернуть всю задачу целиком
        })
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        updateTask(state, {id, description, date}) {
            state.tasks.description = description

            const tasks = state.tasks.concat()
            const index = tasks.findIndex(t => t.id === id)
            const task = tasks[index]

            //делаем проверку для контроля статуса задачи во время update
            const status = new Date(date) >= new Date() ? 'active' : 'outdated'
            tasks[index] = {...task, date, description, status}

            state.tasks = tasks
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
            //обязательно записываем все измменения в localstorage

        },
        completeTask(state, id) {
            let index = state.tasks.findIndex(t => t.id === id)
            state.tasks[index].status = 'completed'
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteTask(state, id) {
            let index = state.tasks.findIndex(t => t.id === id)
            state.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteCompleted(state) {
            let tasks = state.tasks.concat()
            tasks = tasks.filter(function (task) {
                return task.status !== 'completed';
            })
            state.tasks = tasks
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteOutdated(state) {
            let tasks = state.tasks.concat()
            tasks = tasks.filter(function (task) {
                return task.status !== 'outdated';
            })
            state.tasks = tasks
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        //в данном случае экшены не оправданы, т.к. мы просто меняем стэйт,
        // но для выполнения асинхронного кода это
        //необходимый сценарий
        createTask({commit}, task) {
            commit('createTask', task)
        },
        updateTask({commit}, task) {
            commit('updateTask', task)
        },
        completeTask({commit}, id) {
            commit('completeTask', id)
        },
        deleteTask({commit}, id) {
            commit('deleteTask', id)
        },
        deleteCompleted({commit}) {
            commit('deleteCompleted')
        },
        deleteOutdated({commit}) {
            commit('deleteOutdated')
        },

    },
    getters: { //getters -  вычисляемые свойства хранилища.
        tasks: s => s.tasks, //это функия, где мы получаем state и возвращаем поле tasks(в данном случае)
        // в state
        taskById: state => id => state.tasks.find(t => t.id === id)

    },
    modules: {}
})
