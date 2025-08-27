import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uiwzbtfeejzehmcttpxt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpd3pidGZlZWp6ZWhtY3R0cHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjk2NjMsImV4cCI6MjA2MzkwNTY2M30.L8MaOYp9tYhvXxb2VDPH4jKtrcPRvZReNu-Yr43q9Kk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)