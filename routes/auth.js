const express = require('express')
const passport= require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const ApiKeysService = require('../services/apiKeys')

const {config} = require('../config/index')

//uso de basic strategy
require('../utils/auth/strategy/basic')

function authApi(app){
    const router = express.Router()

    app.use('/api/auth',router)

    const apiKeysService = new ApiKeysService()

    router.post('/sign-in', async function(req,res,next){
        const {apiKeyToken} = req.body

        if(!apiKeyToken){
            next(boom.unauthorized('Token Requerido'))
        }

        passport.authenticate('basic', function(error, user) {//devuelve token firmado
            try{
                if(error || !user){
                    next(boom.unauthorized())
                }

                req.login(user, {session : false}, async function(error){
                    if(error) {
                        next(error)
                    }
                    const apiKey = await apiKeysService.getApiKey({token:apiKeyToken})
                    //console.log(apiKeyToken)

                    if(!apiKey){
                        next(boom.unauthorized())
                    }

                    const {_id : id,name,email} = user

                    const payload = {
                        sub:id,
                        name,
                        email,
                        scopes: apiKey.scopes
                    }

                    const token = jwt.sign(payload,config.authJwtSecret,{
                        expiresIn: '15m'
                    })

                    return res.status(200).json({token,user:{id, name, email}})
                })

            } catch(err){
                next(err)
            }
        })(req,res,next) //closure ya que es un custom callback
    })
}

module.exports = authApi