/*
  Warnings:

  - Added the required column `coins` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinsperclick` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinspersecon` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpcupg` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpsupg` to the `clicker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clicker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL,
    "coinsperclick" INTEGER NOT NULL,
    "coinspersecon" INTEGER NOT NULL,
    "cpcupg" INTEGER NOT NULL,
    "cpsupg" INTEGER NOT NULL,
    CONSTRAINT "clicker_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clicker" ("id", "ownerId") SELECT "id", "ownerId" FROM "clicker";
DROP TABLE "clicker";
ALTER TABLE "new_clicker" RENAME TO "clicker";
CREATE UNIQUE INDEX "clicker_ownerId_key" ON "clicker"("ownerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
