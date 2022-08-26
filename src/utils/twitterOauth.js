import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    "https://dnffshfslpeapqoazexf.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZmZzaGZzbHBlYXBxb2F6ZXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE1MjU3MDgsImV4cCI6MTk3NzEwMTcwOH0.ZoY18UwK82E-qPaMf8j-Of52chLB9R2NHXnaZjH0liQ"
)

export { supabase }
