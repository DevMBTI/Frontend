import React, { useState } from 'react';
import authService from '../../services/auth';
import { getUserFriendlyErrorMessage } from '../../config';

const ForgotPasswordForm = ({ onCancel, onResetCodeSent }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
      onResetCodeSent(email);
    } catch (error) {
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">비밀번호 찾기</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">이메일이 전송되었습니다</h3>
            <p className="mt-2 text-sm text-gray-600">
              {email}로 비밀번호 재설정 코드가 전송되었습니다.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <p className="mb-4 text-gray-600">
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
            </p>
            
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
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md font-medium ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {loading ? '처리 중...' : '비밀번호 재설정 링크 보내기'}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm; 