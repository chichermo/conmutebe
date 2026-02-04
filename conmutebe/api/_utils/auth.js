const { getSupabaseAnonClient } = require('./supabase');

const requireAuth = async (req) => {
  const header = req.headers.authorization;
  if (!header) {
    const error = new Error('Token requerido');
    error.status = 401;
    throw error;
  }
  const token = header.replace('Bearer ', '');
  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    const authError = new Error('Token inválido');
    authError.status = 401;
    throw authError;
  }
  return data.user.id;
};

module.exports = { requireAuth };
