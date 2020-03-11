const express = require('express')
const app = express()
const sequelize = require('sequelize')
const { STRING, UUID, UUIDV4 } = sequelize

const conn = new sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-user-dep')

const User = conn.define('user', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }
})

const Department = conn.define('department', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    }
})

User.belongsTo(Department)

const sync = async () => {
    await conn.sync({ force: true })
    const users = [
        {name: 'Moe'},
        {name: 'Larry'},
        {name: 'Curly'}
    ]
    const departments = [
        {name: 'HR'},
        {name: 'Marketing'},
        {name: 'Development'}
    ]

    const [ moe, larry, curly ] = await Promise.all(users.map( user => User.create(user)))
    const [ hr, marketing, development ] = await Promise.all(departments.map( depart => Department.create(depart)))

    return { users: [ moe, larry, curly ], departments: [ hr, marketing, development ] }
}

module.exports = {
    sync,
    models: {
        User,
        Department
    }
}
