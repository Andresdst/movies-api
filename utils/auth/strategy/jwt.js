const passport = require('passport')
const {Strategy,ExtractJwt} = require('passport-jwt')
const boom = require('@hapi/boom')

const {config} = require('../../../config/index')
const UsersServices = require('../../../services/users')

passport.use( new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
async function(tokenPayload,cb){
    const userServices = new UsersServices()

    try{
        const user = await userServices.getUser({email: tokenPayload.email})

        if(!user){
            return cb(boom.unauthorized(),false)
        }

        delete user.password

        cb(null, {...user,scopes: tokenPayload.scopes})
    } catch(err) {
        return cb(err)
    }
}
))