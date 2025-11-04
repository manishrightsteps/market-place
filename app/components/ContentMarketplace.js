'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockSubjects = [
  {
    id: 1,
    name: 'Mathematics',
    grade: 'Year 8',
    lessons: 25,
    price: 29.99,
    rating: 4.8,
    reviews: 234,
    image: '📐',
    duration: 'Medium (15-20 hours)',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    featured: true,
    badges: ['trending', 'popular'],
    enrollments: 1245,
    completionRate: 94,
    difficulty: 'Beginner',
    lastUpdated: '2024-10-15'
  },
  {
    id: 2,
    name: 'Science',
    grade: 'Year 8',
    lessons: 30,
    price: 34.99,
    rating: 4.9,
    reviews: 189,
    image: '🔬',
    duration: 'Long (25+ hours)',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    featured: true,
    badges: ['most-loved', 'trending'],
    enrollments: 987,
    completionRate: 98,
    difficulty: 'Beginner',
    lastUpdated: '2024-10-20'
  },
  {
    id: 3,
    name: 'English',
    grade: 'Year 8',
    lessons: 20,
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    image: '📚',
    duration: 'Medium (15-20 hours)',
    provider: 'external',
    providerName: 'Learn Plus Academy',
    featured: false,
    badges: ['new'],
    enrollments: 432,
    completionRate: 87,
    difficulty: 'Beginner',
    lastUpdated: '2024-10-25'
  },
  {
    id: 4,
    name: 'Mathematics',
    grade: 'Year 9',
    lessons: 28,
    price: 32.99,
    rating: 4.8,
    reviews: 201,
    image: '📐',
    duration: 'Medium (15-20 hours)',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    featured: true,
    badges: ['popular'],
    enrollments: 756,
    completionRate: 91,
    difficulty: 'Intermediate',
    lastUpdated: '2024-09-30'
  },
  {
    id: 5,
    name: 'Physics',
    grade: 'Year 10',
    lessons: 22,
    price: 39.99,
    rating: 4.9,
    reviews: 167,
    image: '⚛️',
    duration: 'Long (25+ hours)',
    provider: 'external',
    providerName: 'Physics Masters',
    featured: false,
    badges: ['most-loved'],
    enrollments: 623,
    completionRate: 89,
    difficulty: 'Advanced',
    lastUpdated: '2024-10-10'
  },
  {
    id: 6,
    name: 'Chemistry',
    grade: 'Year 10',
    lessons: 24,
    price: 37.99,
    rating: 4.6,
    reviews: 143,
    image: '🧪',
    duration: 'Long (25+ hours)',
    provider: 'external',
    providerName: 'ChemWiz Education',
    featured: false,
    badges: [],
    enrollments: 289,
    completionRate: 82,
    difficulty: 'Intermediate',
    lastUpdated: '2024-08-15'
  },
  {
    id: 7,
    name: 'Advanced Mathematics',
    grade: 'Year 11',
    lessons: 35,
    price: 44.99,
    rating: 4.9,
    reviews: 312,
    image: '📊',
    duration: 'Long (30+ hours)',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    featured: true,
    badges: ['most-loved', 'popular'],
    enrollments: 1567,
    completionRate: 95,
    difficulty: 'Advanced',
    lastUpdated: '2024-10-01'
  },
  {
    id: 8,
    name: 'Biology',
    grade: 'Year 9',
    lessons: 26,
    price: 31.99,
    rating: 4.5,
    reviews: 89,
    image: '🧬',
    duration: 'Medium (18 hours)',
    provider: 'external',
    providerName: 'Bio Science Hub',
    featured: false,
    badges: ['new'],
    enrollments: 156,
    completionRate: 76,
    difficulty: 'Beginner',
    lastUpdated: '2024-10-28'
  }
];

