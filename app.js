const express = require('express')
const app = express()
const db = require('./db')
const path = require('path');
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

app.post('/api/users', async(req, res, next) =>{
    const users = await User.create(req.body)
    res.status(201).send(users)
})

app.post('/api/departments', async(req, res, next) =>{
    const departments = await Department.findAll()
    res.status(201).send(departments)
})

app.delete('/api/users/:id', async(req, res, next) =>{
    const userPk = await User.findByPk(req.param.id)
    userPk.destroy()
    res.sendStatus(204)
    .catch(next)
})

app.delete('/api/departments/:id', async(req, res, next) =>{
    const depPk = await Department.findByPk(req.param.id)
    depPk.destroy()
    res.sendStatus(204)
    .catch(next)
})

app.put('/api/users', async(req, res, next) =>{
   const userPk = await User.findByPk(req.param.id)
   userPk.update(req.body)
   res.send(userPk)
   .catch(next)
})

app.put('/api/departments', async(req, res, next) =>{
    const depPk = await Department.findByPk(req.param.id)
    depPk.update(req.body)
    res.send(depPk)
    .catch(next)
})

app.use((err, res, next) => {
    res.status(500).send({message: err.message})
})

module.exports = app;