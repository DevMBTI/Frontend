import React, { useState, useEffect, useCallback } from 'react';
import { aiGeneratedQuestions } from '../utils/questions';
import apiService from '../services/api';

const AIGeneratedQuestion = ({ category }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  
  // 정답 확인 함수 - 컴포넌트 상단에 정의
  const isCorrectAnswer = (index) => {
    if (correctAnswer !== null) {
      return index === correctAnswer;
    }
    // 폴백: aiGeneratedQuestions에서 정답 확인
    return index === aiGeneratedQuestions[category]?.answer;
  };
  
  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    try {
      // 오프라인 모드 확인
      if (!navigator.onLine) {
        setIsOfflineMode(true);
        throw new Error('오프라인 모드');
      }
      
      const data = await apiService.generateQuestion(category);
      setQuestion(data.question);
      setOptions(data.options);
      setCorrectAnswer(data.answer);
      setIsOfflineMode(false);
    } catch (error) {
      console.error('Error fetching question:', error);
      
      // 오류 정보 설정
      setError(error.message || '질문을 불러오는 중 오류가 발생했습니다.');
      
      // 폴백: 로컬 데이터 사용
      const fallbackCategory = category && aiGeneratedQuestions[category] 
        ? category 
        : 'frontend';
      const selectedQuestion = aiGeneratedQuestions[fallbackCategory];
      
      // 오류 발생해도 사용자 경험을 위해 질문 설정
      setQuestion(selectedQuestion.question);
      setOptions(selectedQuestion.options);
      setCorrectAnswer(selectedQuestion.answer);
      
      // 네트워크 오류인 경우 오프라인 모드로 설정
      if (error.name === 'TypeError' && error.message.includes('network')) {
        setIsOfflineMode(true);
      }
    } finally {
      setLoading(false);
    }
  }, [category]);
  
  useEffect(() => {
    fetchQuestion();
    
    // 네트워크 상태 모니터링
    const handleOnline = () => {
      setIsOfflineMode(false);
      fetchQuestion();
    };
    
    const handleOffline = () => {
      setIsOfflineMode(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [category, fetchQuestion]);
  
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };
  
  const handleRetry = () => {
    setError(null);
    fetchQuestion();
  };
  
  // 오류 화면
  if (error && !isOfflineMode) {
    return (
      <div className="w-full border border-red-200 rounded-lg p-6 bg-red-50">
        <div className="flex flex-col items-center justify-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">문제를 불러오는데 실패했습니다</h3>
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            aria-label="다시 시도"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }
  
  // 로딩 화면
  if (loading) {
    return (
      <div className="w-full border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
            <span className="mt-3 text-gray-600">AI가 문제를 생성 중입니다...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
      {/* 오프라인 모드 알림 */}
      {isOfflineMode && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3">
          <div className="flex items-center text-yellow-800 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            오프라인 모드: 샘플 문제를 표시합니다
          </div>
        </div>
      )}
      
      <div className="bg-indigo-600 p-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-medium text-white">AI 생성 샘플 문제</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-4 text-lg">{question}</h4>
          <div className="space-y-3" role="radiogroup" aria-labelledby="question-options">
            {options.map((option, index) => {
              // 이 부분에서 isCorrectAnswer 함수를 사용
              const isCorrect = isCorrectAnswer(index);
              const isSelected = selectedAnswer === index;
              
              let optionClass = "p-4 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200";
              
              if (showFeedback) {
                if (isCorrect) {
                  optionClass += " bg-green-50 border-green-500";
                } else if (isSelected && !isCorrect) {
                  optionClass += " bg-red-50 border-red-500";
                }
              } else if (isSelected) {
                optionClass += " bg-indigo-50 border-indigo-300";
              } else {
                optionClass += " hover:bg-indigo-50 hover:border-indigo-300";
              }
              
              return (
                <div 
                  key={index}
                  onClick={() => !showFeedback && handleAnswerSelect(index)}
                  className={optionClass}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={showFeedback ? -1 : 0}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                      showFeedback && isCorrect ? 'bg-green-500 text-white' : 
                      showFeedback && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{option}</span>
                    {showFeedback && isCorrect && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {showFeedback && (
          <div className={`p-4 rounded-lg ${isCorrectAnswer(selectedAnswer) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex">
              {isCorrectAnswer(selectedAnswer) ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <div>
                <h5 className={`font-medium ${isCorrectAnswer(selectedAnswer) ? 'text-green-800' : 'text-red-800'}`} id="feedback-heading">
                  {isCorrectAnswer(selectedAnswer) ? '정답입니다!' : '틀렸습니다.'}
                </h5>
                <p className="text-sm text-gray-600 mt-1" id="feedback-description">
                  {isCorrectAnswer(selectedAnswer) 
                    ? '이 주제에 대한 이해도가 높습니다.' 
                    : `정답은 ${String.fromCharCode(65 + correctAnswer)}: ${options[correctAnswer]} 입니다.`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          {showFeedback && (
            <button
              onClick={() => {
                setShowFeedback(false);
                setSelectedAnswer(null);
                fetchQuestion();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="다음 문제"
            >
              다음 문제
            </button>
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-500 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>
            실제 테스트에서는 AI가 여러분의 답변을 분석하여 개발 적성을 더 정확하게 평가합니다.
            {isOfflineMode && ' 현재 오프라인 모드에서 실행 중입니다.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedQuestion;