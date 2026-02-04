const { withCors } = require('./_utils/response');

module.exports = withCors(async (_req, res) => {
  res.json({ status: 'ok' });
});
