import { useLanguage } from '../contexts/LanguageContext';
import { AlertTriangle, X, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CrisisModalProps {
  assessmentId: string;
  triggerReason: string;
  onClose: () => void;
}

export function CrisisModal({ assessmentId, triggerReason, onClose }: CrisisModalProps) {
  const { t } = useLanguage();

  const handleAcknowledge = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('crisis_logs').insert({
        user_id: user.id,
        assessment_id: assessmentId,
        trigger_reason: triggerReason,
        acknowledged: true
      });

      onClose();
    } catch (error) {
      console.error('Error logging crisis acknowledgment:', error);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
              {t('crisis.alert')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('crisis.detected')}
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-3">
            {t('crisis.seekHelp')}
          </p>
          <div className="space-y-2">
            <a
              href="tel:999"
              className="flex items-center gap-2 text-red-700 dark:text-red-400 hover:underline"
            >
              <Phone className="w-4 h-4" />
              {t('crisis.emergency')}
            </a>
            <a
              href="tel:03-76272929"
              className="flex items-center gap-2 text-red-700 dark:text-red-400 hover:underline"
            >
              <Phone className="w-4 h-4" />
              {t('crisis.befrienders')}
            </a>
            <a
              href="tel:15999"
              className="flex items-center gap-2 text-red-700 dark:text-red-400 hover:underline"
            >
              <Phone className="w-4 h-4" />
              {t('crisis.talian')}
            </a>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          {t('crisis.message')}
        </p>

        <button
          onClick={handleAcknowledge}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {t('crisis.acknowledge')}
        </button>
      </div>
    </div>
  );
}
