import React from 'react';

const ErrorScreen = ({ message, onRetry, onRestart, onOfflineMode }) => {
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
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/70 overflow-hidden relative z-10">
        <div className="bg-red-600 p-6">
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mt-4 text-center text-xl font-bold text-white">오류가 발생했습니다</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-6">{message}</p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onRetry}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              aria-label="다시 시도하기"
            >
              다시 시도하기
            </button>
            
            {onOfflineMode && (
              <button
                onClick={onOfflineMode}
                className="w-full py-3 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                aria-label="오프라인 모드로 계속하기"
              >
                오프라인 모드로 계속하기
              </button>
            )}
            
            <button
              onClick={onRestart}
              className="w-full py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              aria-label="처음으로 돌아가기"
            >
              처음으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen; 