export default function ContentMarketplace({
  onContentSelect,
  showFilters = true,
  showHeader = true,
  className = "",
  maxWidth = "7xl"
}) {
  const [selectedFilters, setSelectedFilters] = useState({
    grades: [],
    subjects: [],
    priceRange: [],
    duration: []
  });
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  const handleContentClick = (content, action = 'view') => {
    if (onContentSelect) {
      onContentSelect(content, action);
    }
  };

  const filteredSubjects = mockSubjects.filter(subject => {
    return subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           subject.grade.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getBadgeStyle = (badge) => {
    const styles = {
      'trending': 'bg-orange-100 text-orange-800 border border-orange-200',
      'most-loved': 'bg-pink-100 text-pink-800 border border-pink-200',
      'popular': 'bg-blue-100 text-blue-800 border border-blue-200',
      'new': 'bg-green-100 text-green-800 border border-green-200'
    };
    return styles[badge] || 'bg-gray-100 text-gray-800';
  };

  const getBadgeIcon = (badge) => {
    const icons = {
      'trending': '🔥',
      'most-loved': '❤️',
      'popular': '⭐',
      'new': '✨'
    };
    return icons[badge] || '';
  };

  const getBadgeText = (badge) => {
    const texts = {
      'trending': 'Trending',
      'most-loved': 'Most Loved',
      'popular': 'Popular',
      'new': 'New'
    };
    return texts[badge] || badge;
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        {/* Header */}
        {showHeader && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Educational Content</h2>
            <p className="text-gray-600">Self-paced learning materials designed by experts</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

                {/* Year Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Year Group</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {[7,8,9,10,11,12,13].map(year => (
                      <label key={year} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-600">Year {year}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Subject</h4>
                  <div className="space-y-2">
                    {['Mathematics', 'Science', 'English', 'Physics', 'Chemistry', 'Biology'].map(subject => (
                      <label key={subject} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-600">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Content Provider */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Content Provider</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Rightsteps Content
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                        Partner Content
                      </span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">Under £20</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">£20 - £35</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">£35 - £50</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="ml-2 text-sm text-gray-600">Above £50</span>
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
                  placeholder="Search subjects..."
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
                  <option value="popular">Sort by: Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <div key={subject.id} className={`group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  subject.provider === 'rightsteps'
                    ? 'border-green-200 hover:border-green-300 ring-1 ring-green-100'
                    : 'border-gray-100 hover:border-gray-200'
                }`}>
                  {/* Course Image/Icon */}
                  <div className={`relative p-8 text-center ${
                    subject.provider === 'rightsteps'
                      ? 'bg-linear-to-br from-green-50 to-emerald-50'
                      : 'bg-linear-to-br from-gray-50 to-slate-50'
                  }`}>
                    <div className="text-5xl mb-2">{subject.image}</div>

                    {/* Provider Badge */}
                    <div className="absolute top-4 left-4">
                      {subject.provider === 'rightsteps' ? (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          Rightsteps
                        </span>
                      ) : (
                        <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {subject.providerName}
                        </span>
                      )}
                    </div>

                    {/* Lessons Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {subject.lessons} lessons
                      </span>
                    </div>

                    {/* Trending/Popular Badges */}
                    {subject.badges && subject.badges.length > 0 && (
                      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                        {subject.badges.slice(0, 2).map((badge, index) => (
                          <span key={index} className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${getBadgeStyle(badge)}`}>
                            <span>{getBadgeIcon(badge)}</span>
                            {getBadgeText(badge)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Course Title & Grade */}
                    <div className="mb-3">
                      <h3 className={`text-xl font-bold mb-1 group-hover:transition-colors ${
                        subject.provider === 'rightsteps'
                          ? 'text-gray-900 group-hover:text-green-600'
                          : 'text-gray-900 group-hover:text-gray-700'
                      }`}>
                        {subject.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block">
                        {subject.grade}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm font-semibold text-gray-700 ml-1">{subject.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({subject.reviews} reviews)</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-gray-900">{subject.enrollments.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-gray-900">{subject.completionRate}%</div>
                        <div className="text-xs text-gray-600">Complete</div>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="mb-4 space-y-2">
                      <p className="text-sm text-gray-600 flex items-center justify-between">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            subject.provider === 'rightsteps' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></span>
                          {subject.duration}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          subject.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          subject.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {subject.difficulty}
                        </span>
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">£{subject.price}</span>
                          <span className="text-sm text-gray-500 ml-1">one-time</span>
                        </div>
                        <button
                          onClick={() => handleContentClick(subject, 'preview')}
                          className={`text-sm font-medium hover:underline ${
                            subject.provider === 'rightsteps'
                              ? 'text-green-600 hover:text-green-700'
                              : 'text-gray-600 hover:text-gray-700'
                          }`}
                        >
                          Preview →
                        </button>
                      </div>

                      <button
                        onClick={() => handleContentClick(subject, 'buy')}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                          subject.provider === 'rightsteps'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-800 hover:bg-gray-900 text-white'
                        }`}
                      >
                        {subject.provider === 'rightsteps' ? 'Get Access Now' : 'Buy from Partner'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more button or pagination */}
            <div className="flex justify-center mt-8">
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Load More Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}