var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

/**
 * 参考http://blog.csdn.net/fungleo/article/details/54574049
 * @type {[type]}
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: 'http://192.168.40.133:8080'
})
