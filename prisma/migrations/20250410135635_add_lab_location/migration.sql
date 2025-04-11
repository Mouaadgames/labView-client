/*
  Warnings:

  - Added the required column `location` to the `Lab` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lab" (
    "lab_id" TEXT NOT NULL PRIMARY KEY,
    "lab_name" TEXT NOT NULL,
    "lab_logo" TEXT,
    "lab_username" TEXT NOT NULL,
    "lab_password_hash" TEXT NOT NULL,
    "totp" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_logon" DATETIME,
    "jwtoken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Lab" ("created_at", "is_active", "jwtoken", "lab_id", "lab_logo", "lab_name", "lab_password_hash", "lab_username", "last_logon", "totp") SELECT "created_at", "is_active", "jwtoken", "lab_id", "lab_logo", "lab_name", "lab_password_hash", "lab_username", "last_logon", "totp" FROM "Lab";
DROP TABLE "Lab";
ALTER TABLE "new_Lab" RENAME TO "Lab";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
