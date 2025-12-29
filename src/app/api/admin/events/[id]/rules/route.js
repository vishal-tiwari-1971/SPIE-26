import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all rules for an event
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const rules = await prisma.eventRule.findMany({
      where: { eventId: id },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rules' },
      { status: 500 }
    );
  }
}

// POST - Create or update rules for an event
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const { rules } = await req.json(); // Array of {section, content, order}

    if (!rules || !Array.isArray(rules)) {
      return NextResponse.json(
        { error: 'Rules array is required' },
        { status: 400 }
      );
    }

    // Delete existing rules for this event
    await prisma.eventRule.deleteMany({
      where: { eventId: id }
    });

    // Create new rules
    const createdRules = await Promise.all(
      rules.map((rule) =>
        prisma.eventRule.create({
          data: {
            eventId: id,
            section: rule.section,
            content: rule.content,
            order: rule.order
          }
        })
      )
    );

    return NextResponse.json(createdRules);
  } catch (error) {
    console.error('Error saving rules:', error);
    return NextResponse.json(
      { error: 'Failed to save rules' },
      { status: 500 }
    );
  }
}

// DELETE all rules for an event
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.eventRule.deleteMany({
      where: { eventId: id }
    });

    return NextResponse.json({ message: 'Rules deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete rules' },
      { status: 500 }
    );
  }
}
