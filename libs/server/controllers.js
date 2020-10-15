`use strict`


module.exports = function (expressApp) {
    const {warn} = require('x-utils-es/umd')
    const DB = require('../db/api')()
    return class ServerController {
        constructor(opts={},debug) {
            this.debug = debug
            this.serverError = null
            this.db = null

            this.options = {
                //stylesPath:opts.stylesPath
                bootstrapPath:opts.bootstrapPath
            }
            // if(!this.options.stylesPath){
            //     warn('you options.stylesPath is missing')
            // }

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
                warn('/post',this.serverError)
                return res.status(500).json({ error: this.serverError});
            }
            let quote = req.query || {}
            return (async ()=>{
                let authors = []
                let authorsList = []
                let postsList = []
                let error = null

                try{
                    authors = await this.db.authorsDB()
                    postsList = await this.db.postsDB()
                }catch(err){
                    error = err
                }

                authorsList = authors.reduce((n, el) => {
                    let post = postsList.filter(nn => nn.author_id === el.id)[0]
                    if (post) {
                        n.push({
                            ...el,
                            title: post.title,
                            body: post.body,
                            image_url: post.image_url,
                            created_at: post.created_at
                        })
                    } else {
                        n.push({
                            ...n,
                            no_posts: true
                        })
                    }
                    return n
                },[])
                
                if(!authorsList.length){
                    error = 'no authors found'
                }
                res.render("posts/index", { 
                    pageTitle:'MAQUE Forms',
                    postName:'List of Authors',
                    error,
                    authorsList
                 });
               
            })()
            
        }


        /**
         * authors 
         {
            id: 1,
            name: "Jason Bourne",
            role: "Registered user",
            place: "New York",
            avatar_url: "https://api.adorable.io/avatars/250/jason-bourne"
            },
        */

            /** 
             * posts
             * {
                    id: 1,
                    author_id: 1,
                    title: "Let's see this awesome post!",
                    body: "I'm really glad to see this forums popular!",
                    image_url: "http://lorempixel.com/320/240?random1",
                    created_at: "2017-12-08 17:01:15"
                    },
            */

        /**
         * (GET) REST/api
         * - list all data from db, currently only authors
         * `example: /data` 
         */
        data(req, res){
            if (this.serverError) {
                 warn('/data',this.serverError)
                 return res.status(500).json({ error: this.serverError});
             }

             let quote = req.query || {}
             this.db.authorsDB().then(response=>res.status(200).json({ success: true, code: 200, response }),
                error=>res.status(400).json({ error, code: 400 }))
        }


    }

}