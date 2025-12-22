import { NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/withAuth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const JobSchema = z.object({
  sourceType: z.enum(["UPLOAD", "YOUTUBE", "URL"]),
  sourceUrl: z.string().url(),
  targetLanguage: z.string(),
  voice: z.string(),
  durationSeconds: z.number().positive(),
})

export const POST = withAuth(async ({ user, req }) => {
  const body = await req.json()
  const data = JobSchema.parse(body)

  const minutes = Math.ceil(data.durationSeconds / 60)
  const creditsNeeded = minutes * 1 // v1 pricing

  return await prisma.$transaction(async (tx) => {
    const wallet = await tx.creditWallet.findUnique({
      where: { userId: user.id },
      lock: { mode: "ForUpdate" },
    })

    if (!wallet || wallet.balance < creditsNeeded) {
      throw new Error("INSUFFICIENT_CREDITS")
    }

    await tx.creditWallet.update({
      where: { userId: user.id },
      data: {
        balance: { decrement: creditsNeeded },
      },
    })

    await tx.creditTransaction.create({
      data: {
        userId: user.id,
        amount: -creditsNeeded,
        type: "USAGE",
        description: `Video job (${minutes} min)`,
      },
    })

    const job = await tx.job.create({
      data: {
        userId: user.id,
        sourceType: data.sourceType,
        sourceUrl: data.sourceUrl,
        targetLanguage: data.targetLanguage,
        voice: data.voice,
        durationSeconds: data.durationSeconds,
        creditsUsed: creditsNeeded,
        status: "QUEUED",
      },
    })

    return NextResponse.json(job)
  })
})
