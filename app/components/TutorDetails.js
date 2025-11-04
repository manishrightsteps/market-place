'use client';

import { useState } from 'react';
import PurchaseModal from './PurchaseModal';

export default function TutorDetails({ tutor, onBack, onBookNow }) {
  const [activeTab, setActiveTab] = useState('about');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [message, setMessage] = useState('');

  if (!tutor) return null;

  const handleSendMessage = () => {
    // Handle message sending logic here
    console.log('Sending message:', message);
    setShowMessageModal(false);
    setMessage('');
    // Show success notification or handle the message
  };

  const handleBookNowClick = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
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

                  {/* Category and Specializations */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {tutor.category}
                    </span>
                    {tutor.specialization?.map((spec, idx) => (
                      <span key={idx} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {tutor.experience} experience
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Response time: {tutor.responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden sticky top-20">
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">£{tutor.hourlyRate}</span>
                      <span className="text-gray-600">/hour</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={handleBookNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors mb-2"
                  >
                    Book a Session
                  </button>

                  <button
                    onClick={() => setShowMessageModal(true)}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-2 rounded-lg font-medium text-sm transition-colors mb-2 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Send Message
                  </button>

                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-2 rounded-lg font-medium text-sm transition-colors mb-3 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Intro Video
                  </button>

                  {/* Languages */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutor.languages?.map((lang, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tutor Content */}
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
                    onClick={() => setActiveTab('experience')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'experience'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Experience
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
                  <button
                    onClick={() => setActiveTab('availability')}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'availability'
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Availability
                  </button>
                </nav>
              </div>

              <div className="p-4">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-4">
                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">About Me</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Hello! I&apos;m {tutor.name}, and I&apos;m passionate about helping students achieve their academic goals.
                        With {tutor.experience} of teaching experience, I&apos;ve developed a teaching style that adapts to each
                        student&apos;s unique learning needs. I believe in making learning engaging and accessible, using real-world
                        examples and interactive methods to ensure concepts stick.
                      </p>
                    </div>

                    {/* Teaching Style */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Teaching Style</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Personalized lesson plans</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Interactive learning methods</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Regular progress tracking</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">Flexible pacing</span>
                        </div>
                      </div>
                    </div>

                    {/* Subject & Specializations */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Subject & Specializations</h3>
                      <div className="mb-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                          {tutor.category}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {tutor.specialization?.map((spec, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="mr-2">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
                      <div className="border-l-4 border-green-600 pl-4 mb-6">
                        <p className="font-semibold text-gray-900">{tutor.education}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Experience</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-gray-300 pl-4">
                          <p className="font-semibold text-gray-900">Private Tutor</p>
                          <p className="text-gray-600 text-sm mb-2">{tutor.experience}</p>
                          <p className="text-gray-700">
                            Provided one-on-one tutoring to students of various age groups, helping them improve their
                            grades and build confidence in their academic abilities.
                          </p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-4">
                          <p className="font-semibold text-gray-900">Online Education Platform</p>
                          <p className="text-gray-600 text-sm mb-2">2+ years</p>
                          <p className="text-gray-700">
                            Conducted online lessons for students worldwide, adapting teaching methods for virtual learning
                            environments and utilizing digital tools for enhanced engagement.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-700">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Helped over 100 students improve their grades by at least one level</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Average student satisfaction rating of {tutor.rating}/5.0</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                          <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Completed {tutor.hoursTeaching}+ hours of successful tutoring sessions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
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
                    {[1, 2, 3, 4].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                            S{review}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-900">Student {review}</p>
                              <span className="text-sm text-gray-500">2 weeks ago</span>
                            </div>
                            <div className="flex text-yellow-400 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">
                          Excellent tutor! {tutor.name.split(' ')[0]} is very patient and explains concepts clearly.
                          My understanding has improved significantly after just a few sessions. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Availability Tab */}
                {activeTab === 'availability' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Availability</h3>
                      <p className="text-gray-700 mb-6">
                        Typical availability (may vary). Book a session to see real-time available slots.
                      </p>

                      <div className="space-y-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                          <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-900">{day}</span>
                            <span className="text-gray-600">
                              {idx < 5 ? '3:00 PM - 9:00 PM' : idx === 5 ? '9:00 AM - 9:00 PM' : 'Not available'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <strong>Note:</strong> Availability shown is in GMT (London time).
                          Flexible scheduling available for regular students.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Tutor Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold text-gray-900">{tutor.responseTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-semibold text-gray-900">50+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hours Taught</span>
                  <span className="font-semibold text-gray-900">{tutor.hoursTeaching}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Verified</span>
                  <span className="flex items-center text-green-600 font-semibold">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Introduction Video - {tutor.name}</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg">Video Player</p>
                  <p className="text-gray-400 text-sm mt-2">Introduction video from {tutor.name}</p>
                </div>
              </div>

              {/* Video Description */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">About this video</h4>
                <p className="text-gray-700 text-sm">
                  Get to know {tutor.name} through this introduction video where they share their teaching approach,
                  experience, and what makes their tutoring style unique. This is a great way to see if their teaching
                  style matches your learning needs before booking a session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Send Message to {tutor.name}</h3>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessage('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi, I'm interested in learning more about your tutoring sessions..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Typical response time: {tutor.responseTime}
                </p>
              </div>

              {/* Quick Message Templates */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setMessage("Hi, I'd like to know more about your teaching approach.")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    Teaching approach
                  </button>
                  <button
                    onClick={() => setMessage("What's your availability this week?")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    Availability
                  </button>
                  <button
                    onClick={() => setMessage("Do you offer package discounts?")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    Package pricing
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessage('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
