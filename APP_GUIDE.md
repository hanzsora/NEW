# Mental Health Screening App - User Guide

## Overview
A comprehensive mental health screening application with validated clinical assessment tools.

## Features

### Clinical Assessment Tools
- **PHQ-9**: Depression screening (9 questions)
- **GAD-7**: Anxiety screening (7 questions)
- **DASS-21**: Depression, Anxiety & Stress scales (21 questions)
- **WHO-5**: Well-being index (5 questions)
- **K10**: Psychological distress scale (10 questions)

### Key Capabilities
- **Auto-scoring**: Automatic calculation and severity classification
- **Crisis Detection**: Identifies high-risk responses and displays emergency resources
- **Progress Tracking**: Historical view of all completed assessments
- **Risk Indicator**: Dashboard shows current risk level based on recent assessments
- **Secure Storage**: Encrypted data storage in Supabase database
- **Dark/Light Mode**: Toggle for comfortable viewing
- **Bilingual**: Full English/Malay language support

### Safety Features
- Crisis alert modal with Malaysian emergency hotlines
- Informed consent screen with clear disclaimers
- Audit trail for crisis flags
- Secure authentication

## How to Use

1. **Sign Up/Sign In**: Create account or log in
2. **Accept Consent**: Read and agree to terms
3. **Take Assessment**: Choose assessment type and complete questions
4. **View Results**: See score, severity level, and personalized feedback
5. **Track Progress**: View history on dashboard
6. **Crisis Support**: If high-risk detected, emergency resources displayed

## Technical Stack
- React + TypeScript
- Supabase (Database + Auth)
- Tailwind CSS
- Lucide Icons
- Row Level Security (RLS) enabled for all tables

## Database Tables
- `profiles`: User settings and preferences
- `assessments`: Completed assessment records
- `crisis_logs`: Audit trail for crisis detections

## Privacy & Security
- Minimal data collection
- Encrypted at rest
- Row Level Security policies
- Users control their own data
- Can delete assessments anytime

## Emergency Resources
- Emergency: 999
- Befrienders Malaysia: 03-76272929
- Talian Kasih: 15999

---
**Disclaimer**: This is a screening tool only, not a diagnostic tool. Always consult with qualified mental health professionals.
