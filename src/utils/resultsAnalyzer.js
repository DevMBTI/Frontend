import { pathDescriptions } from './questions';

// 테스트 결과를 분석하여 점수를 계산하는 함수
export const analyzeResults = (answers) => {
  // 점수 계산 (간단한 알고리즘)
  let frontendScore = 0;
  let backendScore = 0;
  let fullstackScore = 0;
  let dataScore = 0;
  let devopsScore = 0;
  let mobileScore = 0;
  let securityScore = 0;
  let gamedevScore = 0;
  let embeddedScore = 0;
  let aiScore = 0;
  
  // 시각적 선호도 관련 질문은 프론트엔드 점수에 가중치 부여
  frontendScore += (answers.visual || 3) * 2;
  frontendScore += (answers.detail || 3) * 2;
  frontendScore += (answers.creativity || 3) * 2;
  frontendScore += (answers.userInteraction || 3) * 1.5;
  
  // 시스템, 데이터 관련 질문은 백엔드 점수에 가중치 부여
  backendScore += (6 - (answers.visual || 3)) * 1;
  backendScore += (6 - (answers.detail || 3)) * 1;
  backendScore += (6 - (answers.problem || 3)) * 2;
  backendScore += (6 - (answers.creativity || 3)) * 1;
  backendScore += (6 - (answers.data || 3)) * 1.5;
  backendScore += (6 - (answers.system || 3)) * 2;
  
  // 풀스택 점수는 중간적 성향
  fullstackScore = (frontendScore + backendScore) / 2;
  
  // 데이터 분석 점수
  dataScore += (6 - (answers.data || 3)) * 3;
  dataScore += (6 - (answers.system || 3)) * 1.5;
  dataScore += (6 - (answers.problem || 3)) * 1.5;
  
  // DevOps 점수
  devopsScore += (6 - (answers.system || 3)) * 2;
  devopsScore += (6 - (answers.problem || 3)) * 1.5;
  devopsScore += (answers.team || 3) * 1;
  
  // 모바일 앱 개발 점수
  mobileScore += (answers.visual || 3) * 1.5;
  mobileScore += (answers.detail || 3) * 1.5;
  mobileScore += (answers.userInteraction || 3) * 2;
  mobileScore += (answers.creativity || 3) * 1;
  
  // 보안 엔지니어 점수
  securityScore += (6 - (answers.system || 3)) * 2.5;
  securityScore += (6 - (answers.problem || 3)) * 2;
  securityScore += (answers.data || 3) * 1;
  
  // 게임 개발 점수
  gamedevScore += (answers.visual || 3) * 1.5;
  gamedevScore += (answers.creativity || 3) * 2.5;
  gamedevScore += (6 - (answers.problem || 3)) * 1.5;
  gamedevScore += (answers.userInteraction || 3) * 1.5;
  
  // 임베디드 시스템 개발 점수
  embeddedScore += (6 - (answers.system || 3)) * 2.5;
  embeddedScore += (6 - (answers.problem || 3)) * 2;
  embeddedScore += (6 - (answers.visual || 3)) * 1;
  
  // AI/ML 엔지니어 점수
  aiScore += (6 - (answers.data || 3)) * 2.5;
  aiScore += (6 - (answers.problem || 3)) * 2;
  aiScore += (6 - (answers.system || 3)) * 1;
  
  // 직접 선택한 선호도 반영
  if (answers.preference === 'frontend') frontendScore += 5;
  if (answers.preference === 'backend') backendScore += 5;
  if (answers.preference === 'fullstack') fullstackScore += 5;
  if (answers.preference === 'data') dataScore += 5;
  if (answers.preference === 'devops') devopsScore += 5;
  if (answers.preference === 'mobile') mobileScore += 5;
  if (answers.preference === 'security') securityScore += 5;
  if (answers.preference === 'gamedev') gamedevScore += 5;
  if (answers.preference === 'embedded') embeddedScore += 5;
  if (answers.preference === 'ai') aiScore += 5;
  
  // 결과 생성
  const scores = {
    frontend: Math.round(frontendScore),
    backend: Math.round(backendScore),
    fullstack: Math.round(fullstackScore),
    data: Math.round(dataScore),
    devops: Math.round(devopsScore),
    mobile: Math.round(mobileScore),
    security: Math.round(securityScore),
    gamedev: Math.round(gamedevScore),
    embedded: Math.round(embeddedScore),
    ai: Math.round(aiScore)
  };
  
  // 최고 점수 분야 찾기
  const maxScore = Math.max(...Object.values(scores));
  const recommendedPaths = Object.keys(scores).filter(key => scores[key] === maxScore);
  const primaryRecommendation = recommendedPaths[0];
  
  // 최종 결과 반환
  return {
    recommendedPath: primaryRecommendation,
    scores: scores,
    details: pathDescriptions[primaryRecommendation],
    allPaths: pathDescriptions
  };
};

// AI 분석 결과 시뮬레이션 함수 (Promise 반환)
export const simulateAIAnalysis = (answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = analyzeResults(answers);
      resolve(result);
    }, 2000); // 로딩 효과를 위한 지연
  });
};