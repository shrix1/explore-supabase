import { createClient } from "@supabase/supabase-js"

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
export default createClient(url, anonKey)
