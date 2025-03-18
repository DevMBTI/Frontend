import { API_BASE_URL, API_ENDPOINTS } from '../config';
import authService from './auth';

// 타임아웃 설정 (15초)
const TIMEOUT = 15000;

// AI 생성 서비스
const aiService = {
  // AI 생성 문제 가져오기
  generateQuestion: async (category, difficulty = 'medium') => {
    try {
      console.log(`Generating question for category: ${category}, difficulty: ${difficulty}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
      
      // 유효한 카테고리 값 확인
      const validCategories = ['frontend', 'backend', 'fullstack', 'data', 'devops', 'mobile', 'security', 'gamedev', 'embedded', 'ai'];
      
      if (!validCategories.includes(category)) {
        console.error(`Invalid category: ${category}`);
        throw new Error(`유효하지 않은 카테고리입니다: ${category}`);
      }
      
      const response = await fetch(API_ENDPOINTS.AI_GENERATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        },
        body: JSON.stringify({ category, difficulty }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error response:', errorData);
        throw new Error(errorData.message || errorData.error || `서버 오류: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Received question:', result);
      return result;
    } catch (error) {
      console.error('AI 문제 생성 오류:', error);
      
      // 로컬 폴백 (서버 문제 시 사용)
      return {
        question: `${category} 개발에 관한 질문입니다 (로컬 생성)`,
        options: [
          "첫 번째 선택지",
          "두 번째 선택지",
          "세 번째 선택지",
          "네 번째 선택지"
        ],
        answer: Math.floor(Math.random() * 4),
        explanation: "현재 AI 생성 시스템에 연결할 수 없어 로컬에서 생성된 문제입니다."
      };
    }
  },
  
  // AI 성향 분석
  analyzePersonality: async (answers) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
      
      const response = await fetch(`${API_BASE_URL}/api/ai/analyze-personality`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeader()
        },
        body: JSON.stringify({ answers }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `서버 오류: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI 성향 분석 오류:', error);
      throw error;
    }
  },
  
  // 로컬 문제 생성 (서버 연결 안될 때 사용)
  generateLocalQuestion: (category) => {
    const questions = {
      frontend: {
        questions: [
          {
            question: "React에서 상태 관리를 위한 Hook은 무엇인가요?",
            options: ["useEffect", "useState", "useContext", "useCallback"],
            answer: 1,
            explanation: "useState는 React 함수 컴포넌트에서 상태를 관리하기 위한 Hook입니다."
          },
          {
            question: "CSS Grid와 Flexbox의 주요 차이점은 무엇인가요?",
            options: [
              "Flexbox는 1차원 레이아웃, Grid는 2차원 레이아웃을 위한 것이다",
              "Flexbox는 최신 기술이고 Grid는 구형 기술이다",
              "Grid는 모바일에서만 작동한다",
              "Flexbox는 IE에서 지원되지 않는다"
            ],
            answer: 0,
            explanation: "Flexbox는 한 방향(행 또는 열)의 레이아웃을 위한 것이고, Grid는 행과 열 모두를 동시에 제어할 수 있는 2차원 레이아웃 시스템입니다."
          }
        ]
      },
      backend: {
        questions: [
          {
            question: "REST API에서 PUT과 PATCH 메서드의 차이점은 무엇인가요?",
            options: [
              "PUT은 리소스 전체를 대체하고, PATCH는 부분 수정을 위한 것이다",
              "PUT은 읽기 작업, PATCH는 쓰기 작업을 위한 것이다",
              "PUT은 안전하지만 PATCH는 보안 취약점이 있다",
              "차이가 없다, 둘 다 같은 용도로 사용된다"
            ],
            answer: 0,
            explanation: "PUT은 리소스를 완전히 대체하는 반면, PATCH는 리소스의 일부만 수정하는 데 사용됩니다."
          }
        ]
      },
      // 다른 카테고리의 문제들도 추가
    };
    
    const categoryQuestions = questions[category]?.questions || questions.frontend.questions;
    return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  }
};

export default aiService; 