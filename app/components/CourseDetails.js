'use client';

import { useState } from 'react';
import PurchaseModal from './PurchaseModal';

export default function CourseDetails({ course, onBack, onBuyNow }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  if (!course) return null;

  const handleBuyNowClick = () => {
    setShowPurchaseModal(true);
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <span>{course.grade}</span>
                <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Mathematics</span>
              </div>

              {/* Course Title */}
              <h1 className="text-4xl font-bold mb-4">{course.name}</h1>

              {/* Description */}
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {course.badges && course.badges.length > 0 && (
                  <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded font-semibold">
                    {course.badges[0] === 'trending' && 'Trending'}
                    {course.badges[0] === 'most-loved' && 'Highest Rated'}
                    {course.badges[0] === 'popular' && 'Popular'}
                    {course.badges[0] === 'bestseller' && 'Bestseller'}
                    {course.badges[0] === 'new' && 'New'}
                  </span>
                )}
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-1">{course.rating}</span>
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-600'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-300">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-gray-300">{course.enrollments.toLocaleString()} students</span>
              </div>

              {/* Instructor */}
              <div className="mt-4">
                <span className="text-gray-400">Created by </span>
                <span className="text-white font-medium">{course.instructor}</span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated {course.lastUpdated}
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden sticky top-20">
                {/* Preview Image */}
                <div className={`bg-linear-to-br ${
                  course.provider === 'rightsteps'
                    ? 'from-green-100 to-green-200'
                    : 'from-gray-100 to-gray-200'
                } h-48 flex items-center justify-center`}>
                  <span className="text-8xl">{course.image}</span>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">£{course.price}</span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={handleBuyNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg transition-colors mb-3"
                  >
                    Buy Now
                  </button>

                  {/* Course Includes */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">This course includes:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {course.duration} on-demand video
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {course.lessons} lessons
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Full lifetime access
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Access on mobile and desktop
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'curriculum'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('instructor')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'instructor'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Instructor
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Reviews
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* What you'll learn */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What you&apos;ll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.learningPoints?.map((point, index) => (
                          <div key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Course Description</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {course.description} This comprehensive course is designed to help students master key concepts through engaging video lessons,
                        interactive exercises, and real-world applications. Perfect for {course.grade} students looking to excel in their studies.
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-700">
                          <span className="mr-2">•</span>
                          <span>Basic understanding of previous year curriculum</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <span className="mr-2">•</span>
                          <span>Computer or tablet with internet connection</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <span className="mr-2">•</span>
                          <span>Willingness to learn and practice regularly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Course Curriculum</h3>
                      <span className="text-sm text-gray-600">{course.lessons} lessons • {course.duration}</span>
                    </div>

                    {/* Modules */}
                    {[1, 2, 3, 4].map((module) => (
                      <div key={module} className="border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <h4 className="font-semibold text-gray-900">Module {module}: Core Concepts</h4>
                          </div>
                          <span className="text-sm text-gray-600">{Math.floor(course.lessons / 4)} lessons</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
                        {course.instructor.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">Senior Mathematics Educator</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            {course.rating} Instructor Rating
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {course.enrollments.toLocaleString()} Students
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      With over 15 years of teaching experience, {course.instructor} has helped thousands of students achieve their academic goals.
                      Specializing in making complex concepts accessible and engaging, their teaching approach focuses on building strong foundational
                      understanding while developing critical thinking skills.
                    </p>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-5xl font-bold text-gray-900">{course.rating}</span>
                        <div>
                          <div className="flex text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{course.reviews.toLocaleString()} reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                            S{review}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Student {review}</p>
                            <div className="flex text-yellow-400 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">
                          Excellent course! The content is well-structured and easy to follow. {course.instructor} explains
                          everything clearly and the practice exercises really help reinforce the concepts.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Course Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-gray-900">{course.completionRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Enrollments</span>
                  <span className="font-semibold text-gray-900">{course.enrollments.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Provider</span>
                  <span className={`font-semibold ${course.provider === 'rightsteps' ? 'text-green-600' : 'text-gray-900'}`}>
                    {course.providerName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={closePurchaseModal}
        item={course}
        type="content"
      />
    </div>
  );
}
