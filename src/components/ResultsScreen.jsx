import React, { useState } from 'react';
import AIGeneratedQuestion from '../components/AiGeneratedQuestion';
import { pathLabels } from '../utils/questions';
import { saveTestResult } from '../utils/testUtils';
import apiService from '../services/api';
import authService from '../services/auth';

const ResultsScreen = ({ result, userName, resultId, onRestart, isOfflineMode, onShowStats }) => {
  const { recommendedPath, scores, details, allPaths } = result;
  const maxScore = Math.max(...Object.values(scores));
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const isAdmin = authService.isAdmin();
  const isAuthenticated = authService.isAuthenticated();
  
  const handleSaveResult = () => {
    const savedResult = saveTestResult(userName, result);
    if (savedResult) {
      setIsSaved(true);
    }
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const shareToSocialMedia = (platform) => {
    const text = `${userName || '저'}는 개발자 적성 테스트 결과 "${result.title}" 유형입니다! 당신의 개발자 유형은 무엇인가요?`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };
  
  const getShareLink = () => {
    if (resultId) {
      return `${window.location.origin}/results/${resultId}`;
    } else {
      return window.location.origin;
    }
  };
  
  const fetchStats = async () => {
    if (loadingStats || stats) return;
    
    setLoadingStats(true);
    try {
      const statsData = await apiService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('통계 데이터 가져오기 실패:', error);
    } finally {
      setLoadingStats(false);
    }
  };
  
  const renderAdminSection = () => {
    if (!isAuthenticated) {
      return null;
    }
    
    return (
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-800 mb-3">
          {isAdmin ? '관리자 옵션' : '사용자 옵션'}
        </h3>
        <button
          onClick={onShowStats}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          통계 대시보드 보기
        </button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {isOfflineMode && (
        <div className="max-w-3xl mx-auto mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-700">
              오프라인 모드에서 결과가 생성되었습니다. 인터넷 연결 시 더 정확한 결과를 얻을 수 있습니다.
            </p>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-600 opacity-90" style={{height: '150px'}}>
            <div className="absolute inset-0 opacity-20" 
                 style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")'}}></div>
          </div>
          <div className="relative flex flex-col items-center pt-10 pb-12 px-6 text-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl mb-4 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                {recommendedPath === 'frontend' && 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                {recommendedPath === 'backend' && 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                }
                {recommendedPath === 'fullstack' && 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                {recommendedPath === 'data' && 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                {recommendedPath === 'devops' && 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {userName ? `${userName}님의 개발자 진로 추천 결과` : '개발자 진로 추천 결과'}
            </h1>
            <p className="text-gray-500 text-lg max-w-lg">
              당신에게 가장 적합한 개발 분야는 <span className="font-bold">{details.title}</span>입니다!
            </p>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              결과 개요
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              상세 정보
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'other'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              다른 분야
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'questions'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI 문제
            </button>
          </nav>
        </div>
        
        <div className="p-8">
          {/* 결과 개요 탭 */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">적성 분석 결과</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {Object.keys(scores).map((path) => (
                    <div key={path} className={`p-4 rounded-lg ${path === recommendedPath ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {path === recommendedPath && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className={`font-medium ${path === recommendedPath ? 'text-indigo-800' : 'text-gray-700'}`}>
                            {pathLabels[path]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm ${path === recommendedPath ? 'font-semibold text-indigo-600' : 'text-gray-500'}`}>
                            {scores[path]}점
                          </span>
                          {path === recommendedPath && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-200 rounded-full">
                              추천
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full ${path === recommendedPath ? 'bg-indigo-600' : 'bg-indigo-400'}`}
                          style={{ width: `${(scores[path] / maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-indigo-800">결과 요약</h3>
                      <p className="mt-2 text-indigo-700">{details.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={onRestart}
                  className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-md"
                >
                  테스트 다시 하기
                </button>
              </div>
            </div>
          )}
          
          {/* 상세 정보 탭 */}
          {activeTab === 'details' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {details.title} - 상세 정보
              </h2>
              
              <div className="mb-8">
                <p className="text-gray-700 mb-6 text-lg">{details.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">필요한 핵심 기술</h3>
                    <div className="flex flex-wrap">
                      {details.skills.map((skill, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">개발자 특징</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">
                          {recommendedPath === 'frontend' && '시각적 디자인과 사용자 친화적 인터페이스 구현 능력'}
                          {recommendedPath === 'backend' && '논리적 사고와 효율적인 시스템 설계 능력'}
                          {recommendedPath === 'fullstack' && '다양한 분야를 연결하는 종합적 시각'}
                          {recommendedPath === 'data' && '분석적 사고와 문제 해결 능력'}
                          {recommendedPath === 'devops' && '자동화와 최적화에 대한 열정'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">
                          {recommendedPath === 'frontend' && '사용자 경험과 인터페이스에 관심이 많음'}
                          {recommendedPath === 'backend' && '시스템 구조와 데이터 처리에 관심이 많음'}
                          {recommendedPath === 'fullstack' && '다양한 기술 스택에 관심이 있고 전체 시스템을 이해함'}
                          {recommendedPath === 'data' && '데이터 분석과 패턴 발견에 관심이 많음'}
                          {recommendedPath === 'devops' && '자동화와 시스템 배포에 관심이 많음'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">
                          {recommendedPath === 'frontend' && '시각적 디자인과 사용자 친화적 인터페이스 구현 능력'}
                          {recommendedPath === 'backend' && '논리적 사고와 효율적인 시스템 설계 능력'}
                          {recommendedPath === 'fullstack' && '다양한 분야를 연결하는 종합적 시각'}
                          {recommendedPath === 'data' && '분석적 사고와 문제 해결 능력'}
                          {recommendedPath === 'devops' && '자동화와 최적화에 대한 열정'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">
                          {recommendedPath === 'frontend' && '창의적이고 사용자 중심적인 사고방식'}
                          {recommendedPath === 'backend' && '체계적이고 안정적인 시스템 구축 지향'}
                          {recommendedPath === 'fullstack' && '다양한 도전에 유연하게 대응하는 적응력'}
                          {recommendedPath === 'data' && '데이터를 통해 통찰력을 도출하는 능력'}
                          {recommendedPath === 'devops' && '지속적인 개선과 효율화를 추구하는 마인드'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">학습 로드맵</h3>
                <p className="text-gray-700">{details.learningPath}</p>
              </div>
            </div>
          )}
          
          {/* 다른 분야 탭 */}
          {activeTab === 'other' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">다른 개발 분야 탐색하기</h2>
              <p className="text-gray-600 mb-6">
                개발 분야는 다양하고 각각의 특성이 있습니다. 아래 다른 분야도 살펴보세요:
              </p>
              
              <div className="space-y-4">
                {Object.keys(allPaths)
                  .filter(path => path !== recommendedPath)
                  .map(path => (
                    <div key={path} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{allPaths[path].title}</h3>
                      <p className="text-gray-600 mb-4">{allPaths[path].description}</p>
                      <div className="flex flex-wrap">
                        {allPaths[path].skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                            {skill}
                          </span>
                        ))}
                        {allPaths[path].skills.length > 3 && (
                          <span className="text-sm text-gray-500 py-1">
                            +{allPaths[path].skills.length - 3}개 더
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {/* AI 문제 탭 */}
          {activeTab === 'questions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">AI 기술 문제</h2>
              <p className="text-gray-600 mb-6">
                추천된 분야와 관련된 기술 문제를 풀어보세요:
              </p>
              
              <AIGeneratedQuestion category={recommendedPath} />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto py-3 px-6 bg-white border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="테스트 다시 시작하기"
        >
          테스트 다시 시작하기
        </button>
        
        <button
          onClick={handleSaveResult}
          disabled={isSaved}
          className={`w-full sm:w-auto py-3 px-6 rounded-md shadow-sm text-base font-medium ${
            isSaved 
              ? 'bg-green-100 text-green-800 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
          aria-label="결과 저장하기"
        >
          {isSaved ? '저장됨' : '결과 저장하기'}
        </button>
        
        <div className="relative">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto py-3 px-6 bg-indigo-100 rounded-md shadow-sm text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="결과 공유하기"
            aria-expanded={showShareOptions}
            aria-controls="share-options"
          >
            결과 공유하기
          </button>
          
          {showShareOptions && (
            <div 
              id="share-options"
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => shareToSocialMedia('twitter')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Twitter에 공유
                </button>
                <button
                  onClick={() => shareToSocialMedia('facebook')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Facebook에 공유
                </button>
                <button
                  onClick={() => shareToSocialMedia('linkedin')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  LinkedIn에 공유
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {renderAdminSection()}
    </div>
  );
};

export default ResultsScreen;