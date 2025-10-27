import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertTriangle, Shield, Lock, Phone } from 'lucide-react';

export function ConsentScreen() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const { updateProfile } = useAuth();
  const { t } = useLanguage();

  const handleContinue = async () => {
    if (!agreed) {
      setError(t('consent.mustAgree'));
      return;
    }

    try {
      await updateProfile({
        consent_given: true,
        consent_date: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error updating consent:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('consent.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('consent.subtitle')}
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('consent.purpose')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('consent.purposeText')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('consent.notDiagnosis')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('consent.notDiagnosisText')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('consent.privacy')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('consent.privacyText')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('consent.crisis')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('consent.crisisText')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setError('');
                }}
                className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {t('consent.checkboxLabel')}
              </span>
            </label>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleContinue}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {t('consent.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
