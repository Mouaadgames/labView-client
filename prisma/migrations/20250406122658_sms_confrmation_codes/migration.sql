-- CreateTable
CREATE TABLE "confirmationCodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "confirmationCodes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
