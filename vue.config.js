module.exports = {
    devServer: {
        port: 9527,//端口号如果被占用会提升加以=1
        host: "localhost",
        https: false,
        open: true,//
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL,
                changOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }

    },
    lintOnSave: false,
    productionSourceMap: false


}