import { API_BASE_URL, DEFAULT_TIMEOUT, getUserFriendlyErrorMessage, API_ENDPOINTS } from '../config';
import authService from './auth';

// API 요청 타임아웃 설정
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('요청 시간이 초과되었습니다.'));
    }, ms);
  });
};

// 기본 fetch 함수 (타임아웃 포함)
const fetchWithTimeout = async (url, options, timeout = DEFAULT_TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    timeoutPromise(timeout)
  ]);
};

// 오프라인 상태 확인
const isOffline = () => !navigator.onLine;

// 인증 토큰 가져오기
const getAuthToken = () => localStorage.getItem('authToken');

// API 서비스 객체
const apiService = {
  // 결과 분석 API
  analyzeResults: async (answers, userName) => {
    try {
      const response = await fetchWithTimeout(API_ENDPOINTS.ANALYZE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        },
        body: JSON.stringify({ answers, userName }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // 질문 생성 API
  generateQuestion: async (category) => {
    try {
      const response = await fetchWithTimeout(API_ENDPOINTS.QUESTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        },
        body: JSON.stringify({ category }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // 결과 조회 API
  getResult: async (id) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/results/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // 통계 조회 API
  getStats: async (days = 7) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/stats?days=${days}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default apiService; 