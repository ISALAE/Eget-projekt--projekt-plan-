/*
  Warnings:

  - You are about to drop the column `coinspersecon` on the `clicker` table. All the data in the column will be lost.
  - Added the required column `coinspersecond` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpstime` to the `clicker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clicker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL,
    "coinsperclick" INTEGER NOT NULL,
    "coinspersecond" INTEGER NOT NULL,
    "cpstime" INTEGER NOT NULL,
    "cpcupg" INTEGER NOT NULL,
    "cpsupg" INTEGER NOT NULL,
    CONSTRAINT "clicker_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clicker" ("coins", "coinsperclick", "cpcupg", "cpsupg", "id", "ownerId") SELECT "coins", "coinsperclick", "cpcupg", "cpsupg", "id", "ownerId" FROM "clicker";
DROP TABLE "clicker";
ALTER TABLE "new_clicker" RENAME TO "clicker";
CREATE UNIQUE INDEX "clicker_ownerId_key" ON "clicker"("ownerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
