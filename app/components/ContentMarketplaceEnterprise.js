'use client';

import { useState } from 'react';

const mockSubjects = [
  {
    id: 1,
    name: 'Complete Mathematics Mastery',
    grade: 'Year 8',
    lessons: 25,
    price: 29.99,
    rating: 4.8,
    reviews: 234,
    image: '📐',
    duration: '15.5 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Sarah Mitchell',
    badges: ['trending', 'popular'],
    enrollments: 1245,
    completionRate: 94,
    difficulty: 'Beginner',
    lastUpdated: 'October 2024',
    description: 'Master essential mathematics concepts with interactive lessons and real-world applications.',
    learningPoints: ['Algebra fundamentals', 'Geometry principles', 'Problem-solving strategies']
  },
  {
    id: 2,
    name: 'Science Fundamentals',
    grade: 'Year 8',
    lessons: 30,
    price: 34.99,
    rating: 4.9,
    reviews: 189,
    image: '🔬',
    duration: '22 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Prof. James Chen',
    badges: ['most-loved', 'bestseller'],
    enrollments: 987,
    completionRate: 98,
    difficulty: 'Beginner',
    lastUpdated: 'October 2024',
    description: 'Comprehensive science course covering biology, chemistry, and physics concepts.',
    learningPoints: ['Scientific method', 'Lab techniques', 'Critical thinking']
  },
  {
    id: 3,
    name: 'English Language Excellence',
    grade: 'Year 8',
    lessons: 20,
    price: 24.99,
    rating: 4.7,
    reviews: 156,
    image: '📚',
    duration: '12 hours',
    provider: 'external',
    providerName: 'Learn Plus Academy',
    instructor: 'Emma Thompson',
    badges: ['new'],
    enrollments: 432,
    completionRate: 87,
    difficulty: 'Beginner',
    lastUpdated: 'October 2024',
    description: 'Improve reading comprehension, writing skills, and grammar mastery.',
    learningPoints: ['Grammar rules', 'Essay writing', 'Literature analysis']
  },
  {
    id: 4,
    name: 'Advanced Mathematics',
    grade: 'Year 9',
    lessons: 28,
    price: 32.99,
    rating: 4.8,
    reviews: 201,
    image: '📐',
    duration: '18 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Sarah Mitchell',
    badges: ['popular'],
    enrollments: 756,
    completionRate: 91,
    difficulty: 'Intermediate',
    lastUpdated: 'September 2024',
    description: 'Build on foundational maths with advanced topics and complex problem solving.',
    learningPoints: ['Advanced algebra', 'Trigonometry basics', 'Functions and graphs']
  },
  {
    id: 5,
    name: 'GCSE Physics Preparation',
    grade: 'Year 10',
    lessons: 22,
    price: 39.99,
    rating: 4.9,
    reviews: 167,
    image: '⚛️',
    duration: '25 hours',
    provider: 'external',
    providerName: 'Physics Masters',
    instructor: 'Dr. Michael Brown',
    badges: ['most-loved'],
    enrollments: 623,
    completionRate: 89,
    difficulty: 'Advanced',
    lastUpdated: 'October 2024',
    description: 'Complete GCSE physics preparation with exam techniques and practice questions.',
    learningPoints: ['Forces and motion', 'Energy transfers', 'Electricity and magnetism']
  },
  {
    id: 6,
    name: 'Chemistry Essentials',
    grade: 'Year 10',
    lessons: 24,
    price: 37.99,
    rating: 4.6,
    reviews: 143,
    image: '🧪',
    duration: '20 hours',
    provider: 'external',
    providerName: 'ChemWiz Education',
    instructor: 'Dr. Lisa Wang',
    badges: [],
    enrollments: 289,
    completionRate: 82,
    difficulty: 'Intermediate',
    lastUpdated: 'August 2024',
    description: 'Explore chemical reactions, atomic structure, and the periodic table.',
    learningPoints: ['Chemical bonding', 'Reactions', 'Practical skills']
  },
  {
    id: 7,
    name: 'Introduction to Algebra',
    grade: 'Year 7',
    lessons: 18,
    price: 19.99,
    rating: 4.5,
    reviews: 98,
    image: '📐',
    duration: '9 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Sarah Mitchell',
    badges: ['new'],
    enrollments: 234,
    completionRate: 88,
    difficulty: 'Beginner',
    lastUpdated: 'November 2024',
    description: 'Build a strong foundation in algebra for young learners.',
    learningPoints: ['Basic equations', 'Variables', 'Simple expressions']
  },
  {
    id: 8,
    name: 'Biology for GCSE',
    grade: 'Year 11',
    lessons: 35,
    price: 44.99,
    rating: 4.9,
    reviews: 312,
    image: '🧬',
    duration: '28 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Prof. James Chen',
    badges: ['bestseller', 'trending'],
    enrollments: 1567,
    completionRate: 96,
    difficulty: 'Advanced',
    lastUpdated: 'October 2024',
    description: 'Complete GCSE Biology preparation with detailed explanations and exam practice.',
    learningPoints: ['Cell biology', 'Genetics', 'Evolution', 'Ecology']
  },
  {
    id: 9,
    name: 'Creative Writing Workshop',
    grade: 'Year 9',
    lessons: 15,
    price: 27.99,
    rating: 4.7,
    reviews: 87,
    image: '✍️',
    duration: '8 hours',
    provider: 'external',
    providerName: 'Write Bright',
    instructor: 'Sophie Turner',
    badges: ['popular'],
    enrollments: 345,
    completionRate: 85,
    difficulty: 'Intermediate',
    lastUpdated: 'September 2024',
    description: 'Develop creative writing skills through engaging exercises and feedback.',
    learningPoints: ['Storytelling', 'Character development', 'Descriptive writing']
  },
  {
    id: 10,
    name: 'GCSE Mathematics Higher',
    grade: 'Year 11',
    lessons: 40,
    price: 49.99,
    rating: 4.9,
    reviews: 445,
    image: '📐',
    duration: '35 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Sarah Mitchell',
    badges: ['bestseller', 'most-loved'],
    enrollments: 2134,
    completionRate: 97,
    difficulty: 'Advanced',
    lastUpdated: 'October 2024',
    description: 'Complete higher tier GCSE maths course with comprehensive exam preparation.',
    learningPoints: ['Advanced algebra', 'Calculus introduction', 'Statistics', 'Trigonometry']
  },
  {
    id: 11,
    name: 'Shakespeare Studies',
    grade: 'Year 10',
    lessons: 12,
    price: 22.99,
    rating: 4.6,
    reviews: 76,
    image: '🎭',
    duration: '6 hours',
    provider: 'external',
    providerName: 'Classic Literature Hub',
    instructor: 'Michael Robertson',
    badges: [],
    enrollments: 198,
    completionRate: 79,
    difficulty: 'Intermediate',
    lastUpdated: 'August 2024',
    description: 'Deep dive into Shakespeare\'s works with analysis and interpretation.',
    learningPoints: ['Literary analysis', 'Historical context', 'Language techniques']
  },
  {
    id: 12,
    name: 'Computer Science Basics',
    grade: 'Year 8',
    lessons: 22,
    price: 31.99,
    rating: 4.8,
    reviews: 167,
    image: '💻',
    duration: '14 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Alex Kumar',
    badges: ['trending'],
    enrollments: 678,
    completionRate: 92,
    difficulty: 'Beginner',
    lastUpdated: 'November 2024',
    description: 'Introduction to programming and computational thinking.',
    learningPoints: ['Python basics', 'Algorithms', 'Problem solving']
  },
  {
    id: 13,
    name: 'French Language Foundation',
    grade: 'Year 7',
    lessons: 26,
    price: 28.99,
    rating: 4.5,
    reviews: 112,
    image: '🇫🇷',
    duration: '16 hours',
    provider: 'external',
    providerName: 'Language Masters',
    instructor: 'Marie Dubois',
    badges: ['new'],
    enrollments: 289,
    completionRate: 84,
    difficulty: 'Beginner',
    lastUpdated: 'October 2024',
    description: 'Learn French from scratch with interactive lessons.',
    learningPoints: ['Basic vocabulary', 'Grammar', 'Pronunciation']
  },
  {
    id: 14,
    name: 'History: World War II',
    grade: 'Year 9',
    lessons: 18,
    price: 26.99,
    rating: 4.7,
    reviews: 134,
    image: '🌍',
    duration: '11 hours',
    provider: 'external',
    providerName: 'History Academy',
    instructor: 'Prof. David Williams',
    badges: ['popular'],
    enrollments: 456,
    completionRate: 88,
    difficulty: 'Intermediate',
    lastUpdated: 'September 2024',
    description: 'Comprehensive study of World War II events and impacts.',
    learningPoints: ['Key events', 'Political analysis', 'Source evaluation']
  },
  {
    id: 15,
    name: 'A-Level Chemistry',
    grade: 'Year 12',
    lessons: 45,
    price: 54.99,
    rating: 4.9,
    reviews: 267,
    image: '🧪',
    duration: '38 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Lisa Wang',
    badges: ['bestseller', 'most-loved'],
    enrollments: 1234,
    completionRate: 95,
    difficulty: 'Advanced',
    lastUpdated: 'October 2024',
    description: 'Complete A-Level Chemistry course with practical and theoretical components.',
    learningPoints: ['Organic chemistry', 'Physical chemistry', 'Analytical techniques']
  },
  {
    id: 16,
    name: 'Spanish for Beginners',
    grade: 'Year 7',
    lessons: 24,
    price: 26.99,
    rating: 4.6,
    reviews: 145,
    image: '🇪🇸',
    duration: '15 hours',
    provider: 'external',
    providerName: 'Language Masters',
    instructor: 'Carlos Martinez',
    badges: [],
    enrollments: 356,
    completionRate: 86,
    difficulty: 'Beginner',
    lastUpdated: 'September 2024',
    description: 'Start your Spanish journey with engaging lessons and practical exercises.',
    learningPoints: ['Basic conversation', 'Grammar fundamentals', 'Cultural insights']
  },
  {
    id: 17,
    name: 'Geography: Physical World',
    grade: 'Year 9',
    lessons: 20,
    price: 29.99,
    rating: 4.7,
    reviews: 102,
    image: '🗺️',
    duration: '13 hours',
    provider: 'external',
    providerName: 'Geography Hub',
    instructor: 'Dr. Rachel Green',
    badges: ['popular'],
    enrollments: 423,
    completionRate: 87,
    difficulty: 'Intermediate',
    lastUpdated: 'October 2024',
    description: 'Explore Earth\'s physical features and natural processes.',
    learningPoints: ['Landforms', 'Climate', 'Ecosystems']
  },
  {
    id: 18,
    name: 'A-Level Mathematics',
    grade: 'Year 12',
    lessons: 48,
    price: 59.99,
    rating: 4.9,
    reviews: 389,
    image: '📐',
    duration: '42 hours',
    provider: 'rightsteps',
    providerName: 'Rightsteps',
    instructor: 'Dr. Sarah Mitchell',
    badges: ['bestseller', 'trending'],
    enrollments: 1876,
    completionRate: 96,
    difficulty: 'Advanced',
    lastUpdated: 'October 2024',
    description: 'Complete A-Level Mathematics covering pure, mechanics, and statistics.',
    learningPoints: ['Calculus', 'Mechanics', 'Statistics', 'Pure mathematics']
  }
];

