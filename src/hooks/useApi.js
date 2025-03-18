import { useState, useCallback } from 'react';
import useNetworkStatus from './useNetworkStatus';

const useApi = (apiFunction, fallbackFunction = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOffline } = useNetworkStatus();
  
  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      // 오프라인이고 폴백 함수가 있으면 폴백 사용
      if (isOffline && fallbackFunction) {
        const fallbackData = await fallbackFunction(...args);
        setData(fallbackData);
        return fallbackData;
      }
      
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (error) {
      setError(error.message || '요청 처리 중 오류가 발생했습니다.');
      
      // 폴백 함수가 있으면 시도
      if (fallbackFunction) {
        try {
          const fallbackData = await fallbackFunction(...args);
          setData(fallbackData);
          return fallbackData;
        } catch (fallbackError) {
          setError(fallbackError.message || '폴백 처리 중 오류가 발생했습니다.');
          throw fallbackError;
        }
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, fallbackFunction, isOffline]);
  
  return { execute, data, loading, error, isOffline };
};

export default useApi; 