new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: [],
    }
  },
  created() {
    fetch('/api/todo', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => this.todos = res.todoList)
      .catch(e => console.log(e))
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }
      fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
        .then(res => res.json())
        .then(({ todo }) => {
          console.log(todo)
          this.todos.push(todo)
          this.todoTitle = ''
        })
        .catch(e => console.log(e))
    },
    completeTask(isChecked, id) {
      fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: isChecked }),
      })
        .then(res => res.json())
        .then(({ todo }) => {
          let currentTodoIndex = this.todos.findIndex(currentTodo => currentTodo.id === todo.id)
          Object.assign(this.todos[currentTodoIndex], todo)
        })
        .catch(e => console.log(e))
    },
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
      fetch(`/api/todo/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .catch(e => console.log(e))
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }

      if (withTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    },
  },
})