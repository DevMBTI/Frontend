import React, { useState } from 'react';
import AIGeneratedQuestion from '../components/AiGeneratedQuestion';
import { pathLabels } from '../utils/questions';

const ResultsScreen = ({ result, userName, onRestart }) => {
  const { recommendedPath, scores, details, allPaths } = result;
  const maxScore = Math.max(...Object.values(scores));
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-2xl font-bold text-white mb-1">
              {userName ? `${userName}님의 개발자 진로 추천 결과` : '개발자 진로 추천 결과'}
            </h1>
            <p className="text-indigo-100 text-lg max-w-lg">
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
    </div>
  );
};

export default ResultsScreen;