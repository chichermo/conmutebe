const { withCors } = require('../_utils/response');
const { getSupabaseClient } = require('../_utils/supabase');

const seedChallenges = async (supabase) => {
  const { data } = await supabase.from('challenges').select('id').limit(1);
  if (data && data.length > 0) {
    return;
  }
  await supabase.from('challenges').insert([
    {
      title: 'Semana sin coche',
      description: 'Completa 3 rutas en bici o tren',
      points: 120,
      target: 3,
    },
    {
      title: 'Eco-lluvia',
      description: 'Viaja en transporte público con mal clima',
      points: 80,
      target: 2,
    },
  ]);
};

module.exports = withCors(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  const supabase = getSupabaseClient();
  await seedChallenges(supabase);
  const { data } = await supabase.from('challenges').select('*');

  const challenges = (data || []).map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    points: challenge.points,
    target: challenge.target,
    progress: 0,
    completed: false,
  }));

  return res.json(challenges);
});
