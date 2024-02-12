-- CreateTable
CREATE TABLE "short-url-registries" (
    "id" SERIAL NOT NULL,
    "numberOfRequests" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "shortURLEquivalenceId" INTEGER NOT NULL,

    CONSTRAINT "short-url-registries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short-url-registries_shortURLEquivalenceId_key" ON "short-url-registries"("shortURLEquivalenceId");

-- AddForeignKey
ALTER TABLE "short-url-registries" ADD CONSTRAINT "short-url-registries_shortURLEquivalenceId_fkey" FOREIGN KEY ("shortURLEquivalenceId") REFERENCES "short-url-equivalences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
