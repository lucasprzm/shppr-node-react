/*
  Warnings:

  - Added the required column `ratingText` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "ratingText" TEXT NOT NULL,
    "pricePerKm" REAL NOT NULL,
    "minimumKm" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "removedAt" DATETIME
);
INSERT INTO "new_Driver" ("car", "createdAt", "description", "id", "minimumKm", "name", "pricePerKm", "rating", "removedAt", "updatedAt") SELECT "car", "createdAt", "description", "id", "minimumKm", "name", "pricePerKm", "rating", "removedAt", "updatedAt" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
