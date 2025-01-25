const webpackMerge = require('webpack-merge').merge;
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    devServer: {
        proxy: [
            {
                context: [
                    '/app/rest'
                ],
                target: `http://localhost:9085`,
                secure: false,
            },
            {
                context: [
                    '/api/flowable'
                ],
                target: 'http://localhost:9085',
                ws: true
            },
            {
                context: [
                    '/pdf'
                ],
                target: 'https://files.form.io',
            }
        ],
        historyApiFallback: true,
    },
    mode: 'development'
});
