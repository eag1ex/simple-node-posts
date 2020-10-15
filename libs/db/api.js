`use strict`
/** 
 * @DB database mock
*/
module.exports = () => {
    const { dataAsync } = require('../utils')
    return class DB {
        constructor(opts = {}) {
            
            this.dataPath = {
                authors: opts.authors || `./authors.db.json`,
                posts: opts.posts || `./posts.db.json`
            }
        }

        authorsDB() {
            try {
                return dataAsync(require(this.dataPath.authors))
                    .then((data) => data)
            } catch (err) {
                return Promise.reject('dataPath for DB.authors.db not found')
            }
        }

        postsDB() {
            try {
                return dataAsync(require(this.dataPath.posts))
                    .then((data) => data)
            } catch (err) {
                return Promise.reject('dataPath for DB.posts.db not found')
            }
        }
        

    }
}