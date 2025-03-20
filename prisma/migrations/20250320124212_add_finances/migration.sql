-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "month" TEXT NOT NULL,
    "income" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Payment" ("amount", "id", "month", "name") SELECT "amount", "id", "month", "name" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
