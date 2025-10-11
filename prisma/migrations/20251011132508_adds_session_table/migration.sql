-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "fileName" TEXT,
    "jobDescription" TEXT,
    "suggestion" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
