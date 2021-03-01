const assert = require('assert') //libreria nativa de node
const proxyquire = require('proxyquire')

const { MongoLibMock,getAllStub } = require('../utils/mocks/mongoLib')

const { moviesMock } = require('../utils/mocks/movies')

describe('Services - movies', function () {
    const MoviesServices = proxyquire('../services/movies',{
        '../lib/mongo' : MongoLibMock
    })

    const moviesService = new MoviesServices()

    describe('when getMovies method is called', async function(){
        it('should call the getAll MongoLib method', async function(){
            await moviesService.getMovies({})
            assert.strictEqual(getAllStub.called, true)
        })

        it('should return a array of movies', async function(){
            const result = await moviesService.getMovies({})
            assert.deepStrictEqual(result, moviesMock)
            //deepEqual porque compraremos un objeto con mas de un nivel
        })
    })
    
})