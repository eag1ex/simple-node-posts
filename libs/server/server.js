`use strict`

module.exports = (DEBUG = true) => {
    const { listRoutes } = require('../utils')
    const config = require('../../config');
    const path = require('path')
    const {log} = require('x-utils-es/umd')

    const express = require('express')
    const app = express()
    const router = express.Router();
    const morgan = require('morgan')
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const ejs = require('ejs');

    app.set('trust proxy', 1); // trust first proxy
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    const ServerAuth = require('./serverAuth')(app)
    const ServerCtrs = require('./controllers')(app)

    // for rendering html
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');
    app.set('views', path.join(config.publicPath, '/app'))
    //app.use('/src/libs/img/',express.static(path.join(__dirname, 'views/app/src/libs/img')))


    //////////////////////
    // Initialize auth controllers
    new ServerAuth(DEBUG).AppUseAuth()

    // Initialize app controllers
    const controllers = new ServerCtrs(DEBUG)

    /////////////////////
    // set server routes
    router.get('/posts', controllers.posts.bind(controllers));

    // catch all other calls
    router.all("*", function (req, res) {
        return res.status(200).json({ success: true, message: 'works fine', url: req.url, available_routes: listRoutes(router.stack), status: 200 });
    })

    /////////////////////
    // handle errors
    app.use(function (error, req, res, next) {
        res.status(500).json({ error: error.toString(), message: "critical server error" })
    });
    app.use('/', router);

    /////////////////////
    // start server

    var server = app.listen(config.port, function () {
        var host = (server.address().address || "").replace(/::/, 'localhost')
        var port = server.address().port;
        log(`server runnign on http://${host}:${port}`)
    })
    return server
}

