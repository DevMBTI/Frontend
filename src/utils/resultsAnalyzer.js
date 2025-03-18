import { pathDescriptions, competencyDimensions } from './questions';

// 다차원 역량 분석 함수
const analyzeCompetencies = (answers) => {
  // 8가지 역량 차원 초기화
  const competencies = {
    technicalDepth: 0,      // 기술적 깊이
    creativity: 0,          // 창의성
    systemThinking: 0,      // 시스템적 사고
    detailOrientation: 0,   // 세부사항 지향성
    peopleFocus: 0,         // 사람/협업 중심
    analyticalThinking: 0,  // 분석적 사고
    learningAgility: 0,     // 학습 민첩성
    resilience: 0           // 문제 해결 탄력성
  };
  
  // 문제 해결 접근 방식 반영
  if (answers.problemSolving === 'analytical') {
    competencies.analyticalThinking += 2;
    competencies.technicalDepth += 1;
  } else if (answers.problemSolving === 'creative') {
    competencies.creativity += 2;
    competencies.resilience += 1;
  } else if (answers.problemSolving === 'practical') {
    competencies.technicalDepth += 1;
    competencies.detailOrientation += 1;
  } else if (answers.problemSolving === 'collaborative') {
    competencies.peopleFocus += 2;
    competencies.learningAgility += 1;
  } else if (answers.problemSolving === 'intuitive') {
    competencies.resilience += 1;
    competencies.systemThinking += 1;
  }
  
  // 작업 방식 반영
  if (answers.workStyle === 'planning') {
    competencies.systemThinking += 2;
    competencies.detailOrientation += 1;
  } else if (answers.workStyle === 'iterative') {
    competencies.learningAgility += 2;
    competencies.resilience += 1;
  } else if (answers.workStyle === 'collaborative') {
    competencies.peopleFocus += 2;
    competencies.creativity += 1;
  } else if (answers.workStyle === 'exploratory') {
    competencies.creativity += 1;
    competencies.learningAgility += 1;
    competencies.resilience += 1;
  } else if (answers.workStyle === 'focused') {
    competencies.technicalDepth += 2;
    competencies.detailOrientation += 1;
  }
  
  // 학습 스타일 반영
  if (answers.learningStyle === 'handson') {
    competencies.technicalDepth += 1;
    competencies.learningAgility += 1;
  } else if (answers.learningStyle === 'conceptual') {
    competencies.analyticalThinking += 2;
    competencies.systemThinking += 1;
  } else if (answers.learningStyle === 'social') {
    competencies.peopleFocus += 2;
    competencies.learningAgility += 1;
  } else if (answers.learningStyle === 'visual') {
    competencies.creativity += 1;
    competencies.detailOrientation += 1;
  } else if (answers.learningStyle === 'structured') {
    competencies.systemThinking += 1;
    competencies.detailOrientation += 1;
  }
  
  // 만족감 요소 반영
  if (answers.satisfaction === 'userImpact') {
    competencies.peopleFocus += 2;
  } else if (answers.satisfaction === 'technicalChallenge') {
    competencies.technicalDepth += 2;
  } else if (answers.satisfaction === 'creativity') {
    competencies.creativity += 2;
  } else if (answers.satisfaction === 'optimization') {
    competencies.analyticalThinking += 1;
    competencies.systemThinking += 1;
  } else if (answers.satisfaction === 'learning') {
    competencies.learningAgility += 2;
  }
  
  // 팀 역할 반영
  if (answers.teamRole === 'architect') {
    competencies.systemThinking += 2;
    competencies.technicalDepth += 1;
  } else if (answers.teamRole === 'implementer') {
    competencies.technicalDepth += 2;
    competencies.analyticalThinking += 1;
  } else if (answers.teamRole === 'coordinator') {
    competencies.peopleFocus += 2;
    competencies.systemThinking += 1;
  } else if (answers.teamRole === 'innovator') {
    competencies.creativity += 2;
    competencies.resilience += 1;
  } else if (answers.teamRole === 'detailer') {
    competencies.detailOrientation += 3;
  }
  
  // 도전 유형 반영
  if (answers.challenge === 'algorithm') {
    competencies.analyticalThinking += 2;
    competencies.technicalDepth += 1;
  } else if (answers.challenge === 'userExperience') {
    competencies.peopleFocus += 1;
    competencies.creativity += 1;
    competencies.detailOrientation += 1;
  } else if (answers.challenge === 'architecture') {
    competencies.systemThinking += 2;
    competencies.technicalDepth += 1;
  } else if (answers.challenge === 'integration') {
    competencies.systemThinking += 1;
    competencies.technicalDepth += 1;
    competencies.resilience += 1;
  } else if (answers.challenge === 'performance') {
    competencies.analyticalThinking += 2;
    competencies.detailOrientation += 1;
  }
  
  // 강점 자가 평가 반영
  if (answers.strengthsAssessment === 'creativeDesign') {
    competencies.creativity += 2;
  } else if (answers.strengthsAssessment === 'logicalThinking') {
    competencies.analyticalThinking += 2;
  } else if (answers.strengthsAssessment === 'systemDesign') {
    competencies.systemThinking += 2;
  } else if (answers.strengthsAssessment === 'peopleSkills') {
    competencies.peopleFocus += 2;
  } else if (answers.strengthsAssessment === 'attentionToDetail') {
    competencies.detailOrientation += 2;
  } else if (answers.strengthsAssessment === 'bigPicture') {
    competencies.systemThinking += 1;
    competencies.analyticalThinking += 1;
  } else if (answers.strengthsAssessment === 'problemSolving') {
    competencies.resilience += 2;
    competencies.analyticalThinking += 1;
  } else if (answers.strengthsAssessment === 'learning') {
    competencies.learningAgility += 3;
  }
  
  // 상황 기반 선호 역할 반영
  if (answers.scenarioBased === 'frontend') {
    competencies.creativity += 1;
    competencies.detailOrientation += 1;
  } else if (answers.scenarioBased === 'backend') {
    competencies.technicalDepth += 1;
    competencies.analyticalThinking += 1;
  } else if (answers.scenarioBased === 'fullstack') {
    competencies.learningAgility += 1;
    competencies.systemThinking += 1;
  } else if (answers.scenarioBased === 'devops') {
    competencies.systemThinking += 2;
  } else if (answers.scenarioBased === 'data') {
    competencies.analyticalThinking += 2;
  } else if (answers.scenarioBased === 'security') {
    competencies.detailOrientation += 1;
    competencies.analyticalThinking += 1;
  } else if (answers.scenarioBased === 'projectManager') {
    competencies.peopleFocus += 2;
  }
  
  // 점수 정규화 (최대 10점 기준)
  Object.keys(competencies).forEach(key => {
    competencies[key] = Math.min(Math.round(competencies[key] * 1.5), 10);
  });
  
  return competencies;
};

