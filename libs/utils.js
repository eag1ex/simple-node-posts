const { reduce } = require('lodash')

exports.listRoutes = (stack) => {
    return reduce(stack, (n, el, k) => {
        if (el.route) {
            if (((el.route || {}).path || '').indexOf('/') !== -1) {
                n.push({ route: el.route.path })
            }
        }
        return n
    }, [])
}

exports.dataAsync = (data) => {
    return new Promise((resolve) => resolve(data))
}