//archivo de pruebas

const assert = require('assert')
const proxyquire = require('proxyquire')
//impoertando dependencias de pruebas
const {moviesMock,MoviesServicesMock} = require('../utils/mocks/movies.js')
const testServer = require('../utils/testServer')


describe('routes - movies', function(){
    //al utilizar las rutas que proxyquire intercepte y sustituya el servicio por la clase de pruebas
    const route = proxyquire('../routes/movies.js',{
        '../services/movies': MoviesServicesMock
        })

    const request = testServer(route)
    describe('GET /movies', function(){
        it('should respond with status 200',function(done){
            request.get('/api/movies').expect(200,done)
        })

        it('should respond with status 200',function(done){
            request.get('/api/movies').end((err,res)=>{
                assert.deepStrictEqual(res.body,{
                    data: moviesMock,
                    message: "movies listed"
                })
                done()
            })
        })
    })
})