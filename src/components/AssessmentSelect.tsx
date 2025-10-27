import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, FileText, Heart, Activity, Smile, Brain } from 'lucide-react';

interface AssessmentSelectProps {
  onSelect: (type: string) => void;
  onBack: () => void;
}

export function AssessmentSelect({ onSelect, onBack }: AssessmentSelectProps) {
  const { t } = useLanguage();

  const assessmentTypes = [
    {
      id: 'PHQ9',
      icon: Heart,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-100 dark:bg-rose-900',
      name: t('assessments.phq9'),
      desc: t('assessments.phq9Desc')
    },
    {
      id: 'GAD7',
      icon: Activity,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      name: t('assessments.gad7'),
      desc: t('assessments.gad7Desc')
    },
    {
      id: 'DASS21',
      icon: Brain,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      name: t('assessments.dass21'),
      desc: t('assessments.dass21Desc')
    },
    {
      id: 'WHO5',
      icon: Smile,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900',
      name: t('assessments.who5'),
      desc: t('assessments.who5Desc')
    },
    {
      id: 'K10',
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      name: t('assessments.k10'),
      desc: t('assessments.k10Desc')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('results.backToDashboard')}
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {t('assessments.selectType')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Choose a validated assessment tool to evaluate your mental wellbeing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessmentTypes.map((assessment) => {
          const Icon = assessment.icon;
          return (
            <button
              key={assessment.id}
              onClick={() => onSelect(assessment.id)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${assessment.bgColor} flex-shrink-0`}>
                  <Icon className={`w-7 h-7 ${assessment.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {assessment.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {assessment.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
