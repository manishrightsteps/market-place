import { NextResponse } from 'next/server';
import { tutors } from '@/app/data/mockData';

// GET /api/tutors - Get all tutors with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Filters
    const category = searchParams.get('category');
    const specialization = searchParams.get('specialization');
    const experience = searchParams.get('experience');
    const rating = searchParams.get('rating');

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    let filteredTutors = tutors;

    // Filter by category
    if (category && category !== 'All') {
      filteredTutors = filteredTutors.filter(tutor =>
        tutor.category === category
      );
    }

    // Filter by specialization
    if (specialization) {
      filteredTutors = filteredTutors.filter(tutor =>
        tutor.specialization.includes(specialization)
      );
    }

    // Filter by experience
    if (experience) {
      const expYears = parseInt(experience);
      filteredTutors = filteredTutors.filter(tutor =>
        tutor.experience >= expYears
      );
    }

    // Filter by rating
    if (rating) {
      const minRating = parseFloat(rating);
      filteredTutors = filteredTutors.filter(tutor =>
        tutor.rating >= minRating
      );
    }

    const total = filteredTutors.length;
    const paginatedTutors = filteredTutors.slice(skip, skip + limit);
    const hasNextPage = skip + limit < total;

    return NextResponse.json({
      success: true,
      message: 'Tutors fetched successfully',
      data: {
        tutors: paginatedTutors,
        total: total,
        hasNextPage: hasNextPage,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch tutors',
        data: null
      },
      { status: 500 }
    );
  }
}
