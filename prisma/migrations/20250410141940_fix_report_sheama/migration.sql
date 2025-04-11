/*
  Warnings:

  - You are about to drop the column `report_description` on the `MedicalReports` table. All the data in the column will be lost.
  - You are about to drop the column `report_url` on the `MedicalReports` table. All the data in the column will be lost.
  - Added the required column `report_pdf_url` to the `MedicalReports` table without a default value. This is not possible if the table is not empty.
  - Made the column `lab_id` on table `MedicalReports` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `MedicalReports` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MedicalReports" (
    "report_id" TEXT NOT NULL PRIMARY KEY,
    "lab_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "report_title" TEXT NOT NULL,
    "reportReady" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_pdf_url" TEXT NOT NULL,
    "report_thumbnail_url" TEXT,
    "processed_report_data" TEXT,
    "seen_by_user" BOOLEAN NOT NULL DEFAULT false,
    "seen_at" DATETIME,
    CONSTRAINT "MedicalReports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MedicalReports_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "Lab" ("lab_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MedicalReports" ("created_at", "lab_id", "processed_report_data", "report_id", "report_thumbnail_url", "report_title", "seen_at", "seen_by_user", "user_id") SELECT "created_at", "lab_id", "processed_report_data", "report_id", "report_thumbnail_url", "report_title", "seen_at", "seen_by_user", "user_id" FROM "MedicalReports";
DROP TABLE "MedicalReports";
ALTER TABLE "new_MedicalReports" RENAME TO "MedicalReports";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
