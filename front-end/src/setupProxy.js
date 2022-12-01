const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
			// needs to be upload-service:8080 to work within docker
			// needs to be localhost:8080 when using IntelliJ Idea debugger
			// needs to be localhost:82 when upload-service is running in docker
            target: 'http://localhost:8080/',
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
