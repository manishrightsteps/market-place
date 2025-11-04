import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { systemPrompt } from '@/app/lib/systemPrompt';
import { courses, tutors } from '@/app/data/mockData';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock child progress data (in production, this would come from database)
const mockChildProgress = {
  childName: 'Your child',
  subjects: {
    Mathematics: { score: 62, trend: 'declining', lastAssessment: '2 weeks ago' },
    Science: { score: 58, trend: 'stable', lastAssessment: '1 week ago' },
    English: { score: 85, trend: 'improving', lastAssessment: '3 days ago' },
  },
  overallPerformance: 68,
  studyHours: 12, // per week
  strengths: ['English Literature', 'Creative Writing'],
  weaknesses: ['Algebra', 'Physics', 'Chemical reactions'],
};

export async function POST(request) {
  try {
    const { query, includeProgress } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required.' },
        { status: 400 }
      );
    }

    // Prepare context for AI
    let contextMessage = `Available Courses:\n`;
    courses.forEach(course => {
      contextMessage += `- ${course.name} (${course.category || 'General'}, ${course.difficulty}, £${course.price}, Rating: ${course.rating}, ${course.duration})\n`;
    });

    contextMessage += `\nAvailable Tutors:\n`;
    tutors.forEach(tutor => {
      contextMessage += `- ${tutor.name} (${tutor.category}, ${tutor.specialization.join(', ')}, ${tutor.experience}, £${tutor.hourlyRate}/hr, Rating: ${tutor.rating})\n`;
    });

    // Include child progress if requested or if query mentions progress
    if (includeProgress || query.toLowerCase().includes('progress') || query.toLowerCase().includes('check my child')) {
      contextMessage += `\nChild Progress Data:\n`;
      contextMessage += `Overall Performance: ${mockChildProgress.overallPerformance}%\n`;
      contextMessage += `Subject Scores:\n`;
      Object.entries(mockChildProgress.subjects).forEach(([subject, data]) => {
        contextMessage += `  - ${subject}: ${data.score}% (${data.trend})\n`;
      });
      contextMessage += `Strengths: ${mockChildProgress.strengths.join(', ')}\n`;
      contextMessage += `Weaknesses: ${mockChildProgress.weaknesses.join(', ')}\n`;
      contextMessage += `Study Hours/Week: ${mockChildProgress.studyHours}\n`;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: contextMessage },
      { role: 'user', content: query }
    ];

    // Get AI recommendation
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiSuggestion = completion.choices[0].message.content;

    // Smart filtering based on query keywords
    const queryLower = query.toLowerCase();
    let filteredCourses = courses;
    let filteredTutors = tutors;

    // Category-based filtering
    if (queryLower.includes('math')) {
      filteredCourses = courses.filter(c => c.name.toLowerCase().includes('math'));
      filteredTutors = tutors.filter(t => t.category === 'Mathematics');
    } else if (queryLower.includes('science') || queryLower.includes('physics') || queryLower.includes('chemistry') || queryLower.includes('biology')) {
      filteredCourses = courses.filter(c => c.name.toLowerCase().includes('science') || c.name.toLowerCase().includes('physics') || c.name.toLowerCase().includes('chemistry') || c.name.toLowerCase().includes('biology'));
      filteredTutors = tutors.filter(t => t.category === 'Science');
    } else if (queryLower.includes('english') || queryLower.includes('literature') || queryLower.includes('writing')) {
      filteredCourses = courses.filter(c => c.name.toLowerCase().includes('english') || c.name.toLowerCase().includes('literature') || c.name.toLowerCase().includes('writing'));
      filteredTutors = tutors.filter(t => t.category === 'English');
    }

    // GCSE/SATs filtering
    if (queryLower.includes('gcse')) {
      filteredCourses = filteredCourses.filter(c => c.name.includes('GCSE') || c.grade?.includes('Year 10') || c.grade?.includes('Year 11'));
      filteredTutors = filteredTutors.filter(t => t.specialization.includes('Exam Preparation'));
    } else if (queryLower.includes('sats') || queryLower.includes('year 6')) {
      filteredCourses = filteredCourses.filter(c => c.name.includes('SATs') || c.grade?.includes('Year 6'));
      filteredTutors = filteredTutors.filter(t => t.specialization.includes('Exam Preparation') || t.specialization.includes('Test Preparation'));
    }

    // Specialization-based filtering for tutors
    if (queryLower.includes('exam') || queryLower.includes('test')) {
      filteredTutors = filteredTutors.filter(t =>
        t.specialization.includes('Exam Preparation') ||
        t.specialization.includes('Test Preparation')
      );
    } else if (queryLower.includes('homework')) {
      filteredTutors = filteredTutors.filter(t => t.specialization.includes('Homework Help'));
    } else if (queryLower.includes('confidence') || queryLower.includes('struggling')) {
      filteredTutors = filteredTutors.filter(t => t.specialization.includes('Confidence Building'));
    }

    // If asking for tutor specifically
    if (queryLower.includes('tutor') && !queryLower.includes('course')) {
      filteredCourses = [];
    }

    // If asking for course specifically
    if (queryLower.includes('course') && !queryLower.includes('tutor')) {
      filteredTutors = [];
    }

    // Sort by rating
    filteredCourses = filteredCourses.sort((a, b) => b.rating - a.rating).slice(0, 5);
    filteredTutors = filteredTutors.sort((a, b) => b.rating - a.rating).slice(0, 5);

    // If progress check mentioned, prioritize based on weak subjects
    if (includeProgress || queryLower.includes('progress')) {
      const weakSubjects = mockChildProgress.weaknesses;

      // Filter for weak subject areas
      filteredCourses = courses.filter(c =>
        weakSubjects.some(weak => c.name.toLowerCase().includes(weak.toLowerCase()))
      ).sort((a, b) => b.rating - a.rating).slice(0, 5);

      filteredTutors = tutors.filter(t =>
        weakSubjects.some(weak =>
          t.category.toLowerCase().includes(weak.toLowerCase()) ||
          t.tagline.toLowerCase().includes(weak.toLowerCase())
        )
      ).sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    return NextResponse.json({
      aiSuggestion,
      courses: filteredCourses,
      tutors: filteredTutors,
      progressData: (includeProgress || queryLower.includes('progress')) ? mockChildProgress : null,
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request.',
        aiSuggestion: 'I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.',
        courses: [],
        tutors: [],
      },
      { status: 500 }
    );
  }
}
