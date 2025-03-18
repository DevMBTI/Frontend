import React, { useState, useEffect } from 'react';
import authService from '../../services/auth';
import AuthScreen from './AuthScreen';
import StatsScreen from '../StatsScreen';

// 인증이 필요한 화면을 래핑하는 컴포넌트
const AuthWrapper = ({ children, requireAuth = false, requireAdmin = false, hideBanner = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  
  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const userInfo = authService.getUserInfo();
        setIsAdmin(userInfo?.isAdmin || false);
        
        // 만약 사용자 정보가 없으면 가져오기 시도
        if (!userInfo) {
          try {
            await authService.fetchUserInfo();
            setIsAdmin(authService.isAdmin());
          } catch (error) {
            console.error('사용자 정보 조회 오류:', error);
            // 인증 토큰이 만료되었거나 유효하지 않을 경우 로그아웃
            if (error.message?.includes('인증') || error.status === 401) {
              authService.signOut();
              setIsAuthenticated(false);
            }
          }
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // 로그인 성공 처리
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAdmin(authService.isAdmin());
    setShowAuthScreen(false);
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
    authService.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  
  // 로딩 중이면 로딩 화면 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // 인증이 필요한 컨텐츠이고 로그인하지 않은 경우
  if (requireAuth && !isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }
  
  // 관리자 전용 컨텐츠이고 관리자가 아닌 경우
  if (requireAdmin && !isAdmin) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">접근 제한됨:</strong>
        <span className="block sm:inline"> 이 페이지는 관리자만 접근할 수 있습니다.</span>
        <button 
          onClick={handleLogout}
          className="mt-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          로그아웃
        </button>
      </div>
    );
  }
  
  // 인증이 필요한 컨텐츠이고 로그인한 경우 또는 인증이 필요없는 컨텐츠
  return (
    <div>
      {isAuthenticated && !hideBanner && (
        <div className="bg-indigo-100 p-2 mb-4 flex justify-between items-center">
          <div>
            <span className="font-semibold">로그인됨: </span>
            <span>{authService.getUserInfo()?.email}</span>
            {isAdmin && <span className="ml-2 bg-indigo-500 text-white px-2 py-1 text-xs rounded">관리자</span>}
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default AuthWrapper; 