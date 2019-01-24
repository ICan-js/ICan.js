const path = require('path');

module.exports = {
    entry: {
        icjs: './src/BeMyArms.js'
    },
    output: {
        library: 'BeMyArms',
        filename: 'bemyarms.js',
        path: path.resolve(__dirname, 'dist')
    }
}
