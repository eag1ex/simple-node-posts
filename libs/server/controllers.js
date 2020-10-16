
module.exports = function (expressApp) {
    const { warn } = require('x-utils-es/umd')
    const DB = require('../db/api')()
    const moment = require('moment')
    return class ServerController {
        constructor(opts = {}, debug) {
            this.debug = debug
            this.serverError = null
            this.db = null

            try {
                this.db = new DB({})
            } catch (err) {
                this.serverError = err
            }
        }

        /**
         * (GET) REST/api
         * - posts page
         * `example: /posts` 
         */
        posts(req, res) {
            if (this.serverError) {
                warn('/post', this.serverError)
                return res.status(500).json({ error: this.serverError })
            }

            return (async () => {
                let authors = []
                let postsList = []
                let error = null

                try {
                    authors = await this.db.authorsDB()
                    postsList = await this.db.postsDB()
                } catch (err) {
                    error = err
                }

                postsList = postsList.reduce((n, el) => {
                    let author = authors.filter(nn => nn.id === el.author_id)[0]
                    if (author) {
                        n.push({
                            ...el,
                            niceDate: moment(el.created_at, "YYYYMMDD").fromNow(),
                            name: author.name,
                            role: author.role,
                            place: author.place,
                            avatar_url: author.avatar_url
                        })
                    } else {
                        n.push({
                            ...n,
                            no_author: true
                        })
                    }
                    return n
                }, [])
                
                if (!postsList.length) error = 'no posts found'
                res.render("posts/index", { 
                    pageTitle: 'MAQUE Forms',
                    postName: 'List of Authors',
                    error,
                    postsList
                })
               
            })()
            
        }
    }
}