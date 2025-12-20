"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyAdminCredentials(username, password) {
  // Simulate auth delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return { success: false, error: "Invalid username or password" };
    }

    // In production, use bcrypt to compare hashed passwords
    if (admin.password !== password) {
      return { success: false, error: "Invalid username or password" };
    }

    return { success: true };
  } catch (error) {
    console.error("Auth error:", error);
    return { success: false, error: "Authentication failed" };
  }
}
