import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { questionnaires } from '../lib/questionnaires';
import { scoreAssessment } from '../lib/scoring';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CrisisModal } from './CrisisModal';

interface AssessmentTakeProps {
  assessmentType: string;
  onComplete: () => void;
  onBack: () => void;
}

export function AssessmentTake({ assessmentType, onComplete, onBack }: AssessmentTakeProps) {
  const { t, language } = useLanguage();
  const questionnaire = questionnaires[assessmentType];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>(Array(questionnaire.questions.length).fill(-1));
  const [submitting, setSubmitting] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [crisisAssessmentId, setCrisisAssessmentId] = useState('');
  const [crisisTrigger, setCrisisTrigger] = useState('');

  const handleResponse = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  const canGoNext = responses[currentQuestion] !== -1;
  const isLastQuestion = currentQuestion === questionnaire.questions.length - 1;

  const handleNext = () => {
    if (canGoNext && !isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext) return;

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const result = scoreAssessment(assessmentType, responses);

      const { data: assessment, error } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          assessment_type: assessmentType,
          responses: responses,
          total_score: result.totalScore,
          severity_level: result.severityLevel,
          subscale_scores: result.subscaleScores,
          crisis_flagged: result.crisisFlagged
        })
        .select()
        .single();

      if (error) throw error;

      if (result.crisisFlagged && assessment) {
        setCrisisAssessmentId(assessment.id);
        setCrisisTrigger(result.triggerReason || '');
        setShowCrisis(true);
      } else {
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const question = questionnaire.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questionnaire.questions.length) * 100;

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {questionnaire.name[language]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {questionnaire.instruction[language]}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                {t('assessments.question')} {currentQuestion + 1} {t('assessments.of')} {questionnaire.questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {question.text[language]}
            </h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    responses[currentQuestion] === option.value
                      ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      responses[currentQuestion] === option.value
                        ? 'border-teal-600 bg-teal-600'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {responses[currentQuestion] === option.value && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">
                      {option.label[language]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('assessments.previous')}
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!canGoNext || submitting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? t('assessments.submitting') : t('assessments.submit')}
                <Check className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('assessments.next')}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showCrisis && (
        <CrisisModal
          assessmentId={crisisAssessmentId}
          triggerReason={crisisTrigger}
          onClose={() => {
            setShowCrisis(false);
            onComplete();
          }}
        />
      )}
    </>
  );
}
