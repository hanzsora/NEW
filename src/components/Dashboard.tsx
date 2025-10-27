import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Assessment } from '../lib/supabase';
import { Plus, TrendingUp, Activity, AlertCircle, FileText } from 'lucide-react';
import { getRiskLevel, getSeverityColor } from '../lib/scoring';
import { format } from 'date-fns';

interface DashboardProps {
  onStartAssessment: () => void;
}

export function Dashboard({ onStartAssessment }: DashboardProps) {
  const { t } = useLanguage();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error loading assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const riskLevel = getRiskLevel(assessments);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('dashboard.welcome')}
          </p>
        </div>
        <button
          onClick={onStartAssessment}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('assessments.title')}
        </button>
      </div>

      {assessments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('dashboard.noAssessments')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('dashboard.takeFirst')}
          </p>
          <button
            onClick={onStartAssessment}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t('assessments.title')}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${riskLevel.color}-100 dark:bg-${riskLevel.color}-900`}>
                  <AlertCircle className={`w-6 h-6 text-${riskLevel.color}-600 dark:text-${riskLevel.color}-400`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('dashboard.riskIndicator')}
                </h3>
              </div>
              <div className={`text-2xl font-bold capitalize text-${riskLevel.color}-600 dark:text-${riskLevel.color}-400`}>
                {riskLevel.level}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Total Assessments
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {assessments.length}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-100 dark:bg-teal-900">
                  <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Last Assessment
                </h3>
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {format(new Date(assessments[0].completed_at), 'MMM dd, yyyy')}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.recentResults')}
            </h2>
            <div className="space-y-4">
              {assessments.slice(0, 10).map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {assessment.assessment_type}
                      </span>
                      {assessment.crisis_flagged && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs font-medium rounded">
                          Crisis Flagged
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {format(new Date(assessment.completed_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                      <span className={`font-medium ${getSeverityColor(assessment.severity_level)}`}>
                        {t(`severity.${assessment.severity_level}`)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {t('results.score')}: {assessment.total_score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
