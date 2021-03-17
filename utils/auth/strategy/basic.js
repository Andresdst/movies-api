const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UsersServices = require('../../../services/users')

passport.use(new BasicStrategy(async function(email, password,cb){
    const usersServices = new UsersServices()

    try{
        const user = await usersServices.getUser({email})

        if(!user){
            return cb(boom.unauthorized(),false)
        }

        if(!(await bcrypt.compare(password,user.password))){
            return cb(boom.unauthorized(),false)

        }
        //apartir de aca se elimina password de usuario para no exponer data
        delete user.password
        return cb(null,user)

    } catch(error){
        return cb(error)
    }
}))