const categories = [
  { name: 'All', count: 18, icon: '📚' },
  { name: 'Mathematics', count: 5, icon: '📐' },
  { name: 'Science', count: 5, icon: '🔬' },
  { name: 'English', count: 3, icon: '📖' },
];

const mockTutors = [
  {
    id: 1,
    name: 'Dr. Emily Thompson',
    category: 'Mathematics',
    specialization: ['Exam Preparation', 'Homework Help'],
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 25,
    verified: true,
    available: true,
    photo: '👩‍🏫',
    tagline: 'Mathematics Expert',
    education: 'Ph.D. in Mathematics, University of Cambridge',
    hoursTeaching: 500,
    responseTime: '2 hours',
    languages: ['English']
  },
  {
    id: 2,
    name: 'Prof. James Richardson',
    category: 'Science',
    specialization: ['Exam Preparation', 'Test Preparation'],
    experience: '12 years',
    rating: 4.8,
    reviews: 203,
    hourlyRate: 30,
    verified: true,
    available: false,
    photo: '👨‍🏫',
    tagline: 'Science Specialist',
    education: 'M.Sc. Chemistry, University of Oxford',
    hoursTeaching: 800,
    responseTime: '1 hour',
    languages: ['English', 'French']
  },
  {
    id: 3,
    name: 'Ms. Sarah Collins',
    category: 'English',
    specialization: ['Homework Help', 'Confidence Building'],
    experience: '6 years',
    rating: 4.7,
    reviews: 98,
    hourlyRate: 22,
    verified: true,
    available: true,
    photo: '👩‍💼',
    tagline: 'English Language Expert',
    education: 'M.A. English Literature, King\'s College London',
    hoursTeaching: 300,
    responseTime: '30 minutes',
    languages: ['English']
  },
  {
    id: 4,
    name: 'Mr. Oliver Davies',
    category: 'Mathematics',
    specialization: ['General Tutoring', 'Exam Preparation'],
    experience: '5 years',
    rating: 4.9,
    reviews: 87,
    hourlyRate: 28,
    verified: true,
    available: true,
    photo: '👨‍💻',
    tagline: 'Maths & Coding Mentor',
    education: 'B.Sc. Computer Science, Imperial College London',
    hoursTeaching: 250,
    responseTime: '1 hour',
    languages: ['English']
  },
  {
    id: 5,
    name: 'Dr. Amelia Watson',
    category: 'Science',
    specialization: ['Exam Preparation', 'General Tutoring'],
    experience: '10 years',
    rating: 4.8,
    reviews: 178,
    hourlyRate: 26,
    verified: true,
    available: true,
    photo: '👩‍🎓',
    tagline: 'Science Specialist',
    education: 'Ph.D. in Biology, University of Edinburgh',
    hoursTeaching: 650,
    responseTime: '1 hour',
    languages: ['English', 'German']
  },
  {
    id: 6,
    name: 'Mr. Benjamin Clarke',
    category: 'English',
    specialization: ['Confidence Building', 'General Tutoring'],
    experience: '7 years',
    rating: 4.6,
    reviews: 134,
    hourlyRate: 24,
    verified: true,
    available: true,
    photo: '👨‍🏫',
    tagline: 'English & Literature Expert',
    education: 'M.A. English Literature, University of Manchester',
    hoursTeaching: 420,
    responseTime: '3 hours',
    languages: ['English']
  },
  {
    id: 7,
    name: 'Ms. Charlotte Brown',
    category: 'Science',
    specialization: ['Exam Preparation', 'Test Preparation'],
    experience: '4 years',
    rating: 4.9,
    reviews: 67,
    hourlyRate: 27,
    verified: true,
    available: true,
    photo: '👩‍🔬',
    tagline: 'Physics Specialist',
    education: 'M.Sc. Physics, University of Bristol',
    hoursTeaching: 280,
    responseTime: '2 hours',
    languages: ['English']
  },
  {
    id: 8,
    name: 'Dr. Daniel Martinez',
    category: 'Science',
    specialization: ['Exam Preparation', 'Homework Help'],
    experience: '15 years',
    rating: 4.9,
    reviews: 289,
    hourlyRate: 32,
    verified: true,
    available: false,
    photo: '👨‍🔬',
    tagline: 'Chemistry Expert',
    education: 'Ph.D. in Chemistry, University College London',
    hoursTeaching: 950,
    responseTime: '1 hour',
    languages: ['English', 'Spanish']
  },
  {
    id: 9,
    name: 'Ms. Jessica Lee',
    category: 'English',
    specialization: ['Confidence Building', 'General Tutoring'],
    experience: '6 years',
    rating: 4.7,
    reviews: 112,
    hourlyRate: 23,
    verified: true,
    available: true,
    photo: '👩‍🏫',
    tagline: 'Creative English Teacher',
    education: 'M.A. English & Drama, Royal Holloway',
    hoursTeaching: 380,
    responseTime: '30 minutes',
    languages: ['English']
  },
  {
    id: 10,
    name: 'Mr. Thomas Wilson',
    category: 'Science',
    specialization: ['Test Preparation', 'Homework Help'],
    experience: '9 years',
    rating: 4.8,
    reviews: 195,
    hourlyRate: 29,
    verified: true,
    available: true,
    photo: '👨‍🔬',
    tagline: 'Biology Expert',
    education: 'M.Sc. Biology, University of Warwick',
    hoursTeaching: 570,
    responseTime: '1 hour',
    languages: ['English']
  },
  {
    id: 11,
    name: 'Ms. Rachel Green',
    category: 'Mathematics',
    specialization: ['Homework Help', 'Confidence Building'],
    experience: '3 years',
    rating: 4.5,
    reviews: 54,
    hourlyRate: 20,
    verified: true,
    available: true,
    photo: '👩‍💼',
    tagline: 'Maths Made Easy',
    education: 'B.Sc. Mathematics, University of Birmingham',
    hoursTeaching: 180,
    responseTime: '2 hours',
    languages: ['English']
  },
  {
    id: 12,
    name: 'Dr. Michael Foster',
    category: 'Mathematics',
    specialization: ['Exam Preparation', 'Test Preparation'],
    experience: '11 years',
    rating: 4.9,
    reviews: 234,
    hourlyRate: 35,
    verified: true,
    available: true,
    photo: '👨‍💻',
    tagline: 'Advanced Maths Expert',
    education: 'Ph.D. Mathematics, UCL',
    hoursTeaching: 720,
    responseTime: '1 hour',
    languages: ['English']
  }
];

