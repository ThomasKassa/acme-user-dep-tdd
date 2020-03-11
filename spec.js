const { expect } = require('chai')
const db = require('./db')
const { User, Department } = db.models

describe('acme user department API', () => {
    let seed
    beforeEach(async() => seed = await db.sync())
    describe('do we have users', () => {
        it('has three users', () => {
            expect(seed.users.length).to.equal(3)
        })
        it('has a user named Moe', () => {
            const names = seed.users.map( user => user.name)
            console.log(names)
            expect(seed.users[0].name).to.equal('Moe')
        })
    })
    describe('do we have departments', () => {
        it('has three departments', () => {
            expect(seed.departments.length).to.equal(3)
        })
        it('has a dept named HR', () => {
            expect(seed.departments[0].name).to.equal('HR')
        })
    })
})
