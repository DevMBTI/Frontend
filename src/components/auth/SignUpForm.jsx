import React, { useState } from 'react';
import authService from '../../services/auth';
import { getUserFriendlyErrorMessage } from '../../config';

const SignUpForm = ({ onSignUpSuccess, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authService.signUp(email, password, name);
      setSuccess(true);
      onSignUpSuccess(email);
    } catch (error) {
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">회원가입</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">회원가입 완료!</h3>
            <p className="mt-2 text-sm text-gray-600">
              이메일({email})로 인증 코드가 발송되었습니다. 이메일을 확인하여 계정을 인증해 주세요.
            </p>
            <button
              onClick={onLogin}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              로그인 화면으로 이동
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="이름을 입력하세요"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="이메일 주소를 입력하세요"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              minLength={8}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자를 포함해야 합니다.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? '회원가입 중...' : '회원가입'}
          </button>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">이미 계정이 있으신가요? </span>
            <button
              type="button"
              onClick={onLogin}
              className="text-indigo-600 hover:text-indigo-800"
            >
              로그인
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpForm; 