const MongoLib = require('../lib/mongo')

class UserMovieService {
    constructor(){
        this.collection = 'user-movies'
        this.mongoDB = new MongoLib()
    }

    async getUserMovies({userId}){
        const query = userId && { userId }
        const userMovies = await this.mongoDB.getAll(this.collection, query)

        return userMovies || []
    }

    async createUserMovie({userMovie}){
        const userMovieCreatedId = this.mongoDB.create(this.collection, userMovie)

        return userMovieCreatedId
    }
    
    async deleteUserMovie({userMovieId}){
        const userMovieDeletedId = this.mongoDB.delete(this.collection, userMovieId)

        return userMovieDeletedId

    }
}

module.exports = UserMovieService