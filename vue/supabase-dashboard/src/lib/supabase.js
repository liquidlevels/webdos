import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zozembnlgjttksjdjstt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvemVtYm5sZ2p0dGtzamRqc3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NzM5NjUsImV4cCI6MjA2MTU0OTk2NX0.Z-PZVuX4N3r7FglZ72R4DxrGkGsNfLfnyKCYRkOWujg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)