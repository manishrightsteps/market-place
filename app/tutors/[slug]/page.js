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
      <div className="min-h-screen bg-linear-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tutor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-blue-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Tutor Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4">
                {/* Profile Photo */}
                <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-5xl shrink-0">
                  {tutor.photo}
                </div>

                <div className="flex-1">
                  {/* Tutor Name */}
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">{tutor.name}</h1>
                    {tutor.verified && (
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-lg text-gray-300 mb-3">{tutor.tagline}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-1">{tutor.rating}</span>
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-300">({tutor.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-300">{tutor.hoursTeaching} hours taught</span>
                    {tutor.available && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Available Now
                        </span>
                      </>
                    )}
                  </div>

                  {/* Subjects/Category Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                      {tutor.category}
                    </span>
                    {tutor.specialization?.map((spec, idx) => (
                      <span key={idx} className="bg-white/10 text-white px-3 py-1 rounded text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 text-center border-b border-gray-200">
                  <div className="text-5xl font-bold text-gray-900 mb-1">£{tutor.hourlyRate}</div>
                  <div className="text-gray-600">/hour</div>
                </div>
                <div className="p-6">
                  <button
                    onClick={handleBookNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg transition-colors mb-3"
                  >
                    Book Trial Lesson
                  </button>
                  <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors">
                    Send Message
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-semibold text-gray-900">{tutor.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-semibold text-gray-900">{tutor.students}+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response:</span>
                        <span className="font-semibold text-gray-900">{tutor.responseTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Availability:</span>
                        <span className={`font-semibold ${tutor.available ? 'text-green-600' : 'text-gray-500'}`}>
                          {tutor.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>
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
          {/* Left Column - Tutor Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'about'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('qualifications')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'qualifications'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Qualifications
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
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About {tutor.name.split(' ')[0]}</h3>
                      <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {tutor.specialization?.map((spec, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Approach</h3>
                      <p className="text-gray-700 leading-relaxed">
                        With {tutor.experience} years of experience in {tutor.category}, I focus on building strong foundations
                        and helping students achieve their academic goals. My teaching approach is personalized to each student&apos;s
                        learning style and pace, ensuring they not only understand the material but also develop confidence in their abilities.
                      </p>
                    </div>
                  </div>
                )}

                {/* Qualifications Tab */}
                {activeTab === 'qualifications' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Education & Certifications</h3>
                      {tutor.qualifications && tutor.qualifications.length > 0 ? (
                        <ul className="space-y-3">
                          {tutor.qualifications.map((qual, index) => (
                            <li key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                              <svg className="w-6 h-6 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                              </svg>
                              <span className="text-gray-700">{qual}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{tutor.education}</p>
                          <p className="text-gray-600 text-sm mt-2">{tutor.experience} years of teaching experience</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Experience</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-600">{tutor.students}+</div>
                          <div className="text-sm text-gray-600 mt-1">Students Taught</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-600">{tutor.hoursTeaching}</div>
                          <div className="text-sm text-gray-600 mt-1">Hours Taught</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-5xl font-bold text-gray-900">{tutor.rating}</span>
                        <div>
                          <div className="flex text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{tutor.reviews} reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                            P{review}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Parent {review}</p>
                            <div className="flex text-yellow-400 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">
                          Excellent tutor! Really helped my child improve their understanding and confidence in {tutor.category}.
                          {tutor.name.split(' ')[0]} is patient, knowledgeable, and always well-prepared for lessons. Highly recommend!
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Lesson Options</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>One-on-one sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Online lessons via video call</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free trial lesson available</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Progress reports provided</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.languages?.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
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
