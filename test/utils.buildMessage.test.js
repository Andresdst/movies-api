//ejemplo de TDD test driven development. crear primero las pruebas y luego la resolvemos

const assert = require('assert')
const buildMessage = require('../utils/schemas/buildMessage')

//only para correr solo este test
describe.only('utils - buildMessage', function() {
    describe('when recives an entity and an action', function(){
        it('should return the respective message', function() {
            const result = buildMessage('movie', 'create')

            assert.strictEqual(result, 'movie created')
        })
    })

    describe('when recives an entity and an action is a list', function(){
        it('should return the respective message with the entity in plural', function() {
            const result = buildMessage('movie', 'list')

            assert.strictEqual(result, 'movies listed')
        })
    })
})