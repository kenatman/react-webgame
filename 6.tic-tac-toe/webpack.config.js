const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'tic-tac-toe',
    mode: 'development', // 실서비스: 'production'
    devtool: 'eval',
    resolve: {
      extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'] // ['./client.jsx', './ResponseCheck.jsx'] -> client.jsx에서 WordRelay.jsx를 불러오므로 client.jsx만 쓰면 됨.
    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'), // __dirname은 webpack.config.js 파일이 위치한 경로
        filename: 'app.js',
        publicPath: '/dist/' // app.use('/dist', express.static(__dirname, 'dist')) 와 비슷 // publicPath란 webpack-dev-server가 사용하는 결과물간의 상대가상경로라고 생각하면 됨.
    }, // 출력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'] // browserslist
                        },
                        debug: true
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            }
        }]
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    devServer: {
        devMiddleware: { publicPath: '/dist/' },
        static: { directory: path.resolve(__dirname) }, // html위치
        hot: true
    }
}