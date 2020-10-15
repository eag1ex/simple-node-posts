`use strict`


module.exports = function (expressApp) {
    const {warn} = require('x-utils-es/umd')
    // const { isEmpty,unset } = require('lodash')
    return class ServerController {
        constructor(debug) {
            this.debug = debug
            this.serverCatchLastError = null

        }

        /**
         * (GET) REST/api
         * - posts page
         * `example: /posts` 
         * @param {*} req 
         * @param {*} res 
         */
        posts(req, res) {
            if (this.serverCatchLastError) {
               // warn()
                return res.status(500).json({ error: true, message:''});
            }
            let quote = req.query || {}

            return res.status(200).json({ success: true, code: 200 });
        }

    }

}