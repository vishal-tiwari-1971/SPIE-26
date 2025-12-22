import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function POST(req, { params }) {
  const user = getUserFromToken(req);
  const { id: eventId } = await params;

  await prisma.eventRegistration.create({
    data: {
      userId: user.id,
      eventId
    }
  });

  return Response.json({ message: 'Registered successfully' });
}
