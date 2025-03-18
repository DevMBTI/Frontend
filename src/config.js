// API 기본 URL 설정 (환경별)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API 엔드포인트 설정
export const API_ENDPOINTS = {
  ANALYZE: `${API_BASE_URL}/api/analyze`,
  QUESTION: `${API_BASE_URL}/api/question`,
  STATS: `${API_BASE_URL}/api/stats`,
  AI_GENERATE: `${API_BASE_URL}/api/ai/generate-question`
};

// API 요청 타임아웃 설정 (밀리초)
export const DEFAULT_TIMEOUT = 15000;

// 개발자 경로 상세 설정
export const DEVELOPER_PATHS = {
  frontend: {
    name: '프론트엔드 개발자',
    description: '사용자 인터페이스와 경험을 디자인하고 구현하는 개발자',
    color: '#6366f1' // indigo-600
  },
  backend: {
    name: '백엔드 개발자',
    description: '서버와 데이터베이스 시스템을 설계하고 구현하는 개발자',
    color: '#10b981' // emerald-600
  },
  fullstack: {
    name: '풀스택 개발자',
    description: '프론트엔드와 백엔드를 모두 다루는 개발자',
    color: '#d946ef' // fuchsia-600
  },
  data: {
    name: '데이터 과학자/엔지니어',
    description: '데이터를 분석하고 모델링하여 인사이트를 도출하는 전문가',
    color: '#0ea5e9' // sky-600
  },
  devops: {
    name: 'DevOps 엔지니어',
    description: '개발과 운영을 통합하여 시스템을 자동화하고 관리하는 전문가',
    color: '#f59e0b' // amber-600
  },
  // 확장된 개발자 카테고리
  mobile: {
    name: '모바일 앱 개발자',
    description: 'iOS, Android 또는 크로스 플랫폼 앱을 개발하는 전문가',
    color: '#3b82f6' // blue-600
  },
  security: {
    name: '보안 엔지니어',
    description: '시스템과 데이터의 보안을 설계하고 관리하는 전문가',
    color: '#64748b' // slate-600
  },
  gamedev: {
    name: '게임 개발자',
    description: '인터랙티브한 게임 경험을 설계하고 개발하는 전문가',
    color: '#ec4899' // pink-600
  },
  embedded: {
    name: '임베디드 시스템 개발자',
    description: '하드웨어 장치에 내장되는 소프트웨어를 개발하는 전문가',
    color: '#eab308' // yellow-600
  },
  ai: {
    name: 'AI/ML 엔지니어',
    description: '인공지능과 머신러닝 시스템을 설계하고 개발하는 전문가',
    color: '#8b5cf6' // violet-600
  }
};

// 사용자 친화적인 에러 메시지 변환
export const getUserFriendlyErrorMessage = (error) => {
  if (!error) return '알 수 없는 오류가 발생했습니다.';
  
  if (error.userFriendlyMessage) {
    return error.userFriendlyMessage;
  }
  
  if (error.message) {
    if (error.message.includes('timeout') || error.message.includes('시간 초과')) {
      return '서버 응답이 너무 오래 걸립니다. 네트워크 연결을 확인하거나 나중에 다시 시도해주세요.';
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
      return '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
    }
    
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
}; 