const express = require('express')
const app = express()
const db = require('./db')
const sequelize = require('sequelize')
app.use(require('cors')());
const { User , Department } = db.models

app.use(express.json())

app.get('/api/users', async(req, res, next) =>{
    const users = await User.findAll()
    res.send(users)
})

app.get('/api/departments', async(req, res, next) =>{
    const departments = await Department.findAll()
    res.send(departments)
})

app.put('/api/users/:id', async(req, res, next) =>{
    User.findByPk(req.param.id)
      .then(user=>{
        return user.update(req.body)
      })
      .then(user=> res.send(user))
      .catch(next)
})

app.put('/api/departments/:id', async(req, res, next) =>{
    Department.findByPk(req.param.id)
      .then(department=>{
        return department.update(req.body)
      })
      .then(department=> res.send(department))
      .catch(next)
})

app.post('/api/users', async(req, res, next) =>{
    const users = await User.create(req.body)
    res.status(201).send(users)
})

app.post('/api/departments', async(req, res, next) =>{
    const departments = await Department.create(req.body)
    res.status(201).send(departments)
})

app.delete('/api/users/:id', async(req, res, next) =>{
    User.findByPk(req.param.id)
      .then(user=>{
        return user.destroy()
      })
      .then(()=> res.sendStatus(204))
      .catch(next)
})

app.delete('/api/departments/:id', async(req, res, next) =>{
    Department.findByPk(req.param.id)
      .then(department=>{
        return department.destroy()
      })
      .then(()=> res.sendStatus(204))
      .catch(next)
})

app.use((err, res, next) => {
    res.status(500).send({message: err.message})
})

module.exports = app;