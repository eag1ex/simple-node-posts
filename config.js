const port = process.env.PORT || (process.argv[2] || 5000);
const path = require('path')
module.exports = {
    publicPath: path.join(__dirname,'./views'),
    port: (typeof port === "number") ? port : 5000
};
