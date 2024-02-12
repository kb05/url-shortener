-- CreateTable
CREATE TABLE "short-url-stats" (
    "id" SERIAL NOT NULL,
    "numberOfRequests" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "shortURLEquivalenceId" INTEGER NOT NULL,

    CONSTRAINT "short-url-stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short-url-stats_shortURLEquivalenceId_key" ON "short-url-stats"("shortURLEquivalenceId");

-- AddForeignKey
ALTER TABLE "short-url-stats" ADD CONSTRAINT "short-url-stats_shortURLEquivalenceId_fkey" FOREIGN KEY ("shortURLEquivalenceId") REFERENCES "short-url-equivalences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
