import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  const [progressWidth, setProgressWidth] = useState(10);
  const loadingTexts = [
    "성향을 분석하는 중",
    "기술적 적성을 평가하는 중",
    "최적의 개발 분야를 찾는 중",
    "결과를 생성하는 중"
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  useEffect(() => {
    // 로딩 애니메이션 효과
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    
    // 프로그레스 바 애니메이션
    const progressInterval = setInterval(() => {
      setProgressWidth(prev => {
        const newWidth = prev + 1;
        // 텍스트 변경 트리거
        if (newWidth === 30) setCurrentTextIndex(1);
        if (newWidth === 60) setCurrentTextIndex(2);
        if (newWidth === 85) setCurrentTextIndex(3);
        return Math.min(newWidth, 95);
      });
    }, 35);
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="relative h-32 mb-6">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke="#E0E7FF" 
              strokeWidth="8"
            />
            <circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke="#4F46E5" 
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * progressWidth / 100)}
              transform="rotate(-90 50 50)"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="h-16 w-16 relative">
              <div className="absolute top-0 left-0 h-16 w-16 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
              <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 text-indigo-900 font-bold text-xl">{progressWidth}%</div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {loadingTexts[currentTextIndex]}{dots}
        </h2>
        <p className="text-gray-600 mb-6">AI가 당신에게 가장 적합한 개발 분야를 찾고 있습니다</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;