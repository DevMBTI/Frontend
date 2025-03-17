import React, { useState } from 'react';
import { personalityQuestions } from '../utils/questions';

const QuizScreen = ({ step, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentQuestion = personalityQuestions[step - 1];
  const progress = (step / personalityQuestions.length) * 100;
  
  const handleOptionSelect = (value, index) => {
    setSelectedOption(index);
    setIsAnimating(true);
    
    // 약간의 지연 후 다음 질문으로 이동 (애니메이션 효과)
    setTimeout(() => {
      onAnswer(value);
      setSelectedOption(null);
      setIsAnimating(false);
    }, 400);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium">
                {step}
              </span>
              <span className="ml-2 text-gray-600">/ {personalityQuestions.length}</span>
            </div>
            <span className="text-sm text-gray-500 font-medium">{Math.round(progress)}% 완료</span>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className={`mb-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option.value, index)}
                  className={`w-full text-left p-4 border ${selectedOption === index 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-300'} 
                    rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 ${
                      selectedOption === index ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                    } mr-3 mt-0.5`}>
                      {selectedOption === index && (
                        <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-800">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              옵션을 클릭하면 자동으로 다음 질문으로 이동합니다
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;