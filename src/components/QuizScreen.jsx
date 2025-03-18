import React, { useState, useEffect } from 'react';
import aiService from '../services/aiService';
import { analyzeResults } from '../utils/resultsAnalyzer';
import { pathLabels } from '../utils/questions';

const QuizScreen = ({ 
  step, 
  totalSteps, 
  progress, 
  question, 
  onAnswer, 
  onPrevious, 
  isFirstQuestion,
  isOfflineMode,
  answers 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [aiQuestion, setAiQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dynamicOptions, setDynamicOptions] = useState(null);
  
  useEffect(() => {
    // 질문이 카테고리 질문인 경우(preference) AI 질문 로드
    if (question.id === 'preference' && selectedOption) {
      loadAIQuestion(selectedOption);
    }
    
    // 컴포넌트가 마운트될 때마다 선택 상태 초기화
    setSelectedOption(null);
    
    // 동적 선택지가 필요한 경우 처리
    if (question.isDynamicOptions && step === totalSteps) {
      generateDynamicOptions();
    }
  }, [question, step, totalSteps]);
  
  // 동적 선택지 생성 함수
  const generateDynamicOptions = () => {
    // 현재 사용자의 답변을 기반으로 점수 계산
    if (!answers || Object.keys(answers).length === 0) {
      return;
    }
    
    // 점수 계산
    const tempScores = analyzeResults(answers).scores;
    
    // 점수를 기준으로 정렬하여 상위 5개 분야 선택
    const topFields = Object.entries(tempScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([field]) => field);
    
    // 동적 선택지 구성
    const options = topFields.map(field => ({
      value: field,
      label: `${pathLabels[field]} 개발자: ${getDynamicOptionDescription(field)}`
    }));
    
    setDynamicOptions(options);
  };
  
  // 분야별 설명 생성 함수
  const getDynamicOptionDescription = (field) => {
    const descriptions = {
      frontend: '사용자 인터페이스와 사용자 경험을 만들기',
      backend: '서버와 데이터베이스 시스템 구축하기',
      fullstack: '프론트엔드와 백엔드를 모두 다루기',
      data: '데이터 분석과 인사이트 도출하기',
      devops: '개발과 운영 프로세스 자동화하기',
      mobile: '모바일 환경에 최적화된 앱 개발하기',
      security: '시스템 보안과 취약점 해결하기',
      gamedev: '인터랙티브한 게임 경험 만들기',
      embedded: '하드웨어와 통합된 시스템 개발하기',
      ai: '머신러닝과 인공지능 모델 개발하기'
    };
    
    return descriptions[field] || '';
  };
  
  // AI 생성 질문 로드
  const loadAIQuestion = async (category) => {
    setLoading(true);
    setError(null);
    
    // 카테고리 매핑: 프론트엔드 컴포넌트에서 선택된 값을 API에 맞는 형식으로 변환
    const categoryMapping = {
      'frontend': 'frontend',
      'backend': 'backend',
      'fullstack': 'fullstack',
      'data': 'data',
      'devops': 'devops',
      'mobile': 'mobile',
      'security': 'security',
      'gamedev': 'gamedev',
      'embedded': 'embedded',
      'ai': 'ai'
    };
    
    const mappedCategory = categoryMapping[category] || 'frontend';
    console.log(`원본 카테고리: ${category}, 매핑된 카테고리: ${mappedCategory}`);
    
    try {
      if (isOfflineMode) {
        // 오프라인 모드일 때 로컬 문제 사용
        console.log('오프라인 모드로 로컬 문제를 생성합니다');
        const localQuestion = aiService.generateLocalQuestion(mappedCategory);
        setAiQuestion(localQuestion);
      } else {
        // 온라인 모드일 때 서버에서 문제 가져오기
        console.log('서버에서 AI 문제를 요청합니다:', mappedCategory);
        const question = await aiService.generateQuestion(mappedCategory);
        console.log('서버에서 받은 응답:', question);
        setAiQuestion(question);
      }
    } catch (err) {
      console.error('AI 질문 로드 오류:', err);
      setError('AI 문제를 불러오는 데 실패했습니다.');
      
      // 오류 발생 시 로컬 문제로 폴백
      console.log('오류 발생으로 로컬 문제로 대체합니다');
      const localQuestion = aiService.generateLocalQuestion(mappedCategory);
      setAiQuestion(localQuestion);
    } finally {
      setLoading(false);
    }
  };
  
  // 메인 질문에 대한 답변 처리
  const handleMainQuestionAnswer = (option) => {
    setSelectedOption(option);
    
    // preference 질문일 때는 AI 문제를 먼저 보여줌
    if (question.id === 'preference') {
      loadAIQuestion(option);
    } else {
      // 일반 질문은 바로 다음으로 넘어감
      onAnswer(option);
    }
  };
  
  // AI 질문에 대한 답변 처리
  const handleAIQuestionAnswer = (optionIndex) => {
    // AI 문제 결과 표시
    const isCorrect = optionIndex === aiQuestion.answer;
    
    // 결과와 함께 다음 질문으로 이동
    setTimeout(() => {
      onAnswer(selectedOption);
    }, 1500);
  };
  
  // 질문 렌더링
  const renderQuestion = () => {
    // AI 질문이 로드된 경우 AI 질문 화면 표시
    if (aiQuestion && selectedOption) {
      return (
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-lg text-indigo-600 mb-2 font-medium">
              {selectedOption} 분야 관련 문제
            </h3>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              {aiQuestion.question}
            </h2>
            
            <div className="space-y-3">
              {aiQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAIQuestionAnswer(index)}
                  className="w-full text-left p-4 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">{index + 1}. </span>
                  {option}
                </button>
              ))}
            </div>
            
            <div className="mt-8 text-sm text-gray-600">
              <p>이 문제는 AI가 생성한 {selectedOption} 분야의 지식을 테스트하는 문제입니다. 정답은 점수에 반영되지 않습니다.</p>
            </div>
          </div>
        </div>
      );
    }
    
    // AI 문제 로딩 중
    if (loading) {
      return (
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-700">AI가 {selectedOption} 분야 관련 문제를 생성하고 있습니다...</p>
            </div>
          </div>
        </div>
      );
    }
    
    // 메인 질문 - 동적 선택지가 있는 경우
    const options = question.isDynamicOptions && dynamicOptions ? dynamicOptions : question.options;
    
    // 메인 질문
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h3 className="text-lg text-indigo-600 mb-2 font-medium">
            질문 {step}/{totalSteps}
          </h3>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            {question.id === 'preference' && step === totalSteps ? 
              '지금까지의 응답을 바탕으로, 다음 중 가장 관심이 가는 분야는 무엇인가요?' : 
              question.question}
          </h2>
          
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleMainQuestionAnswer(option.value)}
                className="w-full text-left p-4 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col py-8">
      {/* 진행 상태 표시 */}
      <div className="w-full max-w-3xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-indigo-700">{progress}% 완료</span>
          <span className="text-sm text-gray-600">질문 {step} / {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {renderQuestion()}
      
      {/* 이전 버튼 */}
      <div className="w-full max-w-3xl mx-auto px-4 mt-6">
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            disabled={isFirstQuestion || loading || (selectedOption && aiQuestion)}
            className={`px-5 py-2 rounded-md ${
              isFirstQuestion || loading || (selectedOption && aiQuestion)
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            } shadow-sm border border-gray-300`}
          >
            이전 질문
          </button>
          
          {isOfflineMode && (
            <div className="px-3 py-1 bg-yellow-100 text-amber-700 text-sm rounded-md border border-yellow-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              오프라인 모드
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;