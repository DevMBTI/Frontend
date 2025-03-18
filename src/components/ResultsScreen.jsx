import React, { useState } from 'react';
import AIGeneratedQuestion from '../components/AiGeneratedQuestion';
import { pathLabels, pathDescriptions } from '../utils/questions';
import { saveTestResult } from '../utils/testUtils';
import apiService from '../services/api';
import authService from '../services/auth';

const ResultsScreen = ({ result, userName, resultId, onRestart, isOfflineMode, onShowStats }) => {
  const { recommendedPath, scores } = result;
  const details = result.details || pathDescriptions[recommendedPath];
  const allPaths = result.allPaths || pathDescriptions;
  const maxScore = Math.max(...Object.values(scores));
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const isAdmin = authService.isAdmin();
  const isAuthenticated = authService.isAuthenticated();
  
  // 모든 점수를 퍼센테이지로 변환
  const getScorePercentage = (score) => {
    return Math.round((score / maxScore) * 100);
  };
  
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
    const title = result.title || details?.title || pathLabels[recommendedPath] || '개발자';
    const text = `${userName || '저'}는 개발자 적성 테스트 결과 "${title}" 유형입니다! 당신의 개발자 유형은 무엇인가요?`;
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
      console.error('통계 데이터를 불러오는데 실패했습니다:', error);
    } finally {
      setLoadingStats(false);
    }
  };
  
  // 상위 3개 경로 추출 (퍼센테이지로 표시)
  const topPaths = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([path, score]) => ({
      path,
      score,
      label: pathLabels[path] || path,
      percentage: getScorePercentage(score)
    }));
  
  // 개발자 역할 요약 반환 함수
  const getRoleSummary = (path) => {
    const summaries = {
      frontend: '웹/앱 인터페이스 개발, UI/UX 구현, 사용자 상호작용 처리, 반응형 디자인 적용, 프론트엔드 성능 최적화',
      backend: 'API 설계 및 개발, 데이터베이스 관리, 서버 로직 구현, 시스템 확장성 설계, 보안 로직 구현',
      fullstack: '프론트엔드 및 백엔드 개발, 전체 애플리케이션 아키텍처 설계, API 연동, 풀스택 솔루션 구축',
      data: '데이터 수집 및 분석, 머신러닝 모델 개발, 데이터 시각화, 비즈니스 인사이트 도출, 데이터 파이프라인 구축',
      devops: '배포 자동화, 클라우드 인프라 관리, 모니터링 시스템 구축, 성능 최적화, 장애 대응',
      mobile: '모바일 앱 개발, 네이티브/하이브리드 앱 구현, 모바일 UI/UX 최적화, 디바이스 센서 통합, 앱 배포 관리',
      security: '보안 취약점 분석, 침투 테스트, 보안 시스템 설계, 해킹 방어 전략 수립, 보안 감사 및 인증',
      gamedev: '게임 로직 구현, 물리 엔진 활용, 게임 UI 개발, 그래픽 렌더링, 멀티플레이어 기능 구현',
      embedded: '임베디드 소프트웨어 개발, 하드웨어 제어, 펌웨어 설계, 실시간 시스템 최적화, IoT 장치 프로그래밍',
      ai: '인공지능 모델 개발, 자연어 처리, 컴퓨터 비전, 딥러닝 알고리즘 설계, AI 솔루션 통합'
    };
    
    return summaries[path] || '개발 및 설계, 최적화, 시스템 관리, 문제 해결, 기술 스택 활용';
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
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 absolute inset-0">
      {/* 배경 애니메이션 요소 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[150vw] h-[150vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-[150vw] h-[150vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 right-1/3 w-[150vw] h-[150vw] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-1/3 left-1/4 w-[150vw] h-[150vw] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* 추가 배경 레이어 */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 z-0"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 py-10 px-4 lg:px-8">
        {/* 결과 헤더 */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-indigo-100 overflow-hidden mb-8">
          <div className="relative h-2">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
          
          <div className="py-8 px-6 md:px-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
                테스트 결과
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {userName}님의 개발자 유형은
              </h1>
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                {details.title}
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {topPaths.map((item, index) => (
                <div 
                  key={item.path} 
                  className={`px-4 py-2 rounded-lg ${
                    index === 0 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-white border border-gray-200 text-gray-700'
                  } flex items-center`}
                >
                  <span className={`font-medium ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                    {item.label}
                  </span>
                  <span className={`ml-2 text-sm ${index === 0 ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
            
            {/* 액션 버튼 그룹 */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={onRestart}
                className="px-5 py-2.5 bg-white border border-indigo-200 rounded-xl text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                테스트 다시 하기
              </button>
              
              <button 
                onClick={handleSaveResult}
                disabled={isSaved}
                className={`px-5 py-2.5 rounded-xl font-medium flex items-center ${
                  isSaved 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                } transition-colors shadow-sm`}
              >
                {isSaved ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    저장됨
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    결과 저장하기
                  </>
                )}
              </button>
              
              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="px-5 py-2.5 bg-white border border-indigo-200 rounded-xl text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  공유하기
                </button>
                
                {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10 animate-fade-in">
                    <div className="py-2">
                      <button 
                        onClick={() => shareToSocialMedia('twitter')} 
                        className="flex items-center px-4 py-2 hover:bg-indigo-50 w-full text-left"
                      >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mr-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                          </svg>
                        </span>
                        트위터
                      </button>
                      <button 
                        onClick={() => shareToSocialMedia('facebook')} 
                        className="flex items-center px-4 py-2 hover:bg-indigo-50 w-full text-left"
                      >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mr-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                          </svg>
                        </span>
                        페이스북
                      </button>
                      <button 
                        onClick={() => shareToSocialMedia('linkedin')} 
                        className="flex items-center px-4 py-2 hover:bg-indigo-50 w-full text-left"
                      >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mr-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </span>
                        링크드인
                      </button>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">또는 링크 복사하기:</p>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={getShareLink()} 
                          readOnly 
                          className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(getShareLink());
                            alert('링크가 클립보드에 복사되었습니다!');
                          }}
                          className="px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-r-lg"
                        >
                          복사
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto py-3 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                개요
              </button>
              
              <button
                onClick={() => setActiveTab('details')}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm ml-2 transition-colors ${
                  activeTab === 'details'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                상세 정보
              </button>
              
              <button
                onClick={() => setActiveTab('other')}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm ml-2 transition-colors ${
                  activeTab === 'other'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                다른 분야
              </button>
              
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setActiveTab('stats');
                    fetchStats();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm ml-2 transition-colors ${
                    activeTab === 'stats'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  통계
                </button>
              )}
            </nav>
          </div>
          
          {/* 내용 영역 */}
          <div className="p-6 md:p-8">
            {/* 결과 개요 탭 */}
            {activeTab === 'overview' && (
              <div>
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">적성 분석 결과</h2>
                  <p className="text-gray-600 mb-6">각 분야 점수는 최고 점수를 기준으로 백분율로 표시됩니다.</p>
                  
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
                              {getScorePercentage(scores[path])}%
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
                            style={{ width: `${getScorePercentage(scores[path])}%` }}
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
                        <h3 className="text-lg font-semibold text-indigo-800">{details.title}</h3>
                        <p className="mt-2 text-indigo-700">{details.description}</p>
                        <div className="mt-4 bg-white/60 p-4 rounded-lg">
                          <p className="text-gray-700">
                            <span className="font-semibold">주요 업무:</span> {getRoleSummary(recommendedPath)}
                          </p>
                        </div>
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
                        {details.strengthsNeeded && details.strengthsNeeded.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                        {(!details.strengthsNeeded || details.strengthsNeeded.length === 0) && (
                          <>
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
                                {recommendedPath === 'mobile' && '모바일 사용자 경험과 앱 최적화 능력'}
                                {recommendedPath === 'security' && '시스템 취약점 분석과 보안 설계 능력'}
                                {recommendedPath === 'gamedev' && '창의적인 상호작용과 게임 메카닉 구현 능력'}
                                {recommendedPath === 'embedded' && '하드웨어와 소프트웨어 통합 최적화 능력'}
                                {recommendedPath === 'ai' && '데이터 기반 학습 모델과 알고리즘 설계 능력'}
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
                                {recommendedPath === 'mobile' && '터치 중심 인터페이스와 다양한 기기 호환성에 관심이 많음'}
                                {recommendedPath === 'security' && '시스템 보안과 침투 테스트에 관심이 많음'}
                                {recommendedPath === 'gamedev' && '사용자 경험과 게임 시스템 디자인에 관심이 많음'}
                                {recommendedPath === 'embedded' && '하드웨어 제어와 저수준 최적화에 관심이 많음'}
                                {recommendedPath === 'ai' && '패턴 인식과 예측 모델링에 관심이 많음'}
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
                                {recommendedPath === 'mobile' && '모바일 기기 특화 UI/UX 디자인 감각'}
                                {recommendedPath === 'security' && '방어적 사고방식과 위협 모델링 능력'}
                                {recommendedPath === 'gamedev' && '물리 엔진과 3D 공간에 대한 이해'}
                                {recommendedPath === 'embedded' && '제한된 자원 환경에서의 성능 최적화 능력'}
                                {recommendedPath === 'ai' && '수학적 모델과 알고리즘 설계 능력'}
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
                                {recommendedPath === 'mobile' && '다양한 기기에서 일관된 경험을 제공하는 적응력'}
                                {recommendedPath === 'security' && '지속적인 학습과 보안 트렌드 파악 능력'}
                                {recommendedPath === 'gamedev' && '창의적 문제 해결과 사용자 몰입 경험 설계'}
                                {recommendedPath === 'embedded' && '하드웨어-소프트웨어 통합 디버깅 능력'}
                                {recommendedPath === 'ai' && '데이터로부터 의미 있는 패턴을 발견하는 직관'}
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">학습 로드맵</h3>
                  <p className="text-gray-700">{details.learningPath}</p>
                </div>
                
                {details.challengesExpected && details.challengesExpected.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">예상되는 도전과제</h3>
                    <ul className="space-y-2">
                      {details.challengesExpected.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            {activeTab === 'stats' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">통계</h2>
                <p className="text-gray-600 mb-6">
                  통계 데이터를 불러오는 중입니다...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {renderAdminSection()}
    </div>
  );
};

export default ResultsScreen;