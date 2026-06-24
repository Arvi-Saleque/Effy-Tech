require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

(async () => {
  try {
    const res1 = await supabase.from('project_tasks').select('id').limit(1);
    console.log('project_tasks exists:', !res1.error);
    if (res1.error) console.log(res1.error.message);
    
    const res2 = await supabase.from('work_assignments').select('id').limit(1);
    console.log('work_assignments exists:', !res2.error);
    if (res2.error) console.log(res2.error.message);
    
    if (!res2.error) {
       const r = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/', { headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY }});
       const schema = await r.json();
       const wa = schema.definitions && schema.definitions.work_assignments;
       console.log('work_assignments definition:', JSON.stringify(wa, null, 2));
    }
  } catch(e) {
    console.error(e);
  }
})();