export default function ContentMarketplaceEnterprise({ onContentSelect, onTutorSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('popular');
  const [selectedType, setSelectedType] = useState('courses'); // 'courses', 'tutors', 'all'

  // Course filters
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState([]);

  // Tutor filters
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // Filter courses
  const filteredSubjects = mockSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || subject.name.includes(selectedCategory);

    // Rating filter
    const matchesRating = selectedRatings.length === 0 ||
      selectedRatings.some(rating => subject.rating >= rating);

    // Duration filter
    const matchesDuration = selectedDurations.length === 0 || selectedDurations.some(duration => {
      const hours = parseFloat(subject.duration);
      if (duration === '0-1 Hour') return hours <= 1;
      if (duration === '1-3 Hours') return hours > 1 && hours <= 3;
      if (duration === '3-6 Hours') return hours > 3 && hours <= 6;
      if (duration === '6-17 Hours') return hours > 6 && hours <= 17;
      if (duration === '17+ Hours') return hours > 17;
      return true;
    });

    // Level filter
    const matchesLevel = selectedLevels.length === 0 ||
      selectedLevels.includes(subject.difficulty) ||
      selectedLevels.includes('All Levels');

    // Price filter
    const matchesPrice = selectedPriceTypes.length === 0 ||
      (selectedPriceTypes.includes('Free') && subject.price === 0) ||
      (selectedPriceTypes.includes('Paid') && subject.price > 0);

    return matchesSearch && matchesCategory && matchesRating && matchesDuration && matchesLevel && matchesPrice;
  });

  // Filter tutors
  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter (same as courses)
    const matchesCategory = selectedCategory === 'All' || tutor.category === selectedCategory;

    // Specialization filter
    const matchesSpecialization = selectedSpecializations.length === 0 ||
      selectedSpecializations.some(spec => tutor.specialization.includes(spec));

    // Experience filter
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.some(exp => {
      const years = parseInt(tutor.experience);
      if (exp === '0-2 years') return years >= 0 && years <= 2;
      if (exp === '2-5 years') return years > 2 && years <= 5;
      if (exp === '5+ years') return years > 5;
      return true;
    });

    // Rating filter (reusing course ratings filter)
    const matchesRating = selectedRatings.length === 0 ||
      selectedRatings.some(rating => tutor.rating >= rating);

    // Price range filter for tutors
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      if (range === '£0-£20') return tutor.hourlyRate <= 20;
      if (range === '£20-£25') return tutor.hourlyRate > 20 && tutor.hourlyRate <= 25;
      if (range === '£25-£30') return tutor.hourlyRate > 25 && tutor.hourlyRate <= 30;
      if (range === '£30+') return tutor.hourlyRate > 30;
      return true;
    });

    return matchesSearch && matchesCategory && matchesSpecialization && matchesExperience && matchesRating && matchesPrice;
  });

  const handleContentClick = (content, action) => {
    if (onContentSelect) {
      onContentSelect(content, action);
    }
  };

  const handleTutorClick = (tutor, action) => {
    if (onTutorSelect) {
      onTutorSelect(tutor, action);
    }
  };

  // Filter items based on type
  const getFilteredItems = () => {
    if (selectedType === 'courses') {
      return { courses: filteredSubjects, tutors: [] };
    } else if (selectedType === 'tutors') {
      return { courses: [], tutors: filteredTutors };
    } else {
      return { courses: filteredSubjects, tutors: filteredTutors };
    }
  };

  const { courses, tutors } = getFilteredItems();

  const toggleArrayFilter = (value, array, setArray) => {
    if (array.includes(value)) {
      setArray(array.filter(item => item !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const getBadgeStyle = (badge) => {
    const styles = {
      'trending': 'bg-orange-500 text-white',
      'most-loved': 'bg-pink-500 text-white',
      'popular': 'bg-green-600 text-white',
      'bestseller': 'bg-yellow-500 text-gray-900',
      'new': 'bg-green-500 text-white'
    };
    return styles[badge] || 'bg-gray-500 text-white';
  };

  const getBadgeText = (badge) => {
    const texts = {
      'trending': 'Trending',
      'most-loved': 'Highest Rated',
      'popular': 'Popular',
      'bestseller': 'Bestseller',
      'new': 'New'
    };
    return texts[badge] || badge;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === 'all'}
                      onChange={() => setSelectedType('all')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">All</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === 'courses'}
                      onChange={() => setSelectedType('courses')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Courses</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === 'tutors'}
                      onChange={() => setSelectedType('tutors')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Tutors</span>
                  </label>
                </div>
              </div>

              {/* Categories - For both courses and tutors */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.name} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specialization - Only for tutors */}
              {selectedType !== 'courses' && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Specialization</h4>
                  <div className="space-y-2">
                    {['Exam Preparation', 'Test Preparation', 'Homework Help', 'General Tutoring', 'Confidence Building'].map((spec) => (
                      <label key={spec} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSpecializations.includes(spec)}
                          onChange={() => toggleArrayFilter(spec, selectedSpecializations, setSelectedSpecializations)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Ratings */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Ratings</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleArrayFilter(rating, selectedRatings, setSelectedRatings)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <div className="ml-3 flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{rating} & up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration - Only for courses */}
              {selectedType !== 'tutors' && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Video Duration</h4>
                  <div className="space-y-2">
                    {['0-1 Hour', '1-3 Hours', '3-6 Hours', '6-17 Hours', '17+ Hours'].map((duration) => (
                      <label key={duration} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDurations.includes(duration)}
                          onChange={() => toggleArrayFilter(duration, selectedDurations, setSelectedDurations)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Level - Only for courses */}
              {selectedType !== 'tutors' && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Level</h4>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                      <label key={level} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleArrayFilter(level, selectedLevels, setSelectedLevels)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience - Only for tutors */}
              {selectedType !== 'courses' && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Experience</h4>
                  <div className="space-y-2">
                    {['0-2 years', '2-5 years', '5+ years'].map((exp) => (
                      <label key={exp} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedExperience.includes(exp)}
                          onChange={() => toggleArrayFilter(exp, selectedExperience, setSelectedExperience)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price - Different for courses vs tutors */}
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Price</h4>
                <div className="space-y-2">
                  {selectedType !== 'tutors' ? (
                    ['Free', 'Paid'].map((price) => (
                      <label key={price} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceTypes.includes(price)}
                          onChange={() => toggleArrayFilter(price, selectedPriceTypes, setSelectedPriceTypes)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{price}</span>
                      </label>
                    ))
                  ) : (
                    ['£0-£20', '£20-£25', '£25-£30', '£30+'].map((range) => (
                      <label key={range} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range)}
                          onChange={() => toggleArrayFilter(range, selectedPriceRanges, setSelectedPriceRanges)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{range}/hour</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedType === 'courses' && `${selectedCategory} Courses`}
                    {selectedType === 'tutors' && 'Find a Tutor'}
                    {selectedType === 'all' && 'Courses & Tutors'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedType === 'courses' && `${courses.length} courses`}
                    {selectedType === 'tutors' && `${tutors.length} tutors`}
                    {selectedType === 'all' && `${courses.length} courses, ${tutors.length} tutors`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {/* Render Courses */}
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  onClick={() => handleContentClick(course, 'view')}
                >
                  {/* Course Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-64 shrink-0' : ''}`}>
                    <div className={`bg-linear-to-br ${
                      course.provider === 'rightsteps'
                        ? 'from-green-100 to-green-200'
                        : 'from-gray-100 to-gray-200'
                    } flex items-center justify-center ${viewMode === 'list' ? 'h-full' : 'h-40'}`}>
                      <span className="text-6xl">{course.image}</span>
                    </div>

                    {/* Badges */}
                    {course.badges && course.badges.length > 0 && (
                      <div className="absolute top-2 left-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${getBadgeStyle(course.badges[0])}`}>
                          {getBadgeText(course.badges[0])}
                        </span>
                      </div>
                    )}

                    {/* Provider Badge */}
                    {course.provider === 'rightsteps' && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-white/95 backdrop-blur-sm text-green-600 text-xs font-semibold px-2 py-1 rounded shadow-sm">
                          Rightsteps
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-2">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>

                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{course.instructor}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                          <div className="flex ml-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">({course.reviews.toLocaleString()})</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {course.lessons} lectures
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {course.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">£{course.price}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContentClick(course, 'buy');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Render Tutors */}
              {tutors.map((tutor) => (
                <div
                  key={`tutor-${tutor.id}`}
                  className={`group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  onClick={() => handleTutorClick(tutor, 'view')}
                >
                  {/* Tutor Photo */}
                  <div className={`relative ${viewMode === 'list' ? 'w-64 shrink-0' : ''}`}>
                    <div className={`bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center ${viewMode === 'list' ? 'h-full' : 'h-40'}`}>
                      <span className="text-6xl">{tutor.photo}</span>
                    </div>

                    {/* Verified Badge */}
                    {tutor.verified && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-white/95 backdrop-blur-sm text-green-600 text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>
                    )}

                    {/* Availability Badge */}
                    {tutor.available && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tutor Details */}
                  <div className={`p-4 flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'} flex-1`}>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                        {tutor.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{tutor.tagline}</p>

                      <div className="mb-2">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                          {tutor.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {tutor.specialization.map((spec, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-900">{tutor.rating}</span>
                          <div className="flex ml-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">({tutor.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {tutor.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {tutor.hoursTeaching}h taught
                        </span>
                      </div>
                    </div>

                    {/* Price and Book Now - Stacked vertically */}
                    <div className={`flex flex-col items-center justify-center gap-3 ${viewMode === 'list' ? 'ml-6 border-l border-gray-100 pl-6' : 'pt-3 border-t border-gray-100'}`}>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">£{tutor.hourlyRate}</div>
                        <div className="text-sm text-gray-600">/hour</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTutorClick(tutor, 'book');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors w-full"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}