import React from 'react';

const LoadingScreen = ({ message = "로딩 중..." }) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex flex-col items-center justify-center fixed inset-0">
      {/* 배경 애니메이션 요소 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[150vw] h-[150vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-[150vw] h-[150vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 right-1/3 w-[150vw] h-[150vw] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-1/3 left-1/4 w-[150vw] h-[150vw] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* 추가 배경 레이어 */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 z-0"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/70 flex flex-col items-center">
        <div className="w-24 h-24 relative mb-6">
          {/* 회전 애니메이션 */}
          <div className="absolute inset-0 rounded-full border-t-4 border-indigo-600 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-r-4 border-purple-500 animate-spin animation-delay-150 animate-reverse"></div>
          <div className="absolute inset-0 rounded-full border-b-4 border-blue-500 animate-spin animation-delay-300"></div>
          
          {/* 중앙 아이콘 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 mb-3">
          {message}
        </h2>
        
        <p className="text-gray-600 max-w-xs text-center">
          결과를 분석하는 중입니다. 잠시만 기다려주세요...
        </p>
        
        {/* 진행 바 */}
        <div className="w-full mt-6 overflow-hidden relative h-2 rounded-full bg-gray-200">
          <div className="animate-progress-indeterminate absolute h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" 
               style={{width: '30%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;