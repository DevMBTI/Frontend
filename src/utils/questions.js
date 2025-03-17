// 성향 테스트 질문들
export const personalityQuestions = [
    {
      id: 'visual',
      question: '시각적인 결과물을 바로 확인하는 것이 중요한가요?',
      options: [
        { value: 5, label: '매우 그렇다 - 내 작업 결과를 바로 눈으로 확인하고 싶다' },
        { value: 4, label: '그렇다 - 시각적 결과물이 있으면 더 동기부여가 된다' },
        { value: 3, label: '보통 - 때에 따라 다르다' },
        { value: 2, label: '아니다 - 꼭 눈에 보이는 결과물이 아니어도 괜찮다' },
        { value: 1, label: '전혀 아니다 - 논리적 구조와 작동 방식이 더 중요하다' }
      ]
    },
    {
      id: 'detail',
      question: '세부 사항과 시각적 디자인에 신경 쓰는 것을 좋아하나요?',
      options: [
        { value: 5, label: '매우 그렇다 - 픽셀 단위의 정밀함도 중요하다' },
        { value: 4, label: '그렇다 - 보기 좋은 결과물을 만들고 싶다' },
        { value: 3, label: '보통 - 기능과 디자인 모두 중요하다' },
        { value: 2, label: '아니다 - 기능이 더 중요하다' },
        { value: 1, label: '전혀 아니다 - 내부 로직과 효율성에 집중하고 싶다' }
      ]
    },
    {
      id: 'problem',
      question: '복잡한 문제를 해결하는 과정에서 어떤 느낌이 드나요?',
      options: [
        { value: 1, label: '매우 즐겁다 - 논리적 퍼즐을 푸는 것이 재밌다' },
        { value: 2, label: '괜찮다 - 도전적인 문제를 해결하면 성취감이 있다' },
        { value: 3, label: '보통 - 어렵지만 필요하다면 할 수 있다' },
        { value: 4, label: '약간 부담스럽다 - 너무 복잡한 것은 피하고 싶다' },
        { value: 5, label: '매우 부담스럽다 - 직관적인 작업을 선호한다' }
      ]
    },
    {
      id: 'creativity',
      question: '창의성과 디자인 감각이 얼마나 중요하다고 생각하나요?',
      options: [
        { value: 5, label: '매우 중요하다 - 독창적인 디자인이 핵심이다' },
        { value: 4, label: '중요하다 - 좋은 UX/UI 디자인은 가치가 있다' },
        { value: 3, label: '적당히 중요하다 - 기능과 균형을 이루어야 한다' },
        { value: 2, label: '그다지 중요하지 않다 - 기능성이 우선이다' },
        { value: 1, label: '중요하지 않다 - 논리와 효율성이 더 중요하다' }
      ]
    },
    {
      id: 'data',
      question: '데이터를 분석하고 패턴을 찾는 작업에 관심이 있나요?',
      options: [
        { value: 1, label: '매우 관심 있다 - 데이터에서 인사이트를 발견하는 것이 흥미롭다' },
        { value: 2, label: '관심 있다 - 데이터 기반 의사결정은 중요하다' },
        { value: 3, label: '보통이다 - 필요하다면 할 수 있다' },
        { value: 4, label: '별로 관심 없다 - 다른 영역이 더 재미있다' },
        { value: 5, label: '전혀 관심 없다 - 데이터보다 창의적인 작업이 좋다' }
      ]
    },
    {
      id: 'system',
      question: '시스템의 내부 작동 방식을 이해하는 것에 관심이 있나요?',
      options: [
        { value: 1, label: '매우 관심 있다 - 시스템의 깊은 이해가 중요하다' },
        { value: 2, label: '관심 있다 - 작동 원리를 알면 더 잘 활용할 수 있다' },
        { value: 3, label: '보통이다 - 필요한 만큼만 이해하면 된다' },
        { value: 4, label: '별로 관심 없다 - 결과물에 더 집중하고 싶다' },
        { value: 5, label: '전혀 관심 없다 - 사용법만 알면 충분하다' }
      ]
    },
    {
      id: 'userInteraction',
      question: '사용자와의 직접적인 상호작용을 설계하는 것에 관심이 있나요?',
      options: [
        { value: 5, label: '매우 관심 있다 - 사용자 경험이 최우선이다' },
        { value: 4, label: '관심 있다 - 좋은 UX는 중요한 가치다' },
        { value: 3, label: '보통이다 - 균형 있게 고려해야 한다' },
        { value: 2, label: '별로 관심 없다 - 내부 로직이 더 중요하다' },
        { value: 1, label: '전혀 관심 없다 - 백엔드 시스템에 더 흥미가 있다' }
      ]
    },
    {
      id: 'team',
      question: '어떤 유형의 팀 작업을 선호하나요?',
      options: [
        { value: 5, label: '디자이너, 기획자와 협업하며 사용자 경험을 만들고 싶다' },
        { value: 4, label: '다양한 역할의 사람들과 함께 일하는 것이 좋다' },
        { value: 3, label: '상황에 따라 다르다' },
        { value: 2, label: '개발자들과 기술적인 문제를 해결하는 것이 좋다' },
        { value: 1, label: '독립적으로 깊은 기술적 문제를 해결하는 것이 좋다' }
      ]
    },
    {
      id: 'feedback',
      question: '작업 결과에 대한 피드백은 언제 받고 싶나요?',
      options: [
        { value: 5, label: '즉시 - 변화를 바로 보고 수정하고 싶다' },
        { value: 4, label: '자주 - 정기적인 피드백이 도움이 된다' },
        { value: 3, label: '적절히 - 중요한 단계마다 받으면 좋다' },
        { value: 2, label: '가끔 - 큰 방향성에 대해서만 필요하다' },
        { value: 1, label: '나중에 - 전체 시스템이 완성된 후에 받고 싶다' }
      ]
    },
    {
      id: 'preference',
      question: '다음 중 가장 흥미롭게 느껴지는 작업은 무엇인가요?',
      options: [
        { value: 'frontend', label: '웹사이트나 앱의 화면을 디자인하고 구현하기' },
        { value: 'backend', label: '서버 시스템과 데이터베이스 설계하기' },
        { value: 'fullstack', label: '전체 시스템을 처음부터 끝까지 구현하기' },
        { value: 'data', label: '데이터를 분석하고 인사이트 도출하기' },
        { value: 'devops', label: '시스템 배포와 운영 자동화하기' }
      ]
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
    }
  };
  
  // 경로 설명 데이터
  export const pathDescriptions = {
    frontend: {
      title: '프론트엔드 개발자',
      description: '사용자 인터페이스와 경험을 구축하는 데 관심이 많으신 것 같습니다. 시각적인 요소와 사용자와의 상호작용을 중요시하는 성향이 프론트엔드 개발에 적합합니다.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'UI/UX 디자인 기초'],
      learningPath: '프론트엔드 개발자가 되기 위해서는 HTML, CSS, JavaScript의 기초부터 시작하여 React나 Vue.js와 같은 프레임워크를 배우는 것이 좋습니다. 또한 기본적인 UI/UX 디자인 원칙을 이해하면 더 효과적인 사용자 인터페이스를 구축할 수 있습니다.'
    },
    backend: {
      title: '백엔드 개발자',
      description: '시스템의 내부 로직과 데이터 처리에 관심이 많으신 것 같습니다. 복잡한 문제를 해결하고 효율적인 시스템을 구축하는 것을 선호하는 성향이 백엔드 개발에 적합합니다.',
      skills: ['Java', 'Python', 'Node.js', 'SQL', '데이터베이스 설계', 'API 개발'],
      learningPath: '백엔드 개발자가 되기 위해서는 Java, Python, Node.js 같은 서버 사이드 언어부터 시작하여 데이터베이스, API 설계, 서버 아키텍처 등을 배우는 것이 좋습니다. SQL과 데이터베이스 관리도 중요한 기술입니다.'
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
    }
  };
  
  // 분야별 레이블
  export const pathLabels = {
    frontend: '프론트엔드',
    backend: '백엔드',
    fullstack: '풀스택',
    data: '데이터',
    devops: 'DevOps'
  };