import React, { useState, useEffect } from 'react';
import authService from '../services/auth';

const WelcomeScreen = ({ onStart, onUserNameChange, userName, onShowStats }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          const userInfo = await authService.getUserInfo();
          setIsAdmin(userInfo.isAdmin);
        }
      } catch (error) {
        console.error('인증 상태 확인 중 오류:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    setButtonDisabled(!userName || userName.trim().length < 2);
  }, [userName]);

  const handleNameChange = (e) => {
    onUserNameChange(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* 배경 요소 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* 모션 요소들 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* 로그인/로그아웃 상태 표시 */}
      {isAuthenticated && (
        <div className="absolute top-6 right-6 z-10 flex items-center">
          <span className="text-indigo-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-l-lg text-sm font-medium border border-indigo-200 shadow-sm">
            {isAdmin ? '관리자' : '사용자'}
          </span>
          <button 
            onClick={() => authService.signOut()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            로그아웃
          </button>
        </div>
      )}
      
      <div className="relative z-10 max-w-xl w-full px-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="relative px-8 pt-10 pb-8">
            {/* 상단 장식 */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 mb-2">개발자 적성 테스트</h1>
              <p className="text-gray-600 text-lg">당신에게 맞는 개발 분야를 찾아보세요</p>
            </div>
  
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="userName" className="block text-gray-700 font-medium">
                  이름 또는 닉네임
                </label>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-indigo-500 hover:text-indigo-700 transition-colors text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  정보
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={handleNameChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="이름을 입력하세요 (최소 2글자)"
                />
                {userName && userName.length >= 2 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {showInfo && (
                <div className="mt-3 p-4 bg-indigo-50 rounded-lg text-sm text-indigo-700 animate-fade-in">
                  <p>• 테스트는 10분 정도 소요됩니다</p>
                  <p>• 정직하게 답변할수록 더 정확한 결과를 얻을 수 있습니다</p>
                  <p>• 결과는 나중에 저장하거나 공유할 수 있습니다</p>
                </div>
              )}
            </div>
  
            <div className="flex flex-col space-y-3">
              <button
                onClick={onStart}
                disabled={buttonDisabled}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center ${
                  buttonDisabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1'
                }`}
              >
                {buttonDisabled ? '이름을 입력하세요' : '테스트 시작하기'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={onShowStats}
                className="w-full py-4 px-6 rounded-xl text-indigo-700 font-medium text-lg border-2 border-indigo-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                통계 보기
              </button>
            </div>
            
            {!isAuthenticated && (
              <div className="mt-5 py-3 px-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-amber-800 text-sm">
                  통계 기능을 이용하려면 로그인이 필요합니다.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="relative z-10 mt-6 text-center text-gray-500 text-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          <p>© 2023 DevMBTI - 당신의 개발 여정을 응원합니다</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;