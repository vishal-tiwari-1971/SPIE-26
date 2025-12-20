import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return Response.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return Response.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // Create new admin (in production, hash the password!)
    const admin = await prisma.admin.create({
      data: {
        username,
        password, // TODO: Hash password with bcrypt in production
      },
    });

    return Response.json(
      { message: "Admin created successfully", username: admin.username },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin creation error:", error);
    return Response.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    return Response.json({ admins }, { status: 200 });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return Response.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}
