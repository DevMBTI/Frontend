// 테스트 결과 저장 (로컬 스토리지)
export const saveTestResult = (userName, result) => {
  try {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const newResult = {
      id: Date.now(),
      userName,
      result,
      date: new Date().toISOString(),
    };
    
    savedResults.push(newResult);
    localStorage.setItem('testResults', JSON.stringify(savedResults));
    return newResult;
  } catch (error) {
    console.error('Error saving test result:', error);
    return null;
  }
};

// 테스트 결과 불러오기
export const getTestResults = () => {
  try {
    return JSON.parse(localStorage.getItem('testResults') || '[]');
  } catch (error) {
    console.error('Error loading test results:', error);
    return [];
  }
};

// 테스트 결과 삭제
export const deleteTestResult = (id) => {
  try {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const filteredResults = savedResults.filter(result => result.id !== id);
    localStorage.setItem('testResults', JSON.stringify(filteredResults));
    return true;
  } catch (error) {
    console.error('Error deleting test result:', error);
    return false;
  }
}; 