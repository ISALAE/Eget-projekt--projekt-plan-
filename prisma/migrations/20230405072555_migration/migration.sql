/*
  Warnings:

  - Made the column `session` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cpcupgcost` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpstimeupg` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpstimeupgcost` to the `clicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpsupgcost` to the `clicker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "new_user" ("hash", "id", "salt", "session", "username") SELECT "hash", "id", "salt", "session", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_salt_key" ON "user"("salt");
CREATE UNIQUE INDEX "user_hash_key" ON "user"("hash");
CREATE TABLE "new_clicker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL,
    "coinsperclick" INTEGER NOT NULL,
    "coinspersecond" INTEGER NOT NULL,
    "cpstime" INTEGER NOT NULL,
    "cpcupg" INTEGER NOT NULL,
    "cpsupg" INTEGER NOT NULL,
    "cpstimeupg" INTEGER NOT NULL,
    "cpcupgcost" INTEGER NOT NULL,
    "cpsupgcost" INTEGER NOT NULL,
    "cpstimeupgcost" INTEGER NOT NULL,
    CONSTRAINT "clicker_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clicker" ("coins", "coinsperclick", "coinspersecond", "cpcupg", "cpstime", "cpsupg", "id", "ownerId") SELECT "coins", "coinsperclick", "coinspersecond", "cpcupg", "cpstime", "cpsupg", "id", "ownerId" FROM "clicker";
DROP TABLE "clicker";
ALTER TABLE "new_clicker" RENAME TO "clicker";
CREATE UNIQUE INDEX "clicker_ownerId_key" ON "clicker"("ownerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
