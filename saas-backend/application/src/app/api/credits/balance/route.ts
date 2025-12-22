import { NextResponse } from "next/server"
import { withAuth } from "@/lib/auth/withAuth"
import prisma from "@/lib/prisma"

export const GET = withAuth(async ({ user }) => {
  const wallet = await prisma.creditWallet.findUnique({
    where: { userId: user.id },
  })

  if (!wallet) {
    return NextResponse.json({
      credits: 0,
      freeCredits: 0,
      paidCredits: 0,
    })
  }

  return NextResponse.json({
    credits: wallet.balance,
    freeCredits: wallet.freeCredits,
    paidCredits: wallet.paidCredits,
  })
})