// 역량 기반으로 분야별 적합도 점수 계산
const calculateFieldScores = (competencies, answers) => {
  // 분야별 점수 초기화
  const fieldScores = {
    frontend: 0,
    backend: 0,
    fullstack: 0,
    data: 0,
    devops: 0,
    mobile: 0,
    security: 0,
    gamedev: 0,
    embedded: 0,
    ai: 0
  };
  
  // 프론트엔드 점수 계산 - 시각적 창의성, 세부 사항, 사용자 중심
  fieldScores.frontend = (
    competencies.creativity * 0.25 +
    competencies.detailOrientation * 0.25 +
    competencies.peopleFocus * 0.2 +
    competencies.learningAgility * 0.15 +
    competencies.resilience * 0.15
  );
  
  // 백엔드 점수 계산 - 기술적 깊이, 분석적 사고, 시스템 사고
  fieldScores.backend = (
    competencies.technicalDepth * 0.25 +
    competencies.analyticalThinking * 0.25 +
    competencies.systemThinking * 0.2 +
    competencies.detailOrientation * 0.15 +
    competencies.resilience * 0.15
  );
  
  // 풀스택 점수 계산 - 학습 민첩성, 시스템 사고, 균형잡힌 역량
  fieldScores.fullstack = (
    competencies.learningAgility * 0.3 +
    competencies.systemThinking * 0.2 +
    competencies.technicalDepth * 0.15 +
    competencies.peopleFocus * 0.15 +
    competencies.creativity * 0.1 +
    competencies.resilience * 0.1
  );
  
  // 데이터 점수 계산 - 분석적 사고, 기술적 깊이
  fieldScores.data = (
    competencies.analyticalThinking * 0.3 +
    competencies.technicalDepth * 0.25 +
    competencies.systemThinking * 0.15 +
    competencies.detailOrientation * 0.15 +
    competencies.learningAgility * 0.15
  );
  
  // DevOps 점수 계산 - 시스템 사고, 자동화, 문제 해결
  fieldScores.devops = (
    competencies.systemThinking * 0.3 +
    competencies.technicalDepth * 0.2 +
    competencies.resilience * 0.2 +
    competencies.learningAgility * 0.15 +
    competencies.analyticalThinking * 0.15
  );
  
  // 모바일 앱 개발 점수 계산 - 사용자 경험, 다양한 역량
  fieldScores.mobile = (
    competencies.creativity * 0.2 +
    competencies.detailOrientation * 0.2 +
    competencies.technicalDepth * 0.2 +
    competencies.peopleFocus * 0.2 +
    competencies.learningAgility * 0.2
  );
  
  // 보안 점수 계산 - 분석적 사고, 세부사항, 문제 해결
  fieldScores.security = (
    competencies.analyticalThinking * 0.3 +
    competencies.detailOrientation * 0.3 +
    competencies.technicalDepth * 0.2 +
    competencies.systemThinking * 0.1 +
    competencies.resilience * 0.1
  );
  
  // 게임 개발 점수 계산 - 창의성, 기술적 깊이, 사용자 경험
  fieldScores.gamedev = (
    competencies.creativity * 0.3 +
    competencies.technicalDepth * 0.25 +
    competencies.peopleFocus * 0.15 +
    competencies.systemThinking * 0.15 +
    competencies.resilience * 0.15
  );
  
  // 임베디드 시스템 점수 계산 - 기술적 깊이, 세부사항, 시스템 사고
  fieldScores.embedded = (
    competencies.technicalDepth * 0.3 +
    competencies.detailOrientation * 0.25 +
    competencies.systemThinking * 0.2 +
    competencies.analyticalThinking * 0.15 +
    competencies.resilience * 0.1
  );
  
  // AI/ML 점수 계산 - 분석적 사고, 학습 민첩성, 기술적 깊이
  fieldScores.ai = (
    competencies.analyticalThinking * 0.3 +
    competencies.technicalDepth * 0.25 +
    competencies.learningAgility * 0.2 +
    competencies.systemThinking * 0.15 +
    competencies.resilience * 0.1
  );
  
  // 경험 수준에 따른 가중치 적용
  if (answers.experience) {
    const experienceModifiers = {
      beginner: {
        learningCurve: {
          frontend: 1.1,    // 초보자에게 상대적으로 진입 장벽이 낮음
          backend: 0.9,     // 초보자에게 더 도전적일 수 있음
          fullstack: 0.8,   // 초보자에게 범위가 넓어 어려울 수 있음
          data: 0.9,
          devops: 0.8,
          mobile: 1.0,
          security: 0.8,
          gamedev: 0.9,
          embedded: 0.8,
          ai: 0.8
        }
      },
      junior: {
        learningCurve: {
          frontend: 1.05,
          backend: 1.0,
          fullstack: 0.9,
          data: 0.95,
          devops: 0.9,
          mobile: 1.0,
          security: 0.9,
          gamedev: 0.95,
          embedded: 0.9,
          ai: 0.9
        }
      },
      intermediate: {
        // 중급자는 기본 점수 유지 (균형 있게)
        learningCurve: {
          frontend: 1.0,
          backend: 1.0,
          fullstack: 1.0,
          data: 1.0,
          devops: 1.0,
          mobile: 1.0,
          security: 1.0,
          gamedev: 1.0,
          embedded: 1.0,
          ai: 1.0
        }
      },
      senior: {
        // 고급자는 전문성이 필요한 분야에 유리
        learningCurve: {
          frontend: 1.0,
          backend: 1.05,
          fullstack: 1.1,
          data: 1.05,
          devops: 1.1,
          mobile: 1.0,
          security: 1.1,
          gamedev: 1.0,
          embedded: 1.1,
          ai: 1.05
        }
      },
      expert: {
        // 전문가는 깊이 있는 기술이 필요한 분야에 유리
        learningCurve: {
          frontend: 1.0,
          backend: 1.1,
          fullstack: 1.05,
          data: 1.15,
          devops: 1.1,
          mobile: 1.0,
          security: 1.15,
          gamedev: 1.05,
          embedded: 1.15,
          ai: 1.2
        }
      }
    };
    
    // 경험 수준에 따른 조정
    const modifier = experienceModifiers[answers.experience]?.learningCurve || {};
    Object.keys(fieldScores).forEach(field => {
      fieldScores[field] *= (modifier[field] || 1.0);
    });
  }
  
  // 흥미 분야 반영
  if (answers.futureInterest) {
    const interestBoost = {
      'web3': ['frontend', 'backend', 'fullstack'],
      'ai': ['ai', 'data'],
      'ux': ['frontend', 'mobile', 'gamedev'],
      'cloud': ['devops', 'backend'],
      'mobile': ['mobile', 'frontend'],
      'security': ['security', 'backend'],
      'iot': ['embedded', 'mobile'],
      'gamedev': ['gamedev', 'frontend']
    };
    
    const fieldsToBoost = interestBoost[answers.futureInterest] || [];
    fieldsToBoost.forEach(field => {
      fieldScores[field] *= 1.1; // 10% 증가
    });
  }
  
  // 직접 선택한 선호도 반영
  if (answers.preference) {
    fieldScores[answers.preference] *= 1.15; // 15% 증가
  }
  
  // 점수 정규화 (최대 100점 기준)
  Object.keys(fieldScores).forEach(key => {
    fieldScores[key] = Math.round(fieldScores[key] * 10);
    fieldScores[key] = Math.min(fieldScores[key], 100); // 최대 100점
  });
  
  return fieldScores;
};

