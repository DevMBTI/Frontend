// 성향 테스트 질문들
export const personalityQuestions = [
  {
    id: 'experience',
    question: '개발 경험이 어느 정도 되시나요?',
    options: [
      { value: 'beginner', label: '입문자 - 아직 실무 경험은 없지만 관심이 있습니다' },
      { value: 'junior', label: '초급 - 기본적인 프로그래밍 경험이 있습니다 (1년 미만)' },
      { value: 'intermediate', label: '중급 - 몇 년의 개발 경험이 있습니다 (1-3년)' },
      { value: 'senior', label: '고급 - 실무 경험이 풍부합니다 (3년 이상)' },
      { value: 'expert', label: '전문가 - 특정 분야에서 심화된 전문성을 갖고 있습니다' }
    ],
    category: 'background'
  },
  {
    id: 'background',
    question: '현재까지 어떤 분야의 개발에 가장 관심을 가져왔나요?',
    options: [
      { value: 'interface', label: '사용자 인터페이스나 웹/앱 디자인' },
      { value: 'system', label: '시스템 아키텍처나 백엔드 개발' },
      { value: 'data', label: '데이터 분석이나 알고리즘' },
      { value: 'mixed', label: '여러 영역에 골고루 관심이 있음' },
      { value: 'none', label: '아직 특별히 깊게 관심을 가진 분야가 없음' }
    ],
    category: 'background'
  },
  {
    id: 'workStyle',
    question: '프로젝트를 진행할 때 어떤 작업 방식을 선호하시나요?',
    options: [
      { value: 'planning', label: '체계적인 계획을 세우고 단계별로 진행하는 것을 선호합니다' },
      { value: 'iterative', label: '프로토타입을 빠르게 만들고 계속 개선하는 방식을 선호합니다' },
      { value: 'collaborative', label: '팀원들과 아이디어를 공유하며 함께 발전시키는 것을 선호합니다' },
      { value: 'exploratory', label: '문제를 탐색하고 여러 접근법을 시도하는 것을 선호합니다' },
      { value: 'focused', label: '한 가지 문제에 깊이 집중하여 완벽한 해결책을 찾는 것을 선호합니다' }
    ],
    category: 'workPreference'
  },
  {
    id: 'problemSolving',
    question: '문제 해결 과정에서 어떤 접근 방식을 가장 자주 사용하시나요?',
    options: [
      { value: 'analytical', label: '문제를 작은 부분으로 나누어 체계적으로 분석합니다' },
      { value: 'creative', label: '새로운 관점에서 창의적인 해결책을 떠올립니다' },
      { value: 'practical', label: '이미 검증된 방식을 찾아 효율적으로 적용합니다' },
      { value: 'collaborative', label: '다른 사람들의 의견을 모아 최적의 해결책을 찾습니다' },
      { value: 'intuitive', label: '직관과 경험을 바탕으로 문제의 핵심을 파악합니다' }
    ],
    category: 'cognition'
  },
  {
    id: 'learningStyle',
    question: '새로운 기술이나 개념을 학습할 때 어떤 방식을 선호하시나요?',
    options: [
      { value: 'handson', label: '직접 코드를 작성하며 실습으로 배우는 것이 효과적입니다' },
      { value: 'conceptual', label: '개념과 원리를 먼저 이해한 후 적용하는 것을 선호합니다' },
      { value: 'social', label: '다른 사람들과 토론하거나 협업하며 배우는 것이 좋습니다' },
      { value: 'visual', label: '다이어그램, 영상 등 시각적 자료로 배우는 것이 효과적입니다' },
      { value: 'structured', label: '체계적인 커리큘럼을 따라 단계별로 학습하는 것을 선호합니다' }
    ],
    category: 'learning'
  },
  {
    id: 'satisfaction',
    question: '어떤 상황에서 가장 큰 직업적 만족감을 느끼시나요?',
    options: [
      { value: 'userImpact', label: '사용자들이 내 작업 결과를 직접 사용하고 가치를 느낄 때' },
      { value: 'technicalChallenge', label: '복잡한 기술적 문제를 성공적으로 해결했을 때' },
      { value: 'creativity', label: '창의적인 아이디어를 구현하여 혁신적인 결과물을 만들었을 때' },
      { value: 'optimization', label: '시스템이나 프로세스를 최적화하여 효율성을 크게 향상시켰을 때' },
      { value: 'learning', label: '새로운 기술이나 도메인에 대해 깊이 이해하게 되었을 때' }
    ],
    category: 'motivation'
  },
  {
    id: 'teamRole',
    question: '팀 프로젝트에서 자연스럽게 맡게 되는 역할은 무엇인가요?',
    options: [
      { value: 'architect', label: '전체 시스템 구조를 설계하고 기술적 방향을 제시하는 역할' },
      { value: 'implementer', label: '핵심 기능을 효율적으로 구현하고 최적화하는 역할' },
      { value: 'coordinator', label: '팀원들의 작업을 조율하고 의사소통을 촉진하는 역할' },
      { value: 'innovator', label: '새로운 아이디어를 제안하고 창의적인 해결책을 찾는 역할' },
      { value: 'detailer', label: '세부 사항을 꼼꼼히 점검하고 품질을 높이는 역할' }
    ],
    category: 'teamwork'
  },
  {
    id: 'challenge',
    question: '개발 과정에서 어떤 유형의 도전을 가장 즐기시나요?',
    options: [
      { value: 'algorithm', label: '효율적인 알고리즘이나 데이터 구조를 설계하는 도전' },
      { value: 'userExperience', label: '사용자가 직관적으로 이해하고 사용할 수 있는 인터페이스를 만드는 도전' },
      { value: 'architecture', label: '확장 가능하고 유지보수가 쉬운 시스템 구조를 설계하는 도전' },
      { value: 'integration', label: '다양한 시스템이나 서비스를 효과적으로 통합하는 도전' },
      { value: 'performance', label: '시스템 성능을 분석하고 최적화하는 도전' }
    ],
    category: 'technical'
  },
  {
    id: 'futureInterest',
    question: '앞으로 더 깊이 탐구하고 싶은 기술 영역은 무엇인가요?',
    options: [
      { value: 'web3', label: '웹3, 블록체인, 분산 시스템' },
      { value: 'ai', label: '인공지능, 머신러닝, 데이터 과학' },
      { value: 'ux', label: 'UX/UI 디자인, 사용자 경험 최적화' },
      { value: 'cloud', label: '클라우드 인프라, 서버리스 아키텍처' },
      { value: 'mobile', label: '모바일 앱 개발, 크로스 플랫폼 기술' },
      { value: 'security', label: '사이버 보안, 암호화, 취약점 분석' },
      { value: 'iot', label: 'IoT, 임베디드 시스템, 하드웨어 인터페이스' },
      { value: 'gamedev', label: '게임 개발, 3D 그래픽스, 게임 엔진' }
    ],
    category: 'interest'
  },
  {
    id: 'scenarioBased',
    question: '다음 상황에서 어떤 역할을 맡고 싶으신가요? "새로운 서비스 개발 프로젝트가 시작되었습니다."',
    options: [
      { value: 'frontend', label: '사용자 인터페이스와 경험을 설계하고 구현하는 역할' },
      { value: 'backend', label: '서버 로직과 데이터 처리 시스템을 구축하는 역할' },
      { value: 'fullstack', label: '프론트엔드와 백엔드를 모두 다루며 전체 기능을 구현하는 역할' },
      { value: 'devops', label: '개발 및 배포 파이프라인을 구축하고 인프라를 관리하는 역할' },
      { value: 'data', label: '데이터 모델을 설계하고 분석 시스템을 구축하는 역할' },
      { value: 'security', label: '보안 요구사항을 정의하고 구현하는 역할' },
      { value: 'projectManager', label: '프로젝트 일정과 리소스를 관리하고 이해관계자와 소통하는 역할' }
    ],
    category: 'rolePreference'
  },
  {
    id: 'strengthsAssessment',
    question: '자신의 강점이 가장 잘 발휘될 수 있는 영역은 어디라고 생각하시나요?',
    options: [
      { value: 'creativeDesign', label: '창의적인 디자인과 시각적 표현' },
      { value: 'logicalThinking', label: '논리적 사고와 알고리즘 개발' },
      { value: 'systemDesign', label: '시스템 설계와 아키텍처 구성' },
      { value: 'peopleSkills', label: '의사소통과 팀 협업' },
      { value: 'attentionToDetail', label: '세부 사항에 대한 꼼꼼함과 품질 관리' },
      { value: 'bigPicture', label: '전체적인 관점에서 방향성 제시' },
      { value: 'problemSolving', label: '복잡한 문제 해결과 디버깅' },
      { value: 'learning', label: '빠른 학습과 새로운 기술 적응' }
    ],
    category: 'selfAssessment'
  },
  {
    id: 'preference',
    question: '지금까지의 응답을 바탕으로, 다음 중 어떤 개발 분야가 가장 흥미롭게 느껴지시나요?',
    description: '각 분야에 대한 간략한 설명과 함께 선택해주세요. 여러분의 성향과 강점을 고려해 제안된 분야들입니다.',
    options: [
      { value: 'frontend', label: '프론트엔드 개발: 사용자가 직접 상호작용하는 웹사이트, 앱의 인터페이스 구현' },
      { value: 'backend', label: '백엔드 개발: 서버, 데이터베이스, API 등 서비스의 내부 시스템 구축' },
      { value: 'fullstack', label: '풀스택 개발: 프론트엔드와 백엔드를 모두 다루는 종합적인 개발' },
      { value: 'data', label: '데이터 과학/엔지니어링: 데이터 분석, 모델링, 파이프라인 구축' },
      { value: 'devops', label: 'DevOps: 개발 및 운영 프로세스 자동화, 인프라 관리' },
      { value: 'mobile', label: '모바일 앱 개발: iOS, Android 또는 크로스 플랫폼 앱 개발' },
      { value: 'security', label: '보안 엔지니어링: 시스템 보안 설계, 취약점 분석, 보안 솔루션 개발' },
      { value: 'gamedev', label: '게임 개발: 게임 로직, 그래픽, 사용자 경험 구현' },
      { value: 'embedded', label: '임베디드 시스템 개발: 하드웨어와 직접 상호작용하는 소프트웨어 개발' },
      { value: 'ai', label: 'AI/ML 엔지니어링: 인공지능 모델 개발, 학습, 배포' }
    ],
    showAll: true, // 모든 선택지를 항상 표시
    category: 'careerPath'
  }
];

