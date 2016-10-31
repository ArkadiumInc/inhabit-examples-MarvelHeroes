/**
 * Created by WMTS on 10/20/2016.
 */
const inhabitcfg = require('./inhabitcfg.json');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = {
    entry: 'marvelHeroesModule',
    output: { filename: inhabitcfg.main },
    module: {
        loaders: [
            { test: /\.hbs$/,  loader: 'raw' },
            { test: /\.txt$/,  loader: 'raw' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.less$/, loader: 'raw!less' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/resources', to: 'build/resources' }
        ])
    ],
    resolve: {
        extensions: [ '', '.js', '.json', '.hbs', '.txt', '.less' ],
        modulesDirectories: [  'src/scripts', 'src', 'node_modules' ]
    },
    devtool: 'cheap-source-map'
};
