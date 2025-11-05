import { NextResponse } from 'next/server';
import { tutors } from '@/app/data/mockData';

// GET /api/tutors/[slug] - Get individual tutor by slug
export async function GET(_request, { params }) {
  try {
    const { slug } = await params;

    const tutor = tutors.find(t => t.slug === slug);

    if (!tutor) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tutor not found',
          data: null
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tutor fetched successfully',
      data: { tutor }
    });
  } catch (error) {
    console.error('Error fetching tutor:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch tutor',
        data: null
      },
      { status: 500 }
    );
  }
}