// AI 생성 문제 데이터
export const aiGeneratedQuestions = {
  frontend: {
    question: "다음 중 웹 페이지의 반응형 디자인을 구현하는 데 가장 적합한 CSS 기술은 무엇인가요?",
    options: [
      "미디어 쿼리 (Media Queries)",
      "애니메이션 (Animations)",
      "CSS 필터 (Filters)",
      "CSS 변수 (Variables)"
    ],
    answer: 0
  },
  backend: {
    question: "서버에서 데이터를 안전하게 저장하기 위한 가장 기본적인 방법은 무엇인가요?",
    options: [
      "모든 데이터를 평문으로 저장하기",
      "민감한 정보 암호화하기",
      "데이터를 항상 메모리에만 보관하기",
      "모든 데이터는 클라이언트에만 저장하기"
    ],
    answer: 1
  },
  fullstack: {
    question: "풀스택 개발에서 가장 중요한 고려사항은 무엇인가요?",
    options: [
      "최신 프론트엔드 프레임워크 사용하기",
      "가장 빠른 백엔드 언어 선택하기",
      "프론트엔드와 백엔드 간의 효율적인 통신 설계",
      "모든 코드를 한 사람이 직접 작성하기"
    ],
    answer: 2
  },
  data: {
    question: "대용량 데이터를 분석할 때 가장 먼저 해야 할 단계는 무엇인가요?",
    options: [
      "즉시 머신러닝 모델 적용하기",
      "데이터 시각화로 인사이트 찾기",
      "데이터 전처리 및 품질 확인하기",
      "복잡한 통계 분석 실행하기"
    ],
    answer: 2
  },
  devops: {
    question: "CI/CD 파이프라인 구축의 주요 목적은 무엇인가요?",
    options: [
      "모든 개발을 한 명의 개발자가 담당하기 위해",
      "배포 프로세스 자동화로 오류 감소 및 생산성 향상",
      "고객의 요구사항을 더 잘 이해하기 위해",
      "서버 비용을 절감하기 위해"
    ],
    answer: 1
  },
  mobile: {
    question: "모바일 앱 개발에서 사용자 경험을 향상시키기 위한 가장 중요한 요소는 무엇인가요?",
    options: [
      "화려한 애니메이션과 그래픽",
      "빠른 로딩 시간과 응답성",
      "최신 기술의 활용",
      "많은 기능 제공"
    ],
    answer: 1
  },
  security: {
    question: "웹 애플리케이션에서 SQL 인젝션 공격을 방지하는 가장 효과적인 방법은 무엇인가요?",
    options: [
      "모든 DB 쿼리 로깅하기",
      "파라미터화된 쿼리 사용하기",
      "사용자 입력 무시하기",
      "데이터베이스 접근 제한하기"
    ],
    answer: 1
  },
  gamedev: {
    question: "게임 개발에서 프레임 레이트를 일정하게 유지하기 위한 가장 좋은 방법은 무엇인가요?",
    options: [
      "그래픽 품질 높이기",
      "모든 게임 로직을 한 스레드에서 처리하기",
      "리소스 최적화 및 효율적인 렌더링 기법 사용하기",
      "더 많은 애니메이션 추가하기"
    ],
    answer: 2
  },
  embedded: {
    question: "임베디드 시스템 개발에서 메모리 사용을 최적화하는 가장 일반적인 방법은 무엇인가요?",
    options: [
      "가능한 많은 동적 할당 사용하기",
      "모든 변수를 전역으로 선언하기",
      "정적 메모리 할당과 메모리 풀링 사용하기",
      "더 큰 메모리 칩으로 업그레이드하기"
    ],
    answer: 2
  },
  ai: {
    question: "머신러닝 모델 학습에서 과적합(Overfitting)을 방지하는 방법으로 가장 적절한 것은 무엇인가요?",
    options: [
      "더 많은 파라미터 추가하기",
      "모델 복잡도 줄이기와 규제화(Regularization) 적용하기",
      "더 적은 훈련 데이터 사용하기",
      "모든 특성(Feature)을 동일하게 취급하기"
    ],
    answer: 1
  }
};

