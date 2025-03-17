import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import { personalityQuestions } from './utils/questions';
import { simulateAIAnalysis } from './utils/resultsAnalyzer';

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  // 테스트 시작하기
  const handleStart = () => {
    setStep(1);
  };

  // 질문에 답변 처리
  const handleAnswer = (selectedOption) => {
    // 현재 질문에 대한 답변 저장
    const currentQuestion = personalityQuestions[step - 1];
    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(updatedAnswers);
    
    if (step < personalityQuestions.length) {
      // 다음 질문으로 이동
      setStep(step + 1);
    } else {
      // 마지막 질문이면 결과 분석
      setLoading(true);
      simulateAIAnalysis(updatedAnswers)
        .then(result => {
          setResult(result);
          setLoading(false);
        });
    }
  };

  // 처음으로 돌아가기
  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setUserName('');
  };

  // 시작 화면
  if (step === 0) {
    return <WelcomeScreen onStart={handleStart} userName={userName} setUserName={setUserName} />;
  }

  // 질문 화면
  if (step > 0 && step <= personalityQuestions.length && !loading && !result) {
    return <QuizScreen step={step} onAnswer={handleAnswer} />;
  }

  // 로딩 화면
  if (loading) {
    return <LoadingScreen />;
  }

  // 결과 화면
  if (result) {
    return <ResultsScreen result={result} userName={userName} onRestart={handleRestart} />;
  }

  return null;
}

export default App;