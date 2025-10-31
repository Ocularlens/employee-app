module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h',
};