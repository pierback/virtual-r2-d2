//@ts-check
module.exports = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3200,
    base_url: process.env.BASE_URL || 'http://localhost'
};