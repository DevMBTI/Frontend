import React, { useState, useCallback, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import ErrorScreen from './components/ErrorScreen';
import StatsScreen from './components/StatsScreen';
import AuthWrapper from './components/auth/AuthWrapper';
import { personalityQuestions } from './utils/questions';
import { simulateAIAnalysis } from './utils/resultsAnalyzer';
import apiService from './services/api';
import authService from './services/auth';
import useNetworkStatus from './hooks/useNetworkStatus';
import { getUserFriendlyErrorMessage } from './config';

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const { isOnline, isOffline } = useNetworkStatus();
  const [isForceOfflineMode, setIsForceOfflineMode] = useState(false);
  const [resultId, setResultId] = useState(null);
  const [showStats, setShowStats] = useState(false);
  
  // 오프라인 모드 상태 계산 (네트워크 상태 또는 강제 오프라인 모드)
  const isOfflineMode = isOffline || isForceOfflineMode;
  
  // 진행률 계산
  useEffect(() => {
    if (step === 0) {
      setProgress(0);
    } else {
      // 최대 문항 수를 넘어가지 않도록 처리
      const currentStep = Math.min(step, personalityQuestions.length);
      setProgress(Math.round((currentStep / personalityQuestions.length) * 100));
    }
  }, [step]);

  // 테스트 시작하기
  const handleStart = useCallback(() => {
    setStep(1);
    setError(null);
    setIsForceOfflineMode(false);
    setShowStats(false);
  }, []);

  // 이전 질문으로 돌아가기
  const handlePrevious = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);
  
  // 통계 화면 표시
  const handleShowStats = useCallback(() => {
    setShowStats(true);
    setStep(0);
    setResult(null);
  }, []);
  
  // 테스트 화면으로 돌아가기
  const handleHideStats = useCallback(() => {
    setShowStats(false);
  }, []);
  
  // API 오류 처리 함수
  const handleApiError = useCallback((error, fallbackFn) => {
    console.error('API Error:', error);
    const errorMessage = error.userFriendlyMessage || getUserFriendlyErrorMessage(error);
    setError(errorMessage);
    
    if (fallbackFn) {
      setLoading(true);
      fallbackFn()
        .then(result => {
          setResult(result);
          setLoading(false);
          setIsForceOfflineMode(true);
        })
        .catch(fallbackErr => {
          setError(getUserFriendlyErrorMessage(fallbackErr));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  // 로컬 분석 실행 함수
  const runLocalAnalysis = useCallback((answersData) => {
    return simulateAIAnalysis(answersData);
  }, []);

  // 질문에 답변 처리
  const handleAnswer = useCallback((selectedOption) => {
    // 현재 질문에 대한 답변 저장
    const currentQuestionIndex = Math.min(step - 1, personalityQuestions.length - 1);
    const currentQuestion = personalityQuestions[currentQuestionIndex];
    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(updatedAnswers);
    
    if (step < personalityQuestions.length) {
      // 다음 질문으로 이동
      setStep(step + 1);
    } else if (step === personalityQuestions.length) {
      // 마지막 질문이면 결과 분석
      setLoading(true);
      setError(null);
      
      // API 호출을 기본 옵션으로 설정
      const USE_LOCAL_FALLBACK = false; // 로컬 폴백 비활성화
      
      // 오프라인 또는 폴백 설정된 경우에만 로컬 분석 사용
      if (USE_LOCAL_FALLBACK || isOfflineMode) {
        console.log('로컬 결과 분석 사용 중...');
        simulateAIAnalysis(updatedAnswers)
          .then(result => {
            setResult(result);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message || '결과 분석 중 오류가 발생했습니다.');
            setLoading(false);
          });
        return;
      }
      
      // 기본적으로 API 호출 수행
      console.log('API 결과 분석 사용 중...');
      console.log('전송되는 answers 객체:', JSON.stringify(updatedAnswers, null, 2));
      // 각 답변 항목을 개별적으로 로깅
      Object.entries(updatedAnswers).forEach(([key, value]) => {
        console.log(`답변 항목: ${key}, 값: ${value}, 타입: ${typeof value}`);
      });
      
      apiService.analyzeResults(updatedAnswers, userName)
        .then(data => {
          console.log('API 응답 결과:', JSON.stringify(data, null, 2));
          const resultData = data.result || data;
          setResult(resultData);
          setLoading(false);
        })
        .catch(err => {
          console.error('API Error:', err);
          // API 호출 실패 시 로컬 분석으로 폴백
          simulateAIAnalysis(updatedAnswers)
            .then(result => {
              setResult(result);
              setLoading(false);
            })
            .catch(fallbackErr => {
              setError(fallbackErr.message || '결과 분석 중 오류가 발생했습니다.');
              setLoading(false);
            });
        });
    }
  }, [step, answers, userName, isOfflineMode]);

  // 처음으로 돌아가기
  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setUserName('');
    setError(null);
    setIsForceOfflineMode(false);
    setShowStats(false);
  }, []);
  
  // 오류 발생 시 다시 시도
  const handleRetry = useCallback(() => {
    setError(null);
    
    if (step === personalityQuestions.length) {
      setLoading(true);
      
      if (isOfflineMode) {
        runLocalAnalysis(answers)
          .then(result => {
            setResult(result);
            setLoading(false);
          })
          .catch(err => {
            handleApiError(err);
          });
      } else {
        apiService.analyzeResults(answers, userName)
          .then(data => {
            const resultData = data.result || data;
            setResult(resultData);
            setLoading(false);
          })
          .catch(err => {
            handleApiError(err, () => runLocalAnalysis(answers));
          });
      }
    }
  }, [step, answers, userName, isOfflineMode, handleApiError, runLocalAnalysis]);

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    // 오류 화면
    if (error) {
      return (
        <ErrorScreen 
          message={error} 
          onRetry={handleRetry}
          onRestart={handleRestart}
          onOfflineMode={() => {
            setIsForceOfflineMode(true);
            handleRetry();
          }}
        />
      );
    }
    
    // 시작 화면
    if (step === 0) {
      return (
        <WelcomeScreen 
          onStart={handleStart} 
          onUserNameChange={setUserName} 
          userName={userName}
          onShowStats={handleShowStats}
        />
      );
    }

    // 질문 화면
    if (step > 0 && step <= personalityQuestions.length && !loading && !result) {
      return (
        <QuizScreen 
          step={step} 
          totalSteps={personalityQuestions.length}
          progress={progress}
          question={personalityQuestions[step - 1]}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          isFirstQuestion={step === 1}
          isOfflineMode={isOfflineMode}
          answers={answers}
        />
      );
    }

    // 로딩 화면
    if (loading) {
      return <LoadingScreen message="결과를 분석 중입니다..." />;
    }

    // 결과 화면
    if (result) {
      return (
        <ResultsScreen 
          result={result} 
          userName={userName} 
          onRestart={handleRestart}
          isOfflineMode={isOfflineMode}
          onShowStats={handleShowStats}
        />
      );
    }

    return null;
  };
  
  // 앱 전체를 인증 래퍼로 감싸기
  return (
    <AuthWrapper hideBanner={true}>
      {showStats ? (
        <AuthWrapper requireAuth={true} requireAdmin={true}>
          <StatsScreen onBack={handleHideStats} />
        </AuthWrapper>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {renderContent()}
        </div>
      )}
    </AuthWrapper>
  );
}

export default App;