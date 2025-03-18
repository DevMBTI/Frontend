import { API_BASE_URL } from '../config';

// 토큰 저장소 키
const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

// 인증 서비스 객체
const authService = {
  // 회원가입
  signUp: async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '회원가입 중 오류가 발생했습니다.');
      }
      
      return data;
    } catch (error) {
      console.error('회원가입 오류:', error);
      throw error;
    }
  },
  
  // 회원가입 확인
  confirmSignUp: async (email, confirmationCode) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, confirmationCode }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '회원가입 확인 중 오류가 발생했습니다.');
      }
      
      return data;
    } catch (error) {
      console.error('회원가입 확인 오류:', error);
      throw error;
    }
  },
  
  // 로그인
  signIn: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '로그인 중 오류가 발생했습니다.');
      }
      
      // 토큰 저장
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({
        idToken: data.idToken,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: new Date().getTime() + (data.expiresIn * 1000)
      }));
      
      // 사용자 정보 가져오기
      await authService.fetchUserInfo();
      
      return data;
    } catch (error) {
      console.error('로그인 오류:', error);
      throw error;
    }
  },
  
  // 로그아웃
  signOut: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
  },
  
  // 비밀번호 찾기
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '비밀번호 찾기 중 오류가 발생했습니다.');
      }
      
      return data;
    } catch (error) {
      console.error('비밀번호 찾기 오류:', error);
      throw error;
    }
  },
  
  // 비밀번호 재설정
  resetPassword: async (email, confirmationCode, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, confirmationCode, newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '비밀번호 재설정 중 오류가 발생했습니다.');
      }
      
      return data;
    } catch (error) {
      console.error('비밀번호 재설정 오류:', error);
      throw error;
    }
  },
  
  // 사용자 정보 가져오기
  fetchUserInfo: async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.idToken}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '사용자 정보를 가져오는 중 오류가 발생했습니다.');
      }
      
      // 사용자 정보 저장
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      throw error;
    }
  },
  
  // 로그인 확인
  isAuthenticated: () => {
    const token = authService.getToken();
    return !!token && token.expiresAt > new Date().getTime();
  },
  
  // 사용자 정보 가져오기
  getUserInfo: () => {
    try {
      const userInfo = localStorage.getItem(USER_INFO_KEY);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('사용자 정보 파싱 오류:', error);
      return null;
    }
  },
  
  // 관리자 확인
  isAdmin: () => {
    const userInfo = authService.getUserInfo();
    return userInfo ? userInfo.isAdmin : false;
  },
  
  // 토큰 가져오기
  getToken: () => {
    try {
      const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
      return authToken ? JSON.parse(authToken) : null;
    } catch (error) {
      console.error('토큰 파싱 오류:', error);
      return null;
    }
  },
  
  // 인증 헤더 가져오기
  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { 'Authorization': `Bearer ${token.idToken}` } : {};
  }
};

export default authService; 