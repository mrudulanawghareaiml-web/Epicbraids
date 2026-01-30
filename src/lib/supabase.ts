import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.https://cmhypugbgxhzoeqgwrwn.supabase.co;
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaHlwdWdiZ3hoem9lcWd3cnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NTg1NDMsImV4cCI6MjA4NTMzNDU0M30.RYVXyy-kCokjdnIVGSGb4ezC4nIlKtmA_BBeRZGlR-U;

export const supabase = createClient(supabaseUrl, supabaseKey);
