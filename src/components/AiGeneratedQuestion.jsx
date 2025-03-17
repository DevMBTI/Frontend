import React, { useState, useEffect } from 'react';
import { aiGeneratedQuestions } from '../utils/questions';

const AIGeneratedQuestion = ({ category }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  useEffect(() => {
    // 실제 구현에서는 API를 호출하여 AI에게 문제 생성 요청
    setTimeout(() => {
      const selectedQuestion = aiGeneratedQuestions[category] || aiGeneratedQuestions.frontend;
      setQuestion(selectedQuestion.question);
      setOptions(selectedQuestion.options);
      setLoading(false);
    }, 1500);
  }, [category]);
  
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };
  
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
          <div className="space-y-3">
            {options.map((option, index) => {
              const isCorrectAnswer = aiGeneratedQuestions[category]?.answer === index;
              const isSelected = selectedAnswer === index;
              
              let optionClass = "p-4 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200";
              
              if (showFeedback) {
                if (isCorrectAnswer) {
                  optionClass += " bg-green-50 border-green-500";
                } else if (isSelected && !isCorrectAnswer) {
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
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                      showFeedback && isCorrectAnswer ? 'bg-green-500 text-white' : 
                      showFeedback && isSelected && !isCorrectAnswer ? 'bg-red-500 text-white' :
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{option}</span>
                    {showFeedback && isCorrectAnswer && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
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
          <div className={`p-4 rounded-lg ${selectedAnswer === aiGeneratedQuestions[category]?.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex">
              {selectedAnswer === aiGeneratedQuestions[category]?.answer ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <div>
                <h5 className={`font-medium ${selectedAnswer === aiGeneratedQuestions[category]?.answer ? 'text-green-800' : 'text-red-800'}`}>
                  {selectedAnswer === aiGeneratedQuestions[category]?.answer ? '정답입니다!' : '틀렸습니다.'}
                </h5>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedAnswer === aiGeneratedQuestions[category]?.answer 
                    ? '이 주제에 대한 이해도가 높습니다.' 
                    : `정답은 ${String.fromCharCode(65 + aiGeneratedQuestions[category]?.answer)}: ${options[aiGeneratedQuestions[category]?.answer]} 입니다.`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-500 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>
            실제 테스트에서는 AI가 여러분의 답변을 분석하여 개발 적성을 더 정확하게 평가합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedQuestion;