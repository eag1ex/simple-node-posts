module.exports = () => {
    const { dataAsync } = require('../utils')
    
    /** 
     * @DB database mock
    */
    return class DB {
        constructor(opts = {}) {
            
            /** 
             * NOTE images from `http://lorempixel.com`  no longer work
             * - Replaced {avatar_url} and {image_url} with alternative `https://placeimg.com/`
            */

            this.dataPath = {
                authors: opts.authors || `./json/authors.db.json`,
                posts: opts.posts || `./json/posts.db.json`
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
