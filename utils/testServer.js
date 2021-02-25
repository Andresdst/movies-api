//archivo que levanta servidor paralelo para pruebas

const express = require('express')
const superTest = require('supertest')



function testServer(route){
    const app = express()
    app.use(express.json())
    route(app)
    return superTest(app)

}

module.exports = testServer