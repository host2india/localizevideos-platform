import { prisma } from "./prisma";

export async function runWorker() {
  while (true) {
    const job = await prisma.job.findFirst({
      where: { status: "PENDING" },
    });

    if (!job) {
      await sleep(3000);
      continue;
    }

    await prisma.job.update({
      where: { id: job.id },
      data: { status: "PROCESSING" },
    });

    try {
      // TODO: audio → whisper → translate → tts → mux
      await prisma.job.update({
        where: { id: job.id },
        data: { status: "COMPLETED" },
      });
    } catch (e) {
      await prisma.job.update({
        where: { id: job.id },
        data: { status: "FAILED" },
      });
    }
  }
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}
