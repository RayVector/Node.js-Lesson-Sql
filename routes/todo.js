const { Router } = require('express')
const router = Router()
const Todo = require('../models/todo')

// get tasks
router.get('/', async (req, res) => {
  try {
    const todoList = await Todo.findAll()
    res.status(200).json({ todoList })
  } catch (e) {
    res.status(500).json({
      message: 'Server error',
    })
  }
})

// create task
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    })

    res.status(201).json({ todo })
  } catch (e) {
    res.status(500).json({
      message: 'Server error',
    })
  }
})

// update task
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(+req.params.id)
    todo.done = req.body.done
    await todo.save()
    res.status(200).json({ todo })
  } catch (e) {
    res.status(500).json({
      message: 'Server error',
    })
  }
})

// delete task
router.delete('/:id', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id,
      },
    })
    const todo = todos[0]
    await todo.destroy()
    res.status(204).json({})
  } catch (e) {
    res.status(500).json({
      message: 'Server error',
    })
  }
})

module.exports = router