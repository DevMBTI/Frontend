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
    <div className="scrollable-screen bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      {/* 배경 애니메이션 요소 */}
      <div className="background-layer">
        <div className="absolute top-1/4 right-1/4 w-[120vw] h-[120vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-[120vw] h-[120vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 right-1/3 w-[120vw] h-[120vw] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-1/3 left-1/4 w-[120vw] h-[120vw] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        
        {/* 추가 배경 레이어 */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5"></div>
      </div>
      
      {/* 컨텐츠 영역 */}
      <div className="scrollable-content">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 py-6 pt-10 lg:pt-16">
          {/* 로고 및 타이틀 */}
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="w-24 h-24 relative mb-6 animate-fade-in">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg opacity-90"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-200 to-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/>
                  <path d="M17.99 10.571A.5.5 0 0 1 18 10.5v-1a3.5 3.5 0 1 0-7 0v1a.5.5 0 0 1 .01.071A6.516 6.516 0 0 1 12 17.5a6.5 6.5 0 0 1-1.01-5.929A.5.5 0 0 1 11 11.5v-2a1 1 0 0 0-1-1H7.5a.5.5 0 0 1-.5-.5 6.5 6.5 0 0 1 13 0 .5.5 0 0 1-.5.5H17a1 1 0 0 0-1 1v2a.5.5 0 0 1 .01.071 6.516 6.516 0 0 1 1.99 6.429"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 text-center animate-fade-in">
              개발자 적성 검사
            </h1>
            <p className="text-gray-700 text-center max-w-2xl text-lg md:text-xl animate-fade-in animation-delay-150">
              당신에게 가장 잘 맞는 개발 분야를 찾아드립니다
            </p>
          </div>
          
          {/* 테스트 시작 카드 */}
          <div className="w-full max-w-md backdrop-blur-md bg-white/60 rounded-2xl shadow-xl border border-white/70 overflow-hidden transform transition-all duration-300 hover:shadow-2xl animate-fade-in animation-delay-300">
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
          </div>
          
          <div className="relative z-10 mt-6 text-center text-gray-500 text-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <p>© 2025 DevMBTI - 당신의 개발 여정을 응원합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;