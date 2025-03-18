import React, { useState } from 'react';
import authService from '../../services/auth';
import { getUserFriendlyErrorMessage } from '../../config';

const ConfirmationForm = ({ email, onConfirmSuccess, onCancel }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authService.confirmSignUp(email, confirmationCode);
      onConfirmSuccess();
    } catch (error) {
      setError(getUserFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">계정 인증</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <p className="mb-4 text-gray-600">
            {email}로 전송된 인증 코드를 입력해주세요.
          </p>
          
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
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
          >
            {loading ? '인증 중...' : '인증 확인'}
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

export default ConfirmationForm; 