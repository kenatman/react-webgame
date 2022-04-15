const path = require('path');

module.exports = {
    name: 'word-relay',
    mode: 'development', // 실서비스: 'production'
    devtool: 'eval',
    resolve: {
      extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'] // ['./client.jsx', './WordRelay.jsx'] -> client.jsx에서 WordRelay.jsx를 불러오므로 client.jsx만 쓰면 됨.
    }, // 입력
    output: {
        path: path.join(__dirname, 'dist'), // __dirname은 webpack.config.js 파일이 위치한 경로
        fileName: 'app.js'
    }, // 출력
}