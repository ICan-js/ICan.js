const path = require('path');

module.exports = {
    entry: {
        icjs: './src/index.js'
    },
    output: {
        library: 'icjs',
        filename: 'icjs.js',
        path: path.resolve(__dirname, 'dist')
    }
}
