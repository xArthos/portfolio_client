module.exports = {
  serverRuntimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'myFutureSecretKey'
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
};