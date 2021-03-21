const boom = require('@hapi/boom')

function scopesValidationHandler(allowedScopes) {
    return function(req,res,next) {
        if(!req.user || (req.user && !req.user.scopes)) {
            next(boom.unauthorized('Missing scopes'))
        }

        const hasAccess = allowedScopes
        .map(allowebscope => req.user.scopes.includes(allowebscope))//no usar llaves para return explicito
        .find(allowed =>Boolean(allowed))

        if(hasAccess) {
            next()
        } else {
            next(boom.unauthorized('insufficient scopes'))
        }
    }
}

module.exports = scopesValidationHandler