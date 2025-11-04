'use client';

import { useState } from 'react';

export default function TutorProfile({ isOpen, onClose, tutor, onBook }) {
  const [selectedPackage, setSelectedPackage] = useState('single');
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!isOpen || !tutor) return null;

  // Mock calendar data
  const availableSlots = [
    { day: 'Monday', date: '4 Nov', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tuesday', date: '5 Nov', slots: ['10:00 AM', '3:00 PM'] },
    { day: 'Wednesday', date: '6 Nov', slots: ['9:00 AM', '11:00 AM', '5:00 PM'] },
    { day: 'Thursday', date: '7 Nov', slots: ['2:00 PM', '4:00 PM'] },
    { day: 'Friday', date: '8 Nov', slots: ['9:00 AM', '1:00 PM', '3:00 PM'] },
  ];

  const packages = [
    {
      id: 'trial',
      name: 'Trial Session',
      price: Math.round(tutor.hourlyRate * 0.4),
      duration: '25 minutes',
      description: 'Perfect for getting to know each other',
      popular: false
    },
    {
      id: 'single',
      name: 'Single Lesson',
      price: Math.round(tutor.hourlyRate * 0.85),
      duration: '50 minutes',
      description: 'One-time lesson',
      popular: false
    },
    {
      id: 'package5',
      name: '5 Lesson Package',
      price: Math.round(tutor.hourlyRate * 0.85 * 4.5),
      originalPrice: Math.round(tutor.hourlyRate * 0.85 * 5),
      duration: '5 x 50 minutes',
      description: 'Save £' + Math.round(tutor.hourlyRate * 0.85 * 0.5),
      popular: true
    },
    {
      id: 'package10',
      name: '10 Lesson Package',
      price: Math.round(tutor.hourlyRate * 0.85 * 8.5),
      originalPrice: Math.round(tutor.hourlyRate * 0.85 * 10),
      duration: '10 x 50 minutes',
      description: 'Save £' + Math.round(tutor.hourlyRate * 0.85 * 1.5),
      popular: false
    }
  ];

  const reviews = [
    {
      name: 'Sarah Thompson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent tutor! My daughter\'s confidence in maths has improved dramatically. Clear explanations and very patient.',
      subject: 'Mathematics'
    },
    {
      name: 'James Wilson',
      rating: 5,
      date: '1 month ago',
      comment: 'Really helped my son understand physics concepts. Great teaching style and always prepared.',
      subject: 'Physics'
    },
    {
      name: 'Emma Davis',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Good tutor, very knowledgeable. Sometimes sessions run a bit over time but worth it for the extra help.',
      subject: 'Mathematics'
    }
  ];

  const qualifications = [
    '📜 Ph.D. in Mathematics, University of Cambridge',
    '📜 8 years teaching experience',
    '📜 Certified in online tutoring methods',
    '📜 DBS checked and verified'
  ];

  const handleSlotSelect = (day, slot) => {
    setSelectedSlot({ day, slot });
  };

  const handleBooking = () => {
    if (selectedSlot) {
      const bookingData = {
        tutor,
        package: packages.find(p => p.id === selectedPackage),
        slot: selectedSlot
      };
      onBook(bookingData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="text-5xl">{tutor.photo}</div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${tutor.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-lg text-gray-600 mb-2">{tutor.tagline}</p>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-700 ml-1">{tutor.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({tutor.reviews} reviews)</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {tutor.experience} experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    tutor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${tutor.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {tutor.available ? 'Available Now' : 'Busy'}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Verified
                  </span>
                </div>
              </div>
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
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* About Section */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">About {tutor.name.split(' ')[0]}</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                With {tutor.experience} of experience in education, I specialise in making {tutor.subjects.join(' and ')} accessible
                and engaging for students of all abilities. My approach focuses on building confidence and understanding through
                personalised teaching methods tailored to each student's learning style.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I believe in creating a supportive environment where students feel comfortable asking questions and making mistakes
                as part of the learning process. My goal is to help each student reach their full potential and develop a genuine
                love for learning.
              </p>
            </section>

            {/* Subjects */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Subjects I Teach</h4>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject, index) => (
                  <span key={index} className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </section>

            {/* Qualifications */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Qualifications & Experience</h4>
              <div className="space-y-2">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Introduction */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Introduction Video</h4>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🎥</div>
                <h5 className="font-medium text-gray-900 mb-2">Meet Your Tutor</h5>
                <p className="text-gray-600 mb-4">Watch a brief introduction from {tutor.name.split(' ')[0]}</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Play Video
                </button>
              </div>
            </section>

            {/* Reviews */}
            <section className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Student Reviews</h4>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">{review.name}</h5>
                        <span className="text-sm text-gray-500">{review.subject} • {review.date}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              {/* Pricing Packages */}
              <h5 className="font-semibold text-gray-900 mb-4">Choose a Package</h5>
              <div className="space-y-3 mb-6">
                {packages.map((pkg) => (
                  <label key={pkg.id} className="relative">
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      {pkg.popular && (
                        <span className="absolute -top-2 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Most Popular
                        </span>
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h6 className="font-medium text-gray-900">{pkg.name}</h6>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">£{pkg.price}</div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">£{pkg.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{pkg.duration}</p>
                      <p className="text-sm text-green-600 font-medium">{pkg.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Available Times */}
              <h5 className="font-semibold text-gray-900 mb-4">Available Times</h5>
              <div className="space-y-3 mb-6">
                {availableSlots.map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <h6 className="text-sm font-medium text-gray-700 mb-2">{day.day}, {day.date}</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <button
                          key={slotIndex}
                          onClick={() => handleSlotSelect(day.day + ' ' + day.date, slot)}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            selectedSlot?.day === day.day + ' ' + day.date && selectedSlot?.slot === slot
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white border-gray-200 hover:border-green-300 text-gray-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Teaching Stats */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <h6 className="font-medium text-gray-900 mb-3">Quick Stats</h6>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">{tutor.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours Taught:</span>
                    <span className="font-medium">{tutor.hoursTeaching}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="font-medium">{tutor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedSlot || !tutor.available}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                  selectedSlot && tutor.available
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!selectedSlot ? 'Select a Time Slot' :
                 !tutor.available ? 'Currently Unavailable' :
                 `Book ${packages.find(p => p.id === selectedPackage)?.name}`}
              </button>

              {selectedSlot && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm">
                  <div className="font-medium text-green-800">Selected:</div>
                  <div className="text-green-700">{selectedSlot.day} at {selectedSlot.slot}</div>
                  <div className="text-green-700">£{packages.find(p => p.id === selectedPackage)?.price}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}