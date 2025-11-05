import { NextResponse } from 'next/server';
import { courses } from '@/app/data/mockData';

// GET /api/courses/[slug] - Get individual course by slug
export async function GET(_request, { params }) {
  try {
    const { slug } = await params;

    const course = courses.find(c => c.slug === slug);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: 'Course not found',
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Course fetched successfully',
      data: { course }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch course',
        data: null
      },
      { status: 500 }
    );
  }
}
