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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-10 px-4 flex flex-col items-center relative">
      {/* 배경 요소 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* 진행 상태 표시 */}
      <div className="w-full max-w-3xl mx-auto mb-8 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">진행률: {progress}%</span>
          <span className="text-sm font-medium bg-white/70 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full border border-gray-200">
            {step} / {totalSteps}
          </span>
        </div>
        <div className="w-full bg-white/50 backdrop-blur-sm rounded-full h-3 shadow-inner overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* AI 질문 렌더링 */}
      {aiQuestion && selectedOption ? (
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
              <h3 className="text-white font-medium">
                {selectedOption} 분야 테스트 문제
              </h3>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                {aiQuestion.question}
              </h2>
              
              <div className="space-y-3">
                {aiQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAIQuestionAnswer(index)}
                    className="w-full text-left p-5 rounded-xl transition-all duration-200 border-2 hover:border-indigo-400 hover:bg-indigo-50 flex items-center group"
                    style={{ borderColor: 'rgb(226, 232, 240)' }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 text-indigo-600 font-medium group-hover:bg-indigo-200">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 group-hover:text-indigo-700">{option}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p>이 문제는 AI가 생성한 {selectedOption} 분야 관련 문제입니다. 정답은 점수에 반영되지 않으니 부담 없이 답변해주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 relative mb-4">
                  <div className="absolute inset-0 rounded-full border-t-2 border-indigo-600 animate-spin"></div>
                  <div className="absolute inset-0 rounded-full border-r-2 border-purple-500 animate-spin animation-delay-150 animate-reverse"></div>
                  <div className="absolute inset-0 rounded-full border-b-2 border-blue-500 animate-spin animation-delay-300"></div>
                </div>
                <p className="text-indigo-700 font-medium mb-2">AI가 문제를 생성하고 있습니다</p>
                <p className="text-gray-600 text-sm text-center max-w-md">
                  {selectedOption} 분야와 관련된 지식을 테스트하는 문제를 준비 중입니다. 잠시만 기다려주세요...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
              <h3 className="text-white font-medium flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center bg-white w-8 h-8 rounded-full text-indigo-600 font-semibold mr-3">
                  {step}
                </span>
                <span>질문 {step} / {totalSteps}</span>
              </h3>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
                {question.id === 'preference' && step === totalSteps ? 
                  '지금까지의 응답을 바탕으로, 다음 중 가장 관심이 가는 분야는 무엇인가요?' : 
                  question.question}
              </h2>
              
              {/* 동적 선택지가 있는 경우 */}
              {question.description && (
                <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-indigo-800 text-sm">
                  {question.description}
                </div>
              )}
              
              <div className="space-y-3">
                {(question.isDynamicOptions && dynamicOptions ? dynamicOptions : question.options).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMainQuestionAnswer(option.value)}
                    className="w-full text-left p-5 rounded-xl transition-all duration-200 border-2 hover:border-indigo-400 hover:bg-indigo-50 flex items-start group"
                    style={{ borderColor: 'rgb(226, 232, 240)' }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-4 text-indigo-600 font-medium mt-0.5 group-hover:bg-indigo-200">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium group-hover:text-indigo-700">{option.label}</span>
                      {option.description && (
                        <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 이전 버튼 */}
      <div className="w-full max-w-3xl mx-auto mt-6 relative z-10">
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            disabled={isFirstQuestion || loading || (selectedOption && aiQuestion)}
            className={`px-5 py-2.5 rounded-lg ${
              isFirstQuestion || loading || (selectedOption && aiQuestion)
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 shadow-sm hover:shadow transition-all duration-200'
            }`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              이전 질문
            </div>
          </button>
          
          {isOfflineMode && (
            <div className="px-4 py-2 bg-yellow-100 text-amber-700 text-sm rounded-lg border border-yellow-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
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