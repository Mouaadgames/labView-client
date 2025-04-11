/*
  Warnings:

  - You are about to alter the column `reportReady` on the `MedicalReports` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Made the column `reportReady` on table `MedicalReports` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MedicalReports" (
    "report_id" TEXT NOT NULL PRIMARY KEY,
    "lab_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "report_title" TEXT NOT NULL,
    "reportReady" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_pdf_url" TEXT,
    "report_thumbnail_url" TEXT,
    "processed_report_data" TEXT,
    "seen_by_user" BOOLEAN NOT NULL DEFAULT false,
    "seen_at" DATETIME,
    CONSTRAINT "MedicalReports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MedicalReports_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "Lab" ("lab_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MedicalReports" ("created_at", "lab_id", "processed_report_data", "reportReady", "report_id", "report_pdf_url", "report_thumbnail_url", "report_title", "seen_at", "seen_by_user", "user_id") SELECT "created_at", "lab_id", "processed_report_data", "reportReady", "report_id", "report_pdf_url", "report_thumbnail_url", "report_title", "seen_at", "seen_by_user", "user_id" FROM "MedicalReports";
DROP TABLE "MedicalReports";
ALTER TABLE "new_MedicalReports" RENAME TO "MedicalReports";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
