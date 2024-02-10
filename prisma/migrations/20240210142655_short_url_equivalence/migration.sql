-- CreateTable
CREATE TABLE "shortURLEquivalence" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "shortURL" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shortURLEquivalence_pkey" PRIMARY KEY ("id")
);
