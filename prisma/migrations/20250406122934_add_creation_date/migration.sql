-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_confirmationCodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "confirmationCodes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_confirmationCodes" ("id", "user_id", "value") SELECT "id", "user_id", "value" FROM "confirmationCodes";
DROP TABLE "confirmationCodes";
ALTER TABLE "new_confirmationCodes" RENAME TO "confirmationCodes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
