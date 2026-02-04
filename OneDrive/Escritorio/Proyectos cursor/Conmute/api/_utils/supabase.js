const { createClient } = require('@supabase/supabase-js');

const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL y key son requeridos');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
};

module.exports = { getSupabaseClient };
