const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXPIRATION } = require('../config/auth.config');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== 'admin' && password !== 'password') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    return res.status(200).json({
      message: 'Login successful',
      token
    });
    
  } catch (error) {
    throw error;
  }
}

module.exports = { login };