import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  display_name: string | null;
  language_preference: 'en' | 'ms';
  theme_preference: 'light' | 'dark';
  consent_given: boolean;
  consent_date: string | null;
  created_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  assessment_type: 'PHQ9' | 'GAD7' | 'DASS21' | 'WHO5' | 'K10';
  responses: number[];
  total_score: number;
  severity_level: string;
  subscale_scores?: {
    depression?: number;
    anxiety?: number;
    stress?: number;
  };
  crisis_flagged: boolean;
  completed_at: string;
  created_at: string;
}

export interface CrisisLog {
  id: string;
  user_id: string;
  assessment_id: string;
  trigger_reason: string;
  acknowledged: boolean;
  created_at: string;
}
