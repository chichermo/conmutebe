const { createClient } = require('@supabase/supabase-js');

const getSupabaseAdminClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son requeridos');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
};

const getSupabaseAnonClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL y SUPABASE_ANON_KEY son requeridos');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
};

module.exports = { getSupabaseAdminClient, getSupabaseAnonClient };
