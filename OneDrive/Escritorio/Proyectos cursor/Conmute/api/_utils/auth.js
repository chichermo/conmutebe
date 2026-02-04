const jwt = require('jsonwebtoken');

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d',
  });

const requireAuth = (req) => {
  const header = req.headers.authorization;
  if (!header) {
    const error = new Error('Token requerido');
    error.status = 401;
    throw error;
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return decoded.userId;
  } catch (error) {
    const authError = new Error('Token inválido');
    authError.status = 401;
    throw authError;
  }
};

module.exports = { signToken, requireAuth };
