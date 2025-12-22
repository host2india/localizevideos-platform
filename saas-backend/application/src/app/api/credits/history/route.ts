import { NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/withAuth"
import prisma from "@/lib/prisma"

export const GET = withAuth(async ({ user }) => {
  const history = await prisma.creditTransaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return NextResponse.json(history)
})
