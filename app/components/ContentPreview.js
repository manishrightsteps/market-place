'use client';

import { useState } from 'react';

export default function ContentPreview({ isOpen, onClose, content, onPurchase }) {
  const [currentLesson, setCurrentLesson] = useState(0);

  if (!isOpen || !content) return null;

  const sampleLessons = [
    {
      title: 'Introduction to ' + content.name,
      duration: '5:30',
      type: 'video',
      preview: true
    },
    {
      title: 'Basic Concepts',
      duration: '8:45',
      type: 'video',
      preview: false
    },
    {
      title: 'Practice Exercise 1',
      duration: '12:15',
      type: 'interactive',
      preview: false
    },
    {
      title: 'Advanced Topics',
      duration: '15:20',
      type: 'video',
      preview: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{content.name} Preview</h3>
              <p className="text-gray-600 mt-1">{content.grade} • {content.lessons} total lessons</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Video/Content Area */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">{content.image}</div>
              <h4 className="text-xl font-semibold mb-2">{sampleLessons[currentLesson].title}</h4>
              <p className="text-gray-300 mb-6">Duration: {sampleLessons[currentLesson].duration}</p>

              {sampleLessons[currentLesson].preview ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">This is a sample preview lesson showing the teaching style and content quality.</p>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">This lesson is available after purchase</p>
                  <button
                    onClick={() => onPurchase(content)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Unlock All Lessons
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h5 className="font-semibold text-gray-900 mb-4">Course Content</h5>

              <div className="space-y-2">
                {sampleLessons.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentLesson === index
                        ? 'bg-green-100 border border-green-200'
                        : 'bg-white border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h6 className={`font-medium text-sm ${
                        currentLesson === index ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </h6>
                      {lesson.preview ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Preview
                        </span>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`w-2 h-2 rounded-full ${
                        lesson.type === 'video' ? 'bg-blue-400' : 'bg-purple-400'
                      }`}></span>
                      <span>{lesson.type === 'video' ? 'Video' : 'Interactive'}</span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Course Stats */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h6 className="font-medium text-gray-900 mb-3">What's Included</h6>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{content.lessons} video lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Downloadable worksheets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Certificate on completion</span>
                  </div>
                </div>
              </div>

              {/* Purchase CTA */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">£{content.price}</div>
                  <div className="text-sm text-gray-600 mb-4">One-time payment • Lifetime access</div>
                  <button
                    onClick={() => onPurchase(content)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Get Full Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}