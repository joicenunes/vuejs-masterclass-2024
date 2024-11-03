import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";

export const taskWithProjectQuery = supabase.from('tasks').select(`
  *,
  projects (id, name, slug)
`)

export type TaskWithProject = QueryData<typeof taskWithProjectQuery>

export const projectsQuery = supabase.from('projects').select()

export type Project = QueryData<typeof projectsQuery>