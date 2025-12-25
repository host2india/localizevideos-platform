import { prisma } from "./prisma";
import { JobStatus } from "@prisma/client";

export async function runWorker() {
  while (true) {
    const job = await prisma.job.findFirst({
      where: { status: JobStatus.PENDING },
    });

    if (!job) {
      await sleep(3000);
      continue;
    }

    await prisma.job.update({
      where: { id: job.id },
      data: { status: JobStatus.PROCESSING },
    });

    try {
      // TODO:
      // audio → whisper → translate → tts → mux

      await prisma.job.update({
        where: { id: job.id },
        data: { status: JobStatus.SUCCESS },
      });
    } catch (e) {
      await prisma.job.update({
        where: { id: job.id },
        data: { status: JobStatus.FAILED },
      });
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
