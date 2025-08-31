import {supabase} from "../../utils/supabaseClient"

export async function getAllBlogs() {
  return supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function getBlogById(id: string) {
  return supabase.from('blogs').select('*').eq('id', id).single();
}
