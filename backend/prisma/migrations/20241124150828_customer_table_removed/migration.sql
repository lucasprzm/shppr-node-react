/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Customer_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driver_id" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "removedAt" DATETIME,
    CONSTRAINT "Ride_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ride" ("createdAt", "customer_id", "destination", "distance", "driver_id", "duration", "id", "origin", "removedAt", "updatedAt", "value") SELECT "createdAt", "customer_id", "destination", "distance", "driver_id", "duration", "id", "origin", "removedAt", "updatedAt", "value" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
