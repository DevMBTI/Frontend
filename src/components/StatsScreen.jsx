import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { pathLabels } from '../utils/questions';

// 더미 통계 데이터
const DUMMY_STATS = {
  count: 185,
  totalCount: 750,
  pathDistribution: {
    frontend: 40,
    backend: 35,
    fullstack: 30,
    data: 25,
    devops: 15,
    mobile: 15,
    security: 10,
    gamedev: 5,
    embedded: 5,
    ai: 5
  },
  timeDistribution: {
    [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 25,
    [new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 28,
    [new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 32,
    [new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 30,
    [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 27,
    [new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]]: 26,
    [new Date().toISOString().split('T')[0]]: 17
  },
  averageScores: {
    frontend: 75,
    backend: 68,
    fullstack: 72,
    data: 65,
    devops: 70,
    mobile: 73,
    security: 67,
    gamedev: 78,
    embedded: 64,
    ai: 71
  },
  genderDistribution: {
    male: 60,
    female: 35,
    other: 5
  },
  ageDistribution: {
    "18-24": 30,
    "25-34": 45,
    "35-44": 15,
    "45+": 10
  },
  periodDays: 7
};

// 색상 팔레트 설정
const COLOR_MAP = {
  frontend: 'rgb(99, 102, 241)', // indigo-600
  backend: 'rgb(16, 185, 129)', // emerald-600
  fullstack: 'rgb(217, 70, 239)', // fuchsia-600
  data: 'rgb(14, 165, 233)', // sky-600
  devops: 'rgb(245, 158, 11)', // amber-600
};

// 한글 요일 포맷터
const formatDateToKorean = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  
  return `${month}월 ${day}일 (${weekday})`;
};

const StatsScreen = ({ onBack }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState(7);
  const [useDummyData, setUseDummyData] = useState(false);
  const [activeTab, setActiveTab] = useState('paths');
  
  useEffect(() => {
    fetchStats();
  }, [timePeriod]);
  
  const fetchStats = async () => {
    if (useDummyData) {
      setStats(DUMMY_STATS);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getStats(timePeriod);
      setStats(data);
    } catch (err) {
      console.error('통계를 불러오는데 실패했습니다:', err);
      setError(err.message || '통계를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 더미 데이터로 전환
  const switchToDummyData = () => {
    setUseDummyData(true);
    setStats(DUMMY_STATS);
    setError(null);
  };
  
  // 헤더 섹션 (모든 상태에서 동일하게 표시)
  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-indigo-200">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">개발자 적성 테스트 통계</h1>
        <p className="text-gray-600">테스트 결과의 통계와 트렌드를 확인하세요</p>
      </div>
      
      <button
        onClick={onBack}
        className="flex items-center px-5 py-2.5 text-sm font-medium text-indigo-600 bg-white border border-indigo-300 rounded-md hover:bg-indigo-50 transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        테스트로 돌아가기
      </button>
    </div>
  );
  
  // 탭 메뉴 렌더링
  const renderTabs = () => (
    <div className="mb-6 border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveTab('paths')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'paths'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          개발자 분야
        </button>
        <button
          onClick={() => setActiveTab('time')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'time'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          일별 참여자
        </button>
        <button
          onClick={() => setActiveTab('demographic')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'demographic'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          인구통계
        </button>
      </nav>
    </div>
  );
  
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderHeader()}
          
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-6"></div>
            <p className="text-gray-700 font-medium text-lg mb-6">통계를 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderHeader()}
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg shadow-sm mb-6">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-red-800">통계를 불러올 수 없습니다</h2>
            </div>
            
            <p className="text-red-700 mb-6 bg-red-100 p-3 rounded-md border border-red-200">
              {error}
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={switchToDummyData}
                className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
                샘플 데이터로 보기
              </button>
              
              <button
                onClick={onBack}
                className="flex items-center justify-center px-6 py-3 text-sm font-medium text-indigo-600 bg-white border border-indigo-300 rounded-md hover:bg-indigo-50 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                테스트로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 분야별 분포 차트 렌더링
  const renderPathDistribution = () => (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">분야별 분포</h3>
      <div className="space-y-6">
        {Object.entries(stats.pathDistribution || {}).map(([path, count]) => {
          const percentage = Math.round((count / stats.count) * 100);
          const displayLabel = pathLabels[path] || path;
          const color = COLOR_MAP[path] || 'rgb(107, 114, 128)'; // gray-500 as fallback
          
          return (
            <div key={path} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                  <span className="text-gray-800 font-medium">{displayLabel}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium">{count}명</span>
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {percentage}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  // 일별 참여자 차트 렌더링
  const renderTimeDistribution = () => (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-100 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">일별 참여자 추이</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats.timeDistribution)
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
          .map(([date, count]) => (
            <div key={date} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">{formatDateToKorean(date)}</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{count}</span>
                <span className="ml-2 text-sm font-medium text-gray-500">명</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
  
  // 인구통계 렌더링
  const renderDemographics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 성별 분포 */}
      {stats.genderDistribution && (
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">성별 분포</h3>
          <div className="space-y-4">
            {Object.entries(stats.genderDistribution).map(([gender, count]) => {
              const percentage = Math.round((count / stats.count) * 100);
              let label = gender;
              let color = 'rgb(99, 102, 241)'; // indigo default
              
              if (gender === 'male') {
                label = '남성';
                color = 'rgb(37, 99, 235)'; // blue-600
              } else if (gender === 'female') {
                label = '여성';
                color = 'rgb(236, 72, 153)'; // pink-600
              } else {
                label = '기타';
                color = 'rgb(107, 114, 128)'; // gray-500
              }
              
              return (
                <div key={gender} className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                      <span className="text-gray-800 font-medium">{label}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{count}명</span>
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* 연령대 분포 */}
      {stats.ageDistribution && (
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">연령대 분포</h3>
          <div className="space-y-4">
            {Object.entries(stats.ageDistribution).map(([ageRange, count]) => {
              const percentage = Math.round((count / stats.count) * 100);
              let color = 'rgb(16, 185, 129)'; // emerald-600
              
              if (ageRange === '18-24') {
                color = 'rgb(16, 185, 129)'; // emerald-600
              } else if (ageRange === '25-34') {
                color = 'rgb(14, 165, 233)'; // sky-600
              } else if (ageRange === '35-44') {
                color = 'rgb(245, 158, 11)'; // amber-600
              } else {
                color = 'rgb(139, 92, 246)'; // violet-600
              }
              
              return (
                <div key={ageRange} className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                      <span className="text-gray-800 font-medium">{ageRange}세</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{count}명</span>
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        
        <div className="mb-4 flex items-center">
          <p className="text-gray-600 italic">
            {useDummyData && <span className="text-amber-600 font-medium">현재 샘플 데이터를 표시 중입니다.</span>}
          </p>
        </div>
        
        {/* 기간 선택 및 요약 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 기간 선택 */}
          <div className="bg-white shadow rounded-lg p-5 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-3">조회 기간 설정</h3>
            <select 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            >
              <option value={7}>최근 7일</option>
              <option value={30}>최근 30일</option>
              <option value={90}>최근 3개월</option>
            </select>
          </div>
          
          {/* 총 참여자 */}
          <div className="bg-white shadow rounded-lg p-5 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">총 테스트 참여자</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-gray-900">{stats.totalCount}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">명</span>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">전체 기간</span>
            </div>
          </div>
          
          {/* 선택 기간 참여자 */}
          <div className="bg-white shadow rounded-lg p-5 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">선택 기간 참여자</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-gray-900">{stats.count}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">명</span>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">최근 {stats.periodDays}일</span>
            </div>
          </div>
        </div>
        
        {/* 탭 메뉴 */}
        {renderTabs()}
        
        {/* 탭 콘텐츠 */}
        <div className="mt-6">
          {activeTab === 'paths' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderPathDistribution()}
              
              {/* 평균 점수 */}
              {stats.averageScores && (
                <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">평균 점수</h3>
                  <div className="space-y-6">
                    {Object.entries(stats.averageScores).map(([key, value]) => {
                      const displayLabel = pathLabels[key] || key;
                      const color = COLOR_MAP[key] || 'rgb(107, 114, 128)'; // gray-500 as fallback
                      
                      return (
                        <div key={key} className="w-full">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                              <span className="text-gray-800 font-medium">{displayLabel}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-700 font-medium">{value}점</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${(value / 100) * 100}%`,
                                backgroundColor: color
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'time' && renderTimeDistribution()}
          
          {activeTab === 'demographic' && renderDemographics()}
        </div>
      </div>
    </div>
  );
};

export default StatsScreen; 