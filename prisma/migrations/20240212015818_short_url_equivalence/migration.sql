-- CreateTable
CREATE TABLE "short-url-equivalences" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "shortUUID" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "short-url-equivalences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short-url-equivalences_url_key" ON "short-url-equivalences"("url");

-- CreateIndex
CREATE UNIQUE INDEX "short-url-equivalences_shortUUID_key" ON "short-url-equivalences"("shortUUID");
