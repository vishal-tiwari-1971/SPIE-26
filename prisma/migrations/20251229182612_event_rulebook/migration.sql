-- CreateEnum
CREATE TYPE "RuleSection" AS ENUM ('OVERVIEW', 'ELIGIBILITY', 'TEAM_COMPOSITION', 'EVENT_FLOW', 'JUDGING_CRITERIA', 'DURATION', 'PRIZE', 'PRECAUTION');

-- CreateTable
CREATE TABLE "EventRule" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "section" "RuleSection" NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "EventRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRule_eventId_section_key" ON "EventRule"("eventId", "section");

-- AddForeignKey
ALTER TABLE "EventRule" ADD CONSTRAINT "EventRule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
