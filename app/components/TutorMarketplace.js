'use client';

import { useState } from 'react';

const mockTutors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    subjects: ['Mathematics', 'Physics'],
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 25,
    verified: true,
    available: true,
    photo: '👩‍🏫',
    tagline: 'Math & Physics Expert',
    education: 'Ph.D. in Mathematics, IIT Delhi',
    hoursTeaching: 500,
    responseTime: '2 hours',
    languages: ['English', 'Hindi']
  },
  {
    id: 2,
    name: 'Prof. Rajesh Kumar',
    subjects: ['Chemistry', 'Biology'],
    experience: '12 years',
    rating: 4.8,
    reviews: 203,
    hourlyRate: 30,
    verified: true,
    available: false,
    photo: '👨‍🏫',
    tagline: 'Science Specialist',
    education: 'M.Sc. Chemistry, Delhi University',
    hoursTeaching: 800,
    responseTime: '1 hour',
    languages: ['English', 'Hindi', 'Punjabi']
  },
  {
    id: 3,
    name: 'Ms. Anita Patel',
    subjects: ['English', 'Literature'],
    experience: '6 years',
    rating: 4.7,
    reviews: 98,
    hourlyRate: 22,
    verified: true,
    available: true,
    photo: '👩‍💼',
    tagline: 'English Language Expert',
    education: 'M.A. English Literature, JNU',
    hoursTeaching: 300,
    responseTime: '30 minutes',
    languages: ['English', 'Hindi', 'Gujarati']
  },
  {
    id: 4,
    name: 'Mr. Vikram Singh',
    subjects: ['Mathematics', 'Computer Science'],
    experience: '5 years',
    rating: 4.9,
    reviews: 87,
    hourlyRate: 28,
    verified: true,
    available: true,
    photo: '👨‍💻',
    tagline: 'Math & Coding Mentor',
    education: 'B.Tech Computer Science, IIT Bombay',
    hoursTeaching: 250,
    responseTime: '1 hour',
    languages: ['English', 'Hindi']
  }
];

export default function TutorMarketplace({
  onTutorSelect,
  showFilters = true,
  compact = false,
  showHeader = true,
  className = "",
  maxWidth = "7xl"
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const handleTutorClick = (tutor, action = 'view') => {
    if (onTutorSelect) {
      onTutorSelect(tutor, action);
    }
  };

  const filteredTutors = mockTutors.filter(tutor => {
    return tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className={`bg-white ${className}`}>
      <div className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        {/* Header */}
        {showHeader && !compact && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">1-on-1 Tutors</h2>
            <p className="text-gray-600">Find verified tutors for personalized learning</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

                {/* Subject Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Subject</h4>
                  <div className="space-y-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'].map(subject => (
                      <label key={subject} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-600">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Experience</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">0-2 years</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">2-5 years</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">5+ years</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Price Range (₹/hour)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">Under ₹300</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">₹300 - ₹400</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">₹400+</span>
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">Available Now</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">This Week</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search tutors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent w-64"
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="rating">Sort by: Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="experience">Experience</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Tutors Grid */}
            <div className={`grid gap-6 ${compact ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
              {filteredTutors.map((tutor) => (
                <div key={tutor.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-100 transition-all duration-300">
                  {/* Header with Photo and Status */}
                  <div className="relative bg-gradient-to-r from-green-50 to-blue-50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="text-5xl">{tutor.photo}</div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${tutor.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                              {tutor.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-600">{tutor.tagline}</p>
                          </div>
                          {tutor.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        tutor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${tutor.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {tutor.available ? 'Available Now' : 'Busy'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Rating and Experience */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-gray-700 ml-1">{tutor.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({tutor.reviews})</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                        {tutor.experience} exp.
                      </span>
                    </div>

                    {/* Subjects */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjects.map((subject, index) => (
                          <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Teaching Hours</p>
                        <p className="font-semibold text-gray-900">{tutor.hoursTeaching}+</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Response Time</p>
                        <p className="font-semibold text-gray-900">{tutor.responseTime}</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-1">Languages:</p>
                      <p className="text-sm text-gray-700">{tutor.languages.join(', ')}</p>
                    </div>

                    {/* Price & Actions */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">£{tutor.hourlyRate}</span>
                          <span className="text-sm text-gray-500">/hour</span>
                        </div>
                        <button
                          onClick={() => handleTutorClick(tutor, 'view')}
                          className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline"
                        >
                          View Profile →
                        </button>
                      </div>

                      <button
                        onClick={() => handleTutorClick(tutor, 'book')}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                          tutor.available
                            ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!tutor.available}
                      >
                        {tutor.available ? 'Book Session Now' : 'Currently Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Load More Tutors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}