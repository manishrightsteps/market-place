'use client';

import { useState, useEffect, useRef } from 'react';

export default function AISearch({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
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

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({
        aiSuggestion: 'Sorry, there was an error processing your search. Please try again.',
        courses: [],
        tutors: [],
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
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
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults(null);
                  }}
                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

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
                {/* AI Suggestion */}
                <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-green-900 mb-2">AI Recommendation</h3>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {searchResults.aiSuggestion}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Found {searchResults.courses?.length || 0} courses and {searchResults.tutors?.length || 0} tutors
                  </h3>
                </div>

                {/* Courses */}
                {searchResults.courses && searchResults.courses.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">📚 Recommended Courses</h4>
                    <div className="space-y-3">
                      {searchResults.courses.map((course) => (
                        <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
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
                {searchResults.tutors && searchResults.tutors.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">👨‍🏫 Recommended Tutors</h4>
                    <div className="space-y-3">
                      {searchResults.tutors.map((tutor) => (
                        <div key={tutor.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
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
                {(!searchResults.courses || searchResults.courses.length === 0) &&
                 (!searchResults.tutors || searchResults.tutors.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No specific matches found, but our AI recommendation above should help!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Press <kbd className="px-2 py-1 bg-white border border-gray-200 rounded">↵</kbd> to search</span>
                <span>Press <kbd className="px-2 py-1 bg-white border border-gray-200 rounded">ESC</kbd> to close</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✨</span>
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
