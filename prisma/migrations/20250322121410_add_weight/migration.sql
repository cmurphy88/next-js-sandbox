-- CreateTable
CREATE TABLE "Weight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weight" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
