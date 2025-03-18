import React, { useState, useEffect } from 'react';
import authService from '../services/auth';

const WelcomeScreen = ({ onStart, onUserNameChange, userName, onShowStats }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-100">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="graph-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
        </svg>
      </div>
      
      {/* 로그인/로그아웃 상태 표시 */}
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-10 flex items-center">
          <span className="text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md text-sm font-medium mr-2">
            {isAdmin ? '관리자' : '사용자'}
          </span>
          <button 
            onClick={() => authService.signOut()}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            로그아웃
          </button>
        </div>
      )}
      
      <div className="relative z-10 max-w-xl w-full px-6 py-12 bg-white rounded-xl shadow-xl border border-indigo-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">개발자 적성 테스트</h1>
          <p className="text-gray-600 text-lg mb-6">
            당신에게 가장 적합한 개발 분야를 찾아보세요
          </p>
          <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 mb-2">
            이 테스트는 개인의 성향과 선호도를 기반으로 가장 잘 맞는 개발 분야를 제안합니다.
          </p>
          <p className="text-gray-600">
            10분 정도의 시간이 소요되며, 정직하게 답변할수록 더 정확한 결과를 얻을 수 있습니다.
          </p>
        </div>
  
        <div className="mb-6">
          <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">
            이름 또는 닉네임을 입력하세요
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleNameChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="이름 입력 (최소 2글자)"
          />
        </div>
  
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onStart}
            disabled={buttonDisabled}
            className={`flex-1 px-6 py-3 rounded-lg text-white font-medium ${
              buttonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md'
            }`}
          >
            테스트 시작하기
          </button>
          
          <button
            onClick={onShowStats}
            className="flex-1 px-6 py-3 rounded-lg border border-indigo-300 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-sm"
          >
            통계 보기
          </button>
        </div>
        
        {!isAuthenticated && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              <span className="text-amber-600 font-medium">알림:</span> 통계를 보려면 로그인이 필요합니다.
            </p>
          </div>
        )}
      </div>
      
      <div className="relative z-10 mt-8 text-center text-gray-500 text-sm">
        <p>© 2023 DevMBTI - 모든 권리 보유</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;