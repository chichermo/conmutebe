const allowCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }
  return true;
};

const withCors = (handler) => async (req, res) => {
  if (!allowCors(req, res)) {
    return;
  }
  return handler(req, res);
};

module.exports = { withCors };