// 경로 설명 데이터
export const pathDescriptions = {
  frontend: {
    title: '프론트엔드 개발자',
    description: '사용자 인터페이스와 경험을 구축하는 데 관심이 많으신 것 같습니다. 시각적인 요소와 사용자와의 상호작용을 중요시하는 성향이 프론트엔드 개발에 적합합니다.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'UI/UX 디자인 기초'],
    learningPath: '프론트엔드 개발자가 되기 위해서는 HTML, CSS, JavaScript의 기초부터 시작하여 React나 Vue.js와 같은 프레임워크를 배우는 것이 좋습니다. 또한 기본적인 UI/UX 디자인 원칙을 이해하면 더 효과적인 사용자 인터페이스를 구축할 수 있습니다.',
    strengthsNeeded: ['시각적 디자인 감각', '사용자 경험에 대한 이해', '세부사항에 대한 관심', '창의적 문제 해결'],
    challengesExpected: ['브라우저 호환성 이슈', '빠르게 변화하는 프레임워크와 도구', '복잡한 상태 관리']
  },
  backend: {
    title: '백엔드 개발자',
    description: '시스템의 내부 로직과 데이터 처리에 관심이 많으신 것 같습니다. 복잡한 문제를 해결하고 효율적인 시스템을 구축하는 것을 선호하는 성향이 백엔드 개발에 적합합니다.',
    skills: ['Java', 'Python', 'Node.js', 'SQL', '데이터베이스 설계', 'API 개발'],
    learningPath: '백엔드 개발자가 되기 위해서는 Java, Python, Node.js 같은 서버 사이드 언어부터 시작하여 데이터베이스, API 설계, 서버 아키텍처 등을 배우는 것이 좋습니다. SQL과 데이터베이스 관리도 중요한 기술입니다.',
    strengthsNeeded: ['논리적 사고', '시스템 설계 능력', '데이터 구조 이해', '문제 해결 능력'],
    challengesExpected: ['성능 최적화', '분산 시스템 관리', '보안 위협 대응']
  },
  fullstack: {
    title: '풀스택 개발자',
    description: '다양한 기술 영역에 관심이 있고 프로젝트 전반을 다루는 것을 선호하는 것 같습니다. 프론트엔드와 백엔드를 모두 다룰 수 있는 능력을 갖추고 싶어하는 성향이 풀스택 개발에 적합합니다.',
    skills: ['HTML/CSS/JavaScript', 'React/Angular/Vue', 'Node.js/Python/Java', '데이터베이스', 'API 개발', '시스템 설계'],
    learningPath: '풀스택 개발자가 되기 위해서는 프론트엔드와 백엔드 기술을 모두 배워야 합니다. 처음에는 한 영역에 집중하고 점차 영역을 확장하는 방식으로 접근하는 것이 좋습니다. JavaScript를 활용한 MERN(MongoDB, Express, React, Node.js) 스택이나 MEAN(MongoDB, Express, Angular, Node.js) 스택부터 시작하는 것도 좋은 선택입니다.'
  },
  data: {
    title: '데이터 과학자/엔지니어',
    description: '데이터를 분석하고 인사이트를 도출하는 것에 관심이 많으신 것 같습니다. 패턴을 찾고 데이터 기반의 의사결정을 지원하는 것을 선호하는 성향이 데이터 분야에 적합합니다.',
    skills: ['Python', 'R', 'SQL', '통계', '머신러닝', '데이터 시각화'],
    learningPath: '데이터 과학자나 엔지니어가 되기 위해서는 Python과 같은 언어와 함께 통계, 수학적 기초가 필요합니다. 또한 SQL을 활용한 데이터베이스 쿼리와 데이터 처리, 분석 라이브러리(Pandas, NumPy 등) 사용법을 배우는 것이 중요합니다.'
  },
  devops: {
    title: 'DevOps 엔지니어',
    description: '시스템 운영과 배포 자동화에 관심이 많으신 것 같습니다. 효율적인 개발 환경을 구축하고 지속적인 통합/배포를 관리하는 것을 선호하는 성향이 DevOps에 적합합니다.',
    skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', '클라우드 서비스(AWS, Azure, GCP)', '스크립팅'],
    learningPath: 'DevOps 엔지니어가 되기 위해서는 Linux 시스템 관리, 클라우드 서비스, 컨테이너화 기술(Docker, Kubernetes)을 배우는 것이 중요합니다. 또한 CI/CD 파이프라인 구축과 자동화 스크립트 작성 능력도 필요합니다.'
  },
  // 새로운 개발자 카테고리
  mobile: {
    title: '모바일 앱 개발자',
    description: '모바일 환경에서 사용자 경험을 중요시하고 앱 개발에 관심이 많으신 것 같습니다. 모바일 환경의 특성을 이해하고 적합한 UI/UX를 설계하는 데 관심을 가진 성향이 모바일 앱 개발에 적합합니다.',
    skills: ['Swift(iOS)', 'Kotlin(Android)', 'React Native', 'Flutter', '모바일 UI/UX 디자인', 'API 연동'],
    learningPath: '모바일 앱 개발자가 되기 위해서는 특정 플랫폼(iOS, Android)에 집중하거나 크로스 플랫폼 프레임워크(React Native, Flutter)를 배우는 방법이 있습니다. 모바일 UI/UX 원칙과 API 연동 방법을 익히는 것도 중요합니다.'
  },
  security: {
    title: '보안 엔지니어',
    description: '시스템과 애플리케이션의 보안에 관심이 많으신 것 같습니다. 취약점을 분석하고 보안 대책을 설계하는 논리적 사고를 선호하는 성향이 보안 엔지니어에 적합합니다.',
    skills: ['네트워크 보안', '웹 애플리케이션 보안', '암호화', '침투 테스트', '보안 감사', '사고 대응'],
    learningPath: '보안 엔지니어가 되기 위해서는 네트워크 기초, 운영체제 지식, 암호화 이론을 배워야 합니다. 웹 애플리케이션 보안, 취약점 분석, 침투 테스트 등의 기술을 익히는 것이 중요합니다.'
  },
  gamedev: {
    title: '게임 개발자',
    description: '인터랙티브한 경험과 창의적인 문제 해결에 관심이 많으신 것 같습니다. 시각적 요소와 논리적 구조를 균형 있게 다루는 능력을 가진 성향이 게임 개발에 적합합니다.',
    skills: ['Unity', 'Unreal Engine', 'C#', 'C++', '게임 디자인', '3D 모델링 기초'],
    learningPath: '게임 개발자가 되기 위해서는 게임 엔진(Unity, Unreal)을 배우고 관련 프로그래밍 언어(C#, C++)를 익히는 것이 중요합니다. 게임 디자인 원칙과 기본적인 3D 모델링, 애니메이션 지식도 도움이 됩니다.'
  },
  embedded: {
    title: '임베디드 시스템 개발자',
    description: '하드웨어와 소프트웨어의 상호작용에 관심이 많으신 것 같습니다. 제한된 자원을 효율적으로 활용하는 최적화 능력과 저수준 시스템에 관심이 있는 성향이 임베디드 개발에 적합합니다.',
    skills: ['C/C++', '마이크로컨트롤러', 'RTOS', '하드웨어 인터페이스', '전자공학 기초'],
    learningPath: '임베디드 시스템 개발자가 되기 위해서는 C/C++와 같은 저수준 언어와 마이크로컨트롤러 프로그래밍을 배워야 합니다. 기본적인 전자공학 지식과 하드웨어 인터페이스 방법도 익혀야 합니다.'
  },
  ai: {
    title: 'AI/ML 엔지니어',
    description: '인공지능과 머신러닝 시스템 개발에 관심이 많으신 것 같습니다. 데이터 기반의 접근과 복잡한 알고리즘을 이해하고 적용하는 능력을 가진 성향이 AI/ML 분야에 적합합니다.',
    skills: ['Python', 'TensorFlow/PyTorch', '수학/통계', '데이터 전처리', '신경망 아키텍처', '모델 배포'],
    learningPath: 'AI/ML 엔지니어가 되기 위해서는 Python과 머신러닝 프레임워크(TensorFlow, PyTorch)를 배워야 합니다. 선형대수, 미적분, 통계와 같은 수학적 기초와 데이터 전처리, 모델 평가 방법도 중요합니다.'
  }
};

// 분야별 레이블
export const pathLabels = {
  frontend: '프론트엔드',
  backend: '백엔드',
  fullstack: '풀스택',
  data: '데이터',
  devops: 'DevOps',
  mobile: '모바일 앱',
  security: '보안',
  gamedev: '게임 개발',
  embedded: '임베디드',
  ai: 'AI/ML'
};

// 역량 차원 정의
export const competencyDimensions = {
  technicalDepth: '기술적 깊이',
  creativity: '창의성',
  systemThinking: '시스템적 사고',
  detailOrientation: '세부사항 지향성',
  peopleFocus: '사람/협업 중심',
  analyticalThinking: '분석적 사고',
  learningAgility: '학습 민첩성',
  resilience: '문제 해결 탄력성'
};