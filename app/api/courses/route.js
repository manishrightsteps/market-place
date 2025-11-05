import { NextResponse } from 'next/server';
import { courses } from '@/app/data/mockData';

// GET /api/courses - Get all courses with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Filters
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const provider = searchParams.get('provider');

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    let filteredCourses = courses;

    // Filter by category
    if (category && category !== 'All') {
      filteredCourses = filteredCourses.filter(course =>
        course.name.includes(category)
      );
    }

    // Filter by difficulty
    if (difficulty) {
      filteredCourses = filteredCourses.filter(course =>
        course.difficulty === difficulty
      );
    }

    // Filter by provider
    if (provider) {
      filteredCourses = filteredCourses.filter(course =>
        course.provider === provider
      );
    }

    const total = filteredCourses.length;
    const paginatedCourses = filteredCourses.slice(skip, skip + limit);
    const hasNextPage = skip + limit < total;

    return NextResponse.json({
      success: true,
      message: 'Courses fetched successfully',
      data: {
        courses: paginatedCourses,
        total: total,
        hasNextPage: hasNextPage,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch courses',
        data: null
      },
      { status: 500 }
    );
  }
}
