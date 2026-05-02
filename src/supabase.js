import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://czjusqrghrmhtxamlbhk.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6anVzcXJnaHJtaHR4YW1sYmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTIzNTQsImV4cCI6MjA5MzE4ODM1NH0.Jmoy4Xzd2me55I6dQIEMv2DKDfGvxf99aA_pX0GuBtM"

export const supabase = createClient(supabaseUrl, supabaseKey)