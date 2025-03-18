import React, { useState } from 'react';
import authService from '../../services/auth';
import { getUserFriendlyErrorMessage } from '../../config';

const ResetPasswordForm = ({ email, onResetSuccess, onCancel }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authService.resetPassword(email, confirmationCode, newPassword);
      onResetSuccess();
    } catch (error) {
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">비밀번호 재설정</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-gray-600">
          {email}로 전송된 인증 코드를 입력하고 새 비밀번호를 설정해주세요.
        </p>
        
        <div className="mb-4">
          <label htmlFor="confirmationCode" className="block text-gray-700 font-medium mb-2">
            인증 코드
          </label>
          <input
            type="text"
            id="confirmationCode"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="인증 코드 입력"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
            새 비밀번호
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="새 비밀번호 입력 (8자 이상)"
            minLength={8}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자를 포함해야 합니다.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? '처리 중...' : '비밀번호 변경'}
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
    </div>
  );
};

export default ResetPasswordForm;