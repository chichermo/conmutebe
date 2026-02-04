const axios = require('axios');

const generateRouteInsight = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    return 'IA mock: prioriza tren + bici para minimizar CO2.';
  }

  const { data } = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { timeout: 10000 },
  );

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'IA: recomendación no disponible.'
  );
};

module.exports = { generateRouteInsight };
