'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PurchaseModal from '@/app/components/PurchaseModal';

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${params.slug}`);
        const data = await response.json();

        if (data.success) {
          setCourse(data.data.course);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch course details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCourse();
    }
  }, [params.slug]);

  const handleBuyNowClick = () => {
    setShowPurchaseModal(true);
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The course you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
            <button
              onClick={handleBuyNowClick}
              className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Enrol Now
            </button>
          </div>
        </div>
      </header>

      {/* Course Header Section */}
      <section className="bg-linear-to-br from-green-700 via-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                {course.badges && course.badges.length > 0 && (
                  <span className="inline-block px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold uppercase rounded">
                    {course.badges[0] === 'trending' && 'Trending'}
                    {course.badges[0] === 'most-loved' && 'Highest Rated'}
                    {course.badges[0] === 'popular' && 'Popular'}
                    {course.badges[0] === 'bestseller' && 'Bestseller'}
                    {course.badges[0] === 'new' && 'New'}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-1">{course.rating}</span>
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-300">({course.reviews.toLocaleString()} ratings)</span>
                </div>
                <div className="text-gray-300">
                  {course.enrollments.toLocaleString()} students enrolled
                </div>
                <div className="text-gray-300">
                  {course.grade}
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-300">
                <span>Created by</span>
                <span className="ml-2 font-semibold text-white">{course.instructor}</span>
              </div>

              <div className="mt-2 text-sm text-gray-300">
                Last updated {course.lastUpdated}
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-video bg-gray-100 flex items-center justify-center text-6xl">
                  {course.image}
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-4">£{course.price}</div>
                  <button
                    onClick={handleBuyNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold text-base transition-colors mb-3"
                  >
                    Buy Now
                  </button>
                  <p className="text-center text-xs text-gray-600">30-Day Money-Back Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What you&apos;ll learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.learningPoints?.map((point, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Basic understanding of previous year curriculum</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Access to a computer or tablet with internet connection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Willingness to learn and practice regularly</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {course.description} This comprehensive {course.grade} course is designed to help students master essential concepts
                      through engaging video lessons, interactive exercises, and real-world applications. Perfect for students looking to
                      excel in their studies and build a strong foundation for future academic success.
                    </p>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                    <span className="text-sm text-gray-600">{course.lessons} lessons • {course.duration}</span>
                  </div>

                  {[1, 2, 3, 4].map((section) => (
                    <div key={section} className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">Section {section}: Core Concepts</h3>
                            <p className="text-sm text-gray-600 mt-1">{Math.floor(course.lessons / 4)} lectures • {Math.floor(parseFloat(course.duration) / 4)} hours</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">About the Instructor</h2>

                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">Senior Mathematics Educator</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {course.rating} Instructor Rating
                        </div>
                        <div>
                          {course.enrollments.toLocaleString()} Students
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    With over 15 years of teaching experience, {course.instructor} has helped thousands of students achieve their
                    academic goals. Specializing in making complex concepts accessible and engaging, their teaching approach focuses on
                    building strong foundational understanding while developing critical thinking skills.
                  </p>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Feedback</h2>
                    <div className="flex items-center space-x-8 mb-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Course Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold shrink-0">
                            S{review}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">Student {review}</h4>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              Excellent course! The content is well-structured and easy to follow. {course.instructor} explains
                              everything clearly and the practice exercises really help reinforce the concepts. Highly recommended
                              for {course.grade} students.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">2 weeks ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Info Box */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">This course includes:</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {course.duration} on-demand video
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {course.lessons} lessons
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Full lifetime access
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Access on mobile and tablet
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certificate of completion
                  </li>
                </ul>
              </div>

              {/* Course Stats */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Course Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Difficulty Level</dt>
                    <dd className="font-semibold text-gray-900">{course.difficulty}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Students Enrolled</dt>
                    <dd className="font-semibold text-gray-900">{course.enrollments.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Completion Rate</dt>
                    <dd className="font-semibold text-green-600">{course.completionRate}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Last Updated</dt>
                    <dd className="font-semibold text-gray-900">{course.lastUpdated}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Provider</dt>
                    <dd className={`font-semibold ${course.provider === 'rightsteps' ? 'text-green-600' : 'text-gray-900'}`}>
                      {course.providerName}
                    </dd>
                  </div>
                </dl>
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
