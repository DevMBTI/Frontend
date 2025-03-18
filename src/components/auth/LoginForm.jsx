import React, { useState } from 'react';
import authService from '../../services/auth';
import { getUserFriendlyErrorMessage } from '../../config';

const LoginForm = ({ onLoginSuccess, onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authService.signIn(email, password);
      onLoginSuccess();
    } catch (error) {
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
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
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
        
        <div className="mt-4 flex justify-between text-sm">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-indigo-600 hover:text-indigo-800"
          >
            비밀번호 찾기
          </button>
          
          <button
            type="button"
            onClick={onSignUp}
            className="text-indigo-600 hover:text-indigo-800"
          >
            새 계정 만들기
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 