import { questionnaires } from './questionnaires';
import { Assessment } from './supabase';

export interface ScoringResult {
  totalScore: number;
  severityLevel: string;
  color: string;
  feedback: {
    en: string;
    ms: string;
  };
  subscaleScores?: {
    depression?: number;
    anxiety?: number;
    stress?: number;
  };
  crisisFlagged: boolean;
  triggerReason?: string;
}

export function scoreAssessment(
  assessmentType: string,
  responses: number[]
): ScoringResult {
  const questionnaire = questionnaires[assessmentType];
  if (!questionnaire) {
    throw new Error('Invalid assessment type');
  }

  let crisisFlagged = false;
  let triggerReason = '';

  questionnaire.questions.forEach((question, index) => {
    if (question.crisisFlag && responses[index] > 0) {
      crisisFlagged = true;
      triggerReason = question.text.en;
    }
  });

  if (assessmentType === 'DASS21') {
    return scoreDASS21(responses, crisisFlagged, triggerReason);
  }

  const totalScore = responses.reduce((sum, val) => sum + val, 0);
  const range = questionnaire.scoring.ranges.find(
    r => totalScore >= r.min && totalScore <= r.max
  );

  if (!range) {
    throw new Error('Score out of range');
  }

  return {
    totalScore,
    severityLevel: range.level,
    color: range.color,
    feedback: range.feedback,
    crisisFlagged,
    triggerReason: crisisFlagged ? triggerReason : undefined
  };
}

function scoreDASS21(
  responses: number[],
  crisisFlagged: boolean,
  triggerReason: string
): ScoringResult {
  const depressionItems = [2, 4, 9, 12, 15, 16, 20];
  const anxietyItems = [1, 3, 6, 8, 14, 18, 19];
  const stressItems = [0, 5, 7, 10, 11, 13, 17];

  const depressionScore = depressionItems.reduce(
    (sum, i) => sum + responses[i],
    0
  ) * 2;
  const anxietyScore = anxietyItems.reduce(
    (sum, i) => sum + responses[i],
    0
  ) * 2;
  const stressScore = stressItems.reduce(
    (sum, i) => sum + responses[i],
    0
  ) * 2;

  const getDASSSeverity = (score: number, type: string) => {
    if (type === 'depression') {
      if (score <= 9) return 'normal';
      if (score <= 13) return 'mild';
      if (score <= 20) return 'moderate';
      if (score <= 27) return 'severe';
      return 'severe';
    } else if (type === 'anxiety') {
      if (score <= 7) return 'normal';
      if (score <= 9) return 'mild';
      if (score <= 14) return 'moderate';
      if (score <= 19) return 'severe';
      return 'severe';
    } else {
      if (score <= 14) return 'normal';
      if (score <= 18) return 'mild';
      if (score <= 25) return 'moderate';
      if (score <= 33) return 'severe';
      return 'severe';
    }
  };

  const depSeverity = getDASSSeverity(depressionScore, 'depression');
  const anxSeverity = getDASSSeverity(anxietyScore, 'anxiety');
  const strSeverity = getDASSSeverity(stressScore, 'stress');

  const maxScore = Math.max(depressionScore, anxietyScore, stressScore);
  let overallSeverity = 'normal';
  let color = 'green';

  if (maxScore > 33) {
    overallSeverity = 'severe';
    color = 'red';
  } else if (maxScore > 25) {
    overallSeverity = 'moderate';
    color = 'orange';
  } else if (maxScore > 14) {
    overallSeverity = 'mild';
    color = 'yellow';
  }

  return {
    totalScore: depressionScore + anxietyScore + stressScore,
    severityLevel: overallSeverity,
    color,
    feedback: {
      en: `Depression: ${depSeverity}, Anxiety: ${anxSeverity}, Stress: ${strSeverity}. Consider speaking with a mental health professional about your results.`,
      ms: `Kemurungan: ${depSeverity}, Kebimbangan: ${anxSeverity}, Tekanan: ${strSeverity}. Pertimbangkan untuk bercakap dengan profesional kesihatan mental tentang keputusan anda.`
    },
    subscaleScores: {
      depression: depressionScore,
      anxiety: anxietyScore,
      stress: stressScore
    },
    crisisFlagged,
    triggerReason: crisisFlagged ? triggerReason : undefined
  };
}

export function getSeverityColor(level: string): string {
  const colorMap: Record<string, string> = {
    minimal: 'text-green-600 dark:text-green-400',
    mild: 'text-yellow-600 dark:text-yellow-400',
    moderate: 'text-orange-600 dark:text-orange-400',
    moderatelySevere: 'text-red-600 dark:text-red-400',
    severe: 'text-red-600 dark:text-red-400',
    normal: 'text-green-600 dark:text-green-400',
    low: 'text-green-600 dark:text-green-400',
    high: 'text-red-600 dark:text-red-400',
    veryHigh: 'text-red-600 dark:text-red-400',
    poor: 'text-red-600 dark:text-red-400',
    good: 'text-green-600 dark:text-green-400'
  };
  return colorMap[level] || 'text-gray-600 dark:text-gray-400';
}

export function getRiskLevel(assessments: Assessment[]): {
  level: 'low' | 'medium' | 'high';
  color: string;
} {
  if (assessments.length === 0) {
    return { level: 'low', color: 'green' };
  }

  const recentAssessments = assessments.slice(0, 5);
  const crisisCount = recentAssessments.filter(a => a.crisis_flagged).length;
  const severeCount = recentAssessments.filter(a =>
    ['severe', 'moderatelySevere'].includes(a.severity_level)
  ).length;

  if (crisisCount > 0 || severeCount >= 2) {
    return { level: 'high', color: 'red' };
  } else if (severeCount === 1 || recentAssessments.some(a => a.severity_level === 'moderate')) {
    return { level: 'medium', color: 'yellow' };
  }

  return { level: 'low', color: 'green' };
}