// 테스트 결과를 분석하여 점수를 계산하는 함수
export const analyzeResults = (answers) => {
  // 1. 역량 분석
  const competencies = analyzeCompetencies(answers);
  
  // 2. 분야별 점수 계산
  const scores = calculateFieldScores(competencies, answers);
  
  // 3. 최고 점수 분야 찾기
  const maxScore = Math.max(...Object.values(scores));
  const topPaths = Object.keys(scores)
    .filter(key => scores[key] >= maxScore - 5) // 최고점에서 5점 이내인 분야들
    .sort((a, b) => scores[b] - scores[a]);
  
  const primaryRecommendation = topPaths[0] || 'fullstack';
  const secondaryRecommendation = topPaths[1] || 
    (primaryRecommendation === 'frontend' ? 'fullstack' : 
     primaryRecommendation === 'backend' ? 'fullstack' : 'frontend');
  
  // 4. 상위 3개 분야 및 점수 정보 
  const topThreeFields = Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3)
    .map(field => ({
      id: field,
      name: pathDescriptions[field].title,
      score: scores[field],
      description: pathDescriptions[field].description,
      skills: pathDescriptions[field].skills,
      strengthsNeeded: pathDescriptions[field].strengthsNeeded || [],
      challengesExpected: pathDescriptions[field].challengesExpected || []
    }));
  
  // 5. 역량 요약 - 상위 3개 역량과 하위 2개 역량
  const competencyRanking = Object.keys(competencies)
    .sort((a, b) => competencies[b] - competencies[a]);
  
  const topCompetencies = competencyRanking.slice(0, 3).map(key => ({
    id: key,
    name: competencyDimensions[key],
    score: competencies[key]
  }));
  
  const improvementAreas = competencyRanking.slice(-2).map(key => ({
    id: key,
    name: competencyDimensions[key],
    score: competencies[key]
  }));
  
  // 경험 수준에 따른 학습 경로 조정
  let learningPathLevel = 'standard';
  if (answers.experience === 'beginner' || answers.experience === 'junior') {
    learningPathLevel = 'beginner';
  } else if (answers.experience === 'senior' || answers.experience === 'expert') {
    learningPathLevel = 'advanced';
  }
  
  // 최종 결과 객체
  return {
    recommendedPath: primaryRecommendation,
    secondaryPath: secondaryRecommendation,
    scores: scores,
    details: pathDescriptions[primaryRecommendation],
    secondaryDetails: pathDescriptions[secondaryRecommendation],
    topFields: topThreeFields,
    competencies: competencies,
    topCompetencies: topCompetencies,
    improvementAreas: improvementAreas,
    learningPathLevel: learningPathLevel,
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