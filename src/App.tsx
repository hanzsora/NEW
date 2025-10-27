import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Auth } from './components/Auth';
import { ConsentScreen } from './components/ConsentScreen';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AssessmentSelect } from './components/AssessmentSelect';
import { AssessmentTake } from './components/AssessmentTake';

type Screen = 'dashboard' | 'assessmentSelect' | 'assessmentTake';

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string>('');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!profile?.consent_given) {
    return <ConsentScreen />;
  }

  const handleStartAssessment = () => {
    setCurrentScreen('assessmentSelect');
  };

  const handleSelectAssessment = (type: string) => {
    setSelectedAssessmentType(type);
    setCurrentScreen('assessmentTake');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedAssessmentType('');
  };

  const handleAssessmentComplete = () => {
    setCurrentScreen('dashboard');
    setSelectedAssessmentType('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      {currentScreen === 'dashboard' && (
        <Dashboard onStartAssessment={handleStartAssessment} />
      )}
      {currentScreen === 'assessmentSelect' && (
        <AssessmentSelect
          onSelect={handleSelectAssessment}
          onBack={handleBackToDashboard}
        />
      )}
      {currentScreen === 'assessmentTake' && selectedAssessmentType && (
        <AssessmentTake
          assessmentType={selectedAssessmentType}
          onComplete={handleAssessmentComplete}
          onBack={() => setCurrentScreen('assessmentSelect')}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
