'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PurchaseModal from '@/app/components/PurchaseModal';

export default function TutorPage() {
  const router = useRouter();
  const params = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tutors/${params.slug}`);
        const data = await response.json();

        if (data.success) {
          setTutor(data.data.tutor);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch tutor details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchTutor();
    }
  }, [params.slug]);

  const handleBookNowClick = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutor Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The tutor you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Marketplace
            </button>
            <button
              onClick={handleBookNowClick}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Tutor Header Section */}
      <section className="bg-linear-to-br from-green-700 via-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tutor Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                {tutor.verified && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Tutor
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4">{tutor.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{tutor.tagline}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-1">{tutor.rating}</span>
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-300">({tutor.reviews} reviews)</span>
                </div>
                <div className="text-gray-300">
                  {tutor.students}+ students taught
                </div>
                <div className="text-gray-300">
                  {tutor.experience} years experience
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded border border-white/20">
                    {tutor.category}
                  </span>
                  {tutor.specialization?.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 text-white text-sm rounded border border-white/20">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {tutor.available && (
                <div className="inline-flex items-center gap-2 text-sm text-green-100">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available for lessons
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-video bg-linear-to-br from-gray-800 to-gray-900 relative group cursor-pointer flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-green-600/10 group-hover:bg-green-600/20 transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-4">£{tutor.hourlyRate}/hr</div>
                  <button
                    onClick={handleBookNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold text-base transition-colors mb-3"
                  >
                    Book Trial Lesson
                  </button>
                  <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 rounded-lg font-semibold text-base transition-colors">
                    Send Message
                  </button>
                  <p className="text-center text-xs text-gray-600 mt-4">{tutor.responseTime} response time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Clean Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === 'about'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('qualifications')}
                  className={`pb-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === 'qualifications'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Qualifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tutor.name.split(' ')[0]}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{tutor.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Specializations</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {tutor.specialization?.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-100 rounded-lg"
                        >
                          <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-900 font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Approach</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      With {tutor.experience} years of experience in {tutor.category}, I focus on building strong foundations
                      and helping students achieve their academic goals. My teaching approach is personalized to each student&apos;s
                      learning style and pace, ensuring they not only understand the material but also develop confidence in their abilities.
                    </p>
                  </div>
                </div>
              )}

              {/* Qualifications Tab */}
              {activeTab === 'qualifications' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
                    {tutor.qualifications && tutor.qualifications.length > 0 ? (
                      <div className="space-y-3">
                        {tutor.qualifications.map((qual, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-200 hover:shadow-sm transition-all">
                            <svg className="w-6 h-6 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span className="text-gray-700 flex-1">{qual}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <p className="text-gray-900 font-medium mb-2">{tutor.education}</p>
                        <p className="text-gray-600">{tutor.experience} years of teaching experience</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Experience</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">{tutor.students}+</div>
                        <div className="text-sm text-gray-600">Students Taught</div>
                      </div>
                      <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">{tutor.hoursTeaching}</div>
                        <div className="text-sm text-gray-600">Hours Taught</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{tutor.rating}</div>
                      <div className="flex text-yellow-400 text-xl mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{tutor.reviews} reviews</p>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-12">{star} star</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="p-6 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold shrink-0">
                            P{review}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-bold text-gray-900">Parent {review}</p>
                              <span className="text-sm text-gray-500">2 weeks ago</span>
                            </div>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          Excellent tutor! Really helped my child improve their understanding and confidence in {tutor.category}.
                          {tutor.name.split(' ')[0]} is patient, knowledgeable, and always well-prepared for lessons. Highly recommend!
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="text-center pb-6 border-b border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Hourly Rate</div>
                <div className="text-4xl font-bold text-gray-900">£{tutor.hourlyRate}</div>
                <div className="text-gray-600 mt-1">/hour</div>
              </div>

              {/* Session Details */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Session Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-semibold text-gray-900">{tutor.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-semibold ${tutor.available ? 'text-green-600' : 'text-gray-500'}`}>
                      {tutor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lesson Options */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Lesson Options</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>One-on-one sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Online lessons via video call</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free trial lesson available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Progress reports provided</span>
                  </li>
                </ul>
              </div>

              {/* Languages */}
              {tutor.languages && tutor.languages.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.languages.map((lang, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <PurchaseModal
        isOpen={showBookingModal}
        onClose={closeBookingModal}
        item={tutor}
        type="tutor"
      />
    </div>
  );
}
