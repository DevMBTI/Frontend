import React from 'react';

const LoadingScreen = ({ message = "로딩 중..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        <h2 className="mt-6 text-xl font-medium text-gray-900">{message}</h2>
        <p className="mt-2 text-sm text-gray-500">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;