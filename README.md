# DevMBTI 프론트엔드

개발자 적성 테스트를 위한 React 기반 웹 애플리케이션

## 주요 기능

- 개발자 적성 테스트 인터페이스 제공
- 상호작용이 풍부한 질문 및 결과 화면
- AI 생성 카테고리별 질문 제공
- Amazon Cognito 기반 사용자 인증 시스템
- 통계 및 결과 데이터 시각화
- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 오프라인 모드 지원 (API 연결 실패 시 로컬 폴백)

## 기술 스택

- **프레임워크**: React + Vite
- **스타일링**: Tailwind CSS
- **상태 관리**: React Hooks
- **인증**: Amazon Cognito
- **HTTP 클라이언트**: Axios
- **차트 라이브러리**: Chart.js / React Chart.js
- **아이콘**: Heroicons

## 설치 및 실행

### 필수 조건

- Node.js 16 이상
- npm 또는 yarn
- 백엔드 API 엔드포인트 (로컬 개발 시 필요)

### 개발 환경 설정

1. 의존성 설치

```bash
npm install
# 또는
yarn install
```

2. 환경 변수 설정

`.env.development` 파일 생성 또는 수정:

```
# API 설정
VITE_API_BASE_URL=백엔드_API_URL
VITE_API_TIMEOUT=15000

# 인증 설정
VITE_COGNITO_USER_POOL_ID=인증_풀_ID
VITE_COGNITO_CLIENT_ID=클라이언트_ID

# 기능 설정
VITE_USE_LOCAL_FALLBACK=false
VITE_ENABLE_DEBUG_LOGS=true
```

3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

### 빌드 및 배포

1. 프로덕션 빌드 생성

```bash
npm run build
# 또는
yarn build
```

2. 빌드된 애플리케이션 미리보기

```bash
npm run preview
# 또는
yarn preview
```

## 프로젝트 구조

```
src/
├── assets/        # 이미지, 아이콘 등 정적 자산
├── components/    # React 컴포넌트
│   ├── auth/      # 인증 관련 컴포넌트
│   │   ├── AuthScreen.jsx      # 인증 화면 컨테이너
│   │   ├── AuthWrapper.jsx     # 인증 상태 관리 래퍼
│   │   ├── LoginForm.jsx       # 로그인 폼
│   │   ├── SignUpForm.jsx      # 회원가입 폼
│   │   ├── ConfirmationForm.jsx # 확인 코드 입력 폼
│   │   └── ForgotPasswordForm.jsx # 비밀번호 찾기 폼
│   ├── AiGeneratedQuestion.jsx # AI 생성 질문 컴포넌트
│   ├── ErrorScreen.jsx        # 오류 화면
│   ├── LoadingScreen.jsx      # 로딩 화면
│   ├── QuizScreen.jsx         # 테스트 화면
│   ├── ResultsScreen.jsx      # 결과 화면
│   ├── StatsScreen.jsx        # 통계 화면
│   └── WelcomeScreen.jsx      # 시작 화면
├── config.js      # 애플리케이션 설정
├── hooks/         # 커스텀 React 훅
├── services/      # API 서비스
│   ├── aiService.js  # AI 질문 생성 서비스
│   └── auth.js       # 인증 서비스
├── utils/         # 유틸리티 함수
├── App.jsx        # 메인 애플리케이션 컴포넌트
└── main.jsx       # 애플리케이션 진입점
```

## 인증 시스템

본 프로젝트는 Amazon Cognito를 활용한 인증 시스템을 구현하고 있습니다:

1. **로그인 흐름**:

   - 이메일/비밀번호 인증
   - 로그인 상태 유지
   - 액세스 토큰 자동 갱신

2. **회원가입 흐름**:

   - 이메일, 비밀번호, 추가 정보 입력
   - 이메일 확인 코드 검증
   - 계정 활성화

3. **권한 관리**:

   - 일반 사용자/관리자 역할 구분
   - 통계 화면 접근 제한
   - 보호된 API 엔드포인트

4. **보안 기능**:
   - 비밀번호 강도 검증
   - 비밀번호 재설정
   - 로그인 시도 제한

## 오프라인 모드

네트워크 연결이 불안정하거나 API 서버 접근이 불가능한 경우, 애플리케이션은 자동으로 오프라인 모드로 전환됩니다:

- 로컬 질문 데이터 사용
- 로컬 분석 알고리즘으로 결과 처리
- 제한된 기능으로 핵심 테스트 경험 제공

## 라이센스

MIT
