import { NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/withAuth"
import prisma from "@/lib/prisma"

export const GET = withAuth(async ({ user, params }) => {
  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
  })

  if (!job) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 })
  }

  return NextResponse.json(job)
})
