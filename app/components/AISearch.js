'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AISearch({ isOpen, onClose }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTime, setSearchTime] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'courses', 'tutors'
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  // Quick suggestions as user types
  useEffect(() => {
    if (searchQuery.length > 2) {
      const quickSuggestions = [
        'My child struggles with mathematics, need help',
        'Find GCSE exam preparation courses',
        'Year 6 SATs preparation help needed',
        'Looking for science tutor for Year 10',
        'Check my child\'s progress and suggest improvements',
        'Best courses for English literature',
        'Need homework help for algebra',
        'Primary school maths foundation course',
      ].filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      setSuggestions(quickSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchResults(null);
    setSearchTime(null);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const endTime = Date.now();
      setSearchTime(((endTime - startTime) / 1000).toFixed(2));
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({
        aiSuggestion: 'Sorry, there was an error processing your search. Please try again.',
        courses: [],
        tutors: [],
      });
      const endTime = Date.now();
      setSearchTime(((endTime - startTime) / 1000).toFixed(2));
    } finally {
      setIsSearching(false);
    }
  };

  const clearAll = () => {
    setSearchQuery('');
    setSearchResults(null);
    setSearchTime(null);
    setActiveFilter('all');
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleCourseClick = (courseSlug) => {
    onClose();
    router.push(`/courses/${courseSlug}`);
  };

  const handleTutorClick = (tutorSlug) => {
    onClose();
    router.push(`/tutors/${tutorSlug}`);
  };

  // Function to render markdown bold text (**text** -> <strong>text</strong>)
  const renderMarkdown = (text) => {
    if (!text) return null;

    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-[10vh]">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
          {/* Search Input */}
          <div className="border-b border-gray-200">
            <div className="flex items-center px-6 py-4">
              <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                placeholder="Type a command or search... (e.g., 'My child struggles with maths')"
                className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
              />
              <div className="flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Clear search"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {(searchQuery || searchResults) && (
                  <button
                    onClick={clearAll}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filters and Stats Bar */}
          {searchResults && !isSearching && (
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Filter Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600 mr-2">Filter:</span>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'all'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    All Results
                  </button>
                  <button
                    onClick={() => setActiveFilter('courses')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'courses'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Courses ({searchResults.courses?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveFilter('tutors')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeFilter === 'tutors'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Tutors ({searchResults.tutors?.length || 0})
                  </button>
                </div>

                {/* Search Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{searchTime}s</span>
                  </div>
                  <div className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                    {(searchResults.courses?.length || 0) + (searchResults.tutors?.length || 0)} results
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!searchQuery && !searchResults && (
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { icon: '🎯', text: 'Find courses for struggling subjects', query: 'My child struggles with mathematics' },
                    { icon: '👨‍🏫', text: 'Get a personal tutor', query: 'Find me a tutor for' },
                    { icon: '📊', text: 'Check child progress', query: 'Check my child progress and suggest' },
                    { icon: '📚', text: 'GCSE exam preparation', query: 'GCSE exam preparation courses' },
                    { icon: '📝', text: 'Year 6 SATs preparation', query: 'Year 6 SATs preparation' },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(action.query)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-left transition-colors"
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.text}</p>
                        <p className="text-xs text-gray-500">Click to search</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics help', 'Science tutor', 'English GCSE', 'Year 6 SATs', 'Homework support', 'Primary maths'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSuggestionClick(tag)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions while typing */}
            {searchQuery && suggestions.length > 0 && !searchResults && (
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Suggestions</h3>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-left transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">AI is analyzing your request...</p>
              </div>
            )}

            {/* Search Results */}
            {searchResults && !isSearching && (
              <div className="p-6">
                {/* AI Suggestion - Professional Enterprise Style */}
                <div className="mb-6 p-5 bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md border border-green-100">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-sm font-bold text-green-900">AI-Powered Recommendation</h3>
                        <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">Smart</span>
                      </div>
                      <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {renderMarkdown(searchResults.aiSuggestion)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courses */}
                {(activeFilter === 'all' || activeFilter === 'courses') && searchResults.courses && searchResults.courses.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        Recommended Courses
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {searchResults.courses.length}
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {searchResults.courses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleCourseClick(course.slug)}
                          className="p-4 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-1">{course.name}</h5>
                              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <span className="text-yellow-400">★</span> {course.rating}
                                </span>
                                <span>•</span>
                                <span>{course.duration}</span>
                                <span>•</span>
                                <span className="font-medium text-green-600">£{course.price}</span>
                              </div>
                            </div>
                            <div className="text-3xl ml-4">{course.image}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tutors */}
                {(activeFilter === 'all' || activeFilter === 'tutors') && searchResults.tutors && searchResults.tutors.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">👨‍🏫</span>
                        Recommended Tutors
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {searchResults.tutors.length}
                        </span>
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {searchResults.tutors.map((tutor) => (
                        <div
                          key={tutor.id}
                          onClick={() => handleTutorClick(tutor.slug)}
                          className="p-4 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold text-gray-900">{tutor.name}</h5>
                                {tutor.verified && (
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{tutor.tagline}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <span className="text-yellow-400">★</span> {tutor.rating}
                                </span>
                                <span>•</span>
                                <span>{tutor.experience}</span>
                                <span>•</span>
                                <span className="font-medium text-green-600">£{tutor.hourlyRate}/hr</span>
                              </div>
                            </div>
                            <div className="text-3xl ml-4">{tutor.photo}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {activeFilter === 'all' && (!searchResults.courses || searchResults.courses.length === 0) &&
                 (!searchResults.tutors || searchResults.tutors.length === 0) && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 font-medium">No specific matches found</p>
                    <p className="text-sm text-gray-500 mt-1">But our AI recommendation above should help guide you!</p>
                  </div>
                )}
                {activeFilter === 'courses' && (!searchResults.courses || searchResults.courses.length === 0) && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-600 font-medium">No courses found</p>
                    <p className="text-sm text-gray-500 mt-1">Try searching for tutors or viewing all results</p>
                  </div>
                )}
                {activeFilter === 'tutors' && (!searchResults.tutors || searchResults.tutors.length === 0) && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-600 font-medium">No tutors found</p>
                    <p className="text-sm text-gray-500 mt-1">Try searching for courses or viewing all results</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-linear-to-r from-gray-50 to-green-50">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1.5">
                  Press <kbd className="px-2.5 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono">Enter</kbd> to search
                </span>
                <span className="flex items-center gap-1.5">
                  Press <kbd className="px-2.5 py-1 bg-white border border-gray-300 rounded shadow-sm font-mono">Esc</kbd> to close
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-200 rounded-full shadow-sm">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-green-700 font-semibold">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
