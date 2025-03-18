import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConfirmationForm from './ConfirmationForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

// 인증 화면 상태
const SCREENS = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  CONFIRM: 'CONFIRM',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD'
};

const AuthScreen = ({ onLoginSuccess }) => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN);
  const [email, setEmail] = useState('');
  
  // 로그인 화면으로 이동
  const navigateToLogin = () => {
    setCurrentScreen(SCREENS.LOGIN);
  };
  
  // 회원가입 화면으로 이동
  const navigateToSignUp = () => {
    setCurrentScreen(SCREENS.SIGNUP);
  };
  
  // 비밀번호 찾기 화면으로 이동
  const navigateToForgotPassword = () => {
    setCurrentScreen(SCREENS.FORGOT_PASSWORD);
  };
  
  // 회원가입 성공 처리
  const handleSignUpSuccess = (userEmail) => {
    setEmail(userEmail);
    setCurrentScreen(SCREENS.CONFIRM);
  };
  
  // 계정 인증 성공 처리
  const handleConfirmSuccess = () => {
    setCurrentScreen(SCREENS.LOGIN);
  };
  
  // 비밀번호 재설정 코드 전송 처리
  const handleResetCodeSent = (userEmail) => {
    setEmail(userEmail);
    setCurrentScreen(SCREENS.RESET_PASSWORD);
  };
  
  // 비밀번호 재설정 성공 처리
  const handleResetSuccess = () => {
    setCurrentScreen(SCREENS.LOGIN);
  };
  
  // 현재 화면에 따라 다른 컴포넌트 렌더링
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.LOGIN:
        return (
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            onForgotPassword={navigateToForgotPassword}
            onSignUp={navigateToSignUp}
          />
        );
      case SCREENS.SIGNUP:
        return (
          <SignUpForm
            onSignUpSuccess={handleSignUpSuccess}
            onLogin={navigateToLogin}
          />
        );
      case SCREENS.CONFIRM:
        return (
          <ConfirmationForm
            email={email}
            onConfirmSuccess={handleConfirmSuccess}
            onCancel={navigateToLogin}
          />
        );
      case SCREENS.FORGOT_PASSWORD:
        return (
          <ForgotPasswordForm
            onCancel={navigateToLogin}
            onResetCodeSent={handleResetCodeSent}
          />
        );
      case SCREENS.RESET_PASSWORD:
        return (
          <ResetPasswordForm
            email={email}
            onResetSuccess={handleResetSuccess}
            onCancel={navigateToLogin}
          />
        );
      default:
        return <LoginForm onLoginSuccess={onLoginSuccess} />;
    }
  };
  
  return (
    <div className="min-h-[400px] flex items-center justify-center py-8">
      {renderScreen()}
    </div>
  );
};

export default AuthScreen